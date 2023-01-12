import {fs, tempy, $} from 'zx-extra'
import { IWorkflow } from '../parser/interface'

$.verbose = true

export const build = ({os = 'alpine', actions = []} = {}): string => {
  console.log(actions)
  return `
  FROM ${os}
`
}

export const run = async (workflow: IWorkflow): Promise<void> => {
  const dockerfile = build()
  const tempdir = tempy.temporaryDirectory()

  console.log(`${tempdir}/Dockerfile`)

  await fs.writeFile(`${tempdir}/Dockerfile`, dockerfile)

  // await $`docker build -t akshenz ${tempdir}`

  console.log(workflow)
}
