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
  setup: `RUN mkdir -p ~/.ssh && touch ~/.ssh/id_rsa && echo "y\\n" | ssh-keygen -t rsa -C "test.com" -f ~/.ssh/id_rsa -P ""
RUN ssh-keyscan github.com >> ~/.ssh/known_hosts
`,
  run: 'git clone ${INPUT_REPOSITORY} ./'
}