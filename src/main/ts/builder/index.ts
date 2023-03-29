import {$, fs, tempy} from 'zx-extra'
import {IAction, IActionProvidersMap, IJob, ICommand} from '../parser/interface'

export interface IBuildOptions {
  distro?: string
  job: IJob
  providers: IActionProvidersMap
  input?: Record<string, string>
}

export const build = async({distro = 'alpine', job, providers, input = {}}: IBuildOptions): Promise<string> => {
  const cwd = tempy.temporaryDirectory()
  const {steps} = job
  const {deps, setups, scripts} = (steps as IAction[]).reduce((acc: {deps: string[], setups: string[], scripts: any[]}, step) => {
    if (step.uses) {
      const provider = providers[step.uses]
      const {deps} = provider.requirements
      acc.deps.push(...deps)
      acc.setups.push(provider.setup)
      acc.scripts.push(`
echo "Running ${step.uses}"
${transformToEnv(step.with, 'ACTION')}
${provider.run}
`)
    } else {
      const cmd = step as unknown as ICommand
      acc.scripts.push(`
echo "Running cmd ${cmd?.name || cmd.run}"
${cmd.run}
`)
    }

    return acc
  }, {setups: [], deps: [], scripts: []})

  const startSh = `#!/bin/sh
echo "Akzhenz!"
${transformToEnv(input, 'INPUT')}
${scripts.join('\n')}`

  fs.writeFile(`${cwd}/start.sh`, startSh)

  const dockerfile = `
  FROM ${distro}
  
  RUN apk update
  RUN apk add ${deps.join(' ')}
  ${setups.join('\n')}

  COPY start.sh /start.sh
  RUN chmod +x /start.sh
  RUN mkdir /app
  WORKDIR /app
  
  ENTRYPOINT ["../start.sh"]
`

  await fs.writeFile(`${cwd}/Dockerfile`, dockerfile)
  await $`docker build -t local/akshenz ${cwd}`

  return cwd
}

// TODO https://github.blog/changelog/2021-11-10-github-actions-input-types-for-manual-workflows/
export const transformToEnv = (input = {}, prefix = 'INPUT'): string =>
  Object.entries(input).reduce((acc, [key, value]) =>
`${prefix}_${key}=${value}}
${prefix}_${key.toUpperCase()}=${value}
${acc}`
, '')
