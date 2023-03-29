import {$, fs, tempy} from 'zx-extra'
import {IAction, IActionProvidersMap, IJob} from '../parser/interface'

export interface IBuildOptions {
  distro?: string
  job: IJob
  providers?: IActionProvidersMap
}

export const build = async({distro = 'alpine', job, providers = {}}: IBuildOptions): Promise<string> => {
  const cwd = tempy.temporaryDirectory()
  const {steps} = job
  const deps = steps.reduce((acc, step) => {

    return acc
  }, [])


  const startSh = `
  echo 'hello world!'
`

  const dockerfile = `
  FROM ${distro}
`

  await fs.writeFile(`${cwd}/Dockerfile`, dockerfile)
  await $`docker build -t akshenz ${cwd}`

  return cwd
}