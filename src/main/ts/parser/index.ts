import {load} from 'js-yaml'
import {analyze, TEdges} from 'toposource'

import {IAction, IPipeline, IWorkflow} from './interface'
import {validate, ValidationError} from '../schema'
import {workflowSchema} from './schema'

import {getActionProvider, IActionProvider} from '../actions'

export {workflowSchema} from './schema'

export const parse = async (value: string): Promise<IPipeline> => {
  const workflow = load(value) as IWorkflow

  validate(workflowSchema, workflow)

  const providers = Object.values(workflow.jobs).reduce<Record<string, IActionProvider>>((acc, {steps}) => {
    (steps as IAction[]).forEach(step => {
      const name = step.uses
      if (!name) {
        return
      }

      const provider = getActionProvider(name)
      if (!provider) {
        throw new ValidationError(`Target action is not found: ${name}`)
      }

      if (provider.schema) {
        validate(provider.schema, step.with || {})
      }

      acc[name] = provider
    })

    return acc
  }, {})

  return {
    providers,
    workflow,
    topo: getGraph(workflow)
  }
}

const getGraph = (workflow: IWorkflow) => {
  const edges = Object.entries(workflow.jobs).reduce<TEdges>((acc, [name, {needs}]) => {
    acc.push(...(needs?.map<[string, string]>(n => [name, n]) ?? [[name]]))
    return acc
  }, [])

  return analyze(edges)
}
