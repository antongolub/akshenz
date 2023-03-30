import {TTopoResult} from 'toposource'
import {IActionProvider} from "../actions";

export type IEventName = 'push' | 'pull_request' | 'workflow_dispatch' | string

export interface IAction {
  name?: string
  uses: string
  with?: Record<string, string>
  env?: Record<string, string>
}

export interface ICommand {
  name?: string
  run: string
}

export type IStep = IAction | ICommand

export interface IWorkflow {
  name?: string
  on: IEventName | IEventName[]
  jobs: Record<string, IJob>
}

export interface IJob {
  needs?: string[]
  on?: IEventName | IEventName[]
  steps: IStep[]
}

export type IActionProvidersMap = Record<string, IActionProvider>

export interface IPipeline {
  workflow: IWorkflow
  topo: TTopoResult
  providers: IActionProvidersMap
}
