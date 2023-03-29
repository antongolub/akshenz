import {IActionProvider} from '../interface'

export const action: IActionProvider = {
  name: 'checkout',
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
  },
  setup: '',
  run: ''
}