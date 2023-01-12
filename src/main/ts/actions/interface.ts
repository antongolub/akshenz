export type IAction = {
  name: string
  deps?: string[]
  setup?: string
  run?: string
}