import {$, fs, tempy} from 'zx-extra'
import {IAction, IActionProvidersMap, IJob, ICommand} from '../parser/interface'
import {envify, envToString} from '../util'

export interface IBuildOptions {
  tag?: string,
  distro?: string
  deps?: string[]
  setups?: string[]
}

export const build = async({distro = 'alpine', deps = [], setups = [], tag: _tag}: IBuildOptions): Promise<string> => {
  const cwd = tempy.temporaryDirectory()


  const tag = `${distro}-deps-${deps.join('-')}`
  const startSh = `#!/bin/sh
echo "Akzhenz!"
eval "$SCRIPT"`

  // # ${scripts.join('\n')}
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
  await $`docker build -t local/${tag} ${cwd}`

  return tag
}
