import {IActionProvider} from '../interface'

export const action: IActionProvider = {
  name: 'checkout',
  setup: '',
  requirements: {
    arch: ['x64'],
    platform: ['linux'],
    deps: ['git'],
  },
  schema: {
    type: 'object',
    properties: {
      repository: {type: 'string'}
    }
  }
}