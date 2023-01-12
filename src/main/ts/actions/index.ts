import { IAction } from './interface'
import { action as checkout } from './checkout'

const actions = [checkout]

export const getAction = (name: string): IAction | undefined =>
  actions.find(action => action.name === name)