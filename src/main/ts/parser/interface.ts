export type IEvent = 'push' | 'pull_request' | 'workflow_dispatch'

export interface IWorkflow {
  name: string
  on: IEvent
}
