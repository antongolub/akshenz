import {$, fs, tempy} from 'zx-extra'
import {IAction, IActionProvidersMap, IJob} from '../parser/interface'

export interface IBuildOptions {
  distro?: string
  job: IJob
  providers: IActionProvidersMap
}

export const build = async({distro = 'alpine', job, providers}: IBuildOptions): Promise<string> => {
  const cwd = tempy.temporaryDirectory()
  const {steps} = job
  const {deps, setups} = (steps as IAction[]).reduce((acc: {deps: string[], setups: string[], scripts: any[]}, step) => {
    if (step.uses) {
      const provider = providers[step.uses]
      const {deps} = provider.requirements
      acc.deps.push(...deps)
      acc.setups.push(provider.setup)
      acc.scripts.push(provider.script)
    }

    return acc
  }, {setups: [], deps: [], scripts: []})

  const startSh = `
#!/bin/sh

echo "Hello, world!"
`

  fs.writeFile(`${cwd}/start.sh`, startSh)

  const dockerfile = `
  FROM ${distro}
  
  RUN apk update
  RUN apk add ${deps.join(' ')}

  ${setups.join('\n')}
  
  COPY start.sh /start.sh
  RUN chmod +x /start.sh
  
  ENTRYPOINT ["/start.sh"]
`

  await fs.writeFile(`${cwd}/Dockerfile`, dockerfile)
  await $`docker build -t local/akshenz ${cwd}`

  return cwd
}