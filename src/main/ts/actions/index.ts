import { IActionProvider } from './interface'
import { action as checkout } from './checkout'

export * from './interface'

const actions = [checkout]

export const getActionProvider = (name: string): IActionProvider | undefined =>
  actions.find(action => action.name === name)