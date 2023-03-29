import { fs, tempy, $ } from 'zx-extra'
import { IWorkflow } from '../parser/interface'
import { getAction } from '../actions'

$.verbose = true

const getActions = (workflow: IWorkflow) => {
  const actions = new Set<string>()

  for (const job of Object.values(workflow.jobs ?? {})) {
    for (const step of job.steps ?? []) {
      actions.add(step.uses)
    }
  }

  return [...actions].map(getAction).filter(Boolean)
}

export const build = async (step: string, workflow: IWorkflow): Promise<void> => {
  const tempdir = tempy.temporaryDirectory()
  const os = 'alpine'
  const actions = getActions(workflow)
  const dockerfile = `
  FROM ${os}
  
`
  await fs.writeFile(`${tempdir}/Dockerfile`, dockerfile)

  console.log('actions=', actions)
  // await $`docker build -t akshenz ${tempdir}`
}

export const run = async (workflow: IWorkflow): Promise<void> => {
  await build(workflow)
}
