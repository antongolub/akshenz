import {$} from 'zx-extra'
import {build} from '../builder'
import {IAction, IActionProvidersMap, ICommand, IJob, IPipeline} from '../parser/interface'
import {parse as parseWorkflow} from '../parser'
import {asArray, envify, envToString} from '../util'
import {TTopoResult} from 'toposource'

// https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows
// https://github.blog/changelog/2021-11-10-github-actions-input-types-for-manual-workflows/
export type IEvent = {
  type: string,
  event_name: string,
  repository: string,
}

export const run = async (event: IEvent, wf: string): Promise<void> => {
  const {workflow, topo, providers} = await parseWorkflow(wf)
  if (!asArray(workflow.on).includes(event.type)) {
    return
  }

  const affectedJobNames = Object.entries(workflow.jobs).reduce<string[]>((acc, [name, {on}]) => {
    if (!on || asArray(on).includes(event.type)) {
      acc.push(name)
    }
    return acc
  }, [])
  const queue = topo.queue.filter((name) => affectedJobNames.includes(name))
  await traverseQueue({queue, prev: topo.prev, cb: async (name: string) => {
    const {deps, setups, scripts} = parseJob(workflow.jobs[name], providers)
    const tag = await build({deps, setups})
    const res = await $`docker run -e INPUT_REPOSITORY='${event.repository}' -e SCRIPT=${scripts.join('\n')} docker.io/local/${tag}`
    console.log(res.stdout.toString())
  }})
}

export const traverseQueue = async ({queue, prev, cb}: {queue: TTopoResult['queue'], prev: TTopoResult['prev'], cb: any}) => {
  const acc: Record<string, Promise<void>> = {}

  return Promise.all(queue.map((name) =>
    (acc[name] = (async () => {
      await Promise.all((prev.get(name) || []).map((p) => acc[p]))
      await cb(name)
    })()))
  )
}

const parseJob = (job: IJob, providers: IActionProvidersMap) => {
  const {steps} = job
  const {deps, setups, scripts} = (steps as IAction[]).reduce((acc: {deps: string[], setups: string[], scripts: any[]}, step) => {
    if (step.uses) {
      const provider = providers[step.uses]
      const {deps} = provider.requirements
      acc.deps.push(...deps)
      acc.setups.push(provider.setup)
      acc.scripts.push(`
echo "Running ${step.uses}"
${envToString(envify(step.with, 'action-'))}
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

  return {deps, setups, scripts}
}