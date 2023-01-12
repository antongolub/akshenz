export type IEvent = 'push' | 'pull_request' | 'workflow_dispatch'

export interface IStep {
  uses: string
  name?: string
  with?: Record<string, string>
  env?: Record<string, string>
}

export interface IWorkflow {
  name: string
  on: IEvent
  jobs?: Record<string, {
    steps: IStep[]
  }>
}
