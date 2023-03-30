import { IActionProvider } from './interface'
import { action as checkout } from './checkout'
import { action as setupBun } from './setup-bun'
import { action as setupNode } from './setup-node'

export * from './interface'

const actions = [checkout, setupBun, setupNode]

export const getActionProvider = (name: string): IActionProvider | undefined =>
  actions.find(action => action.name === name)