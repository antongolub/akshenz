import {IActionProvider} from '../interface'

export const action: IActionProvider = {
  name: 'setup-node',
  requirements: {
    arch: ['x64'],
    platform: ['linux'],
    deps: ['curl', 'tar', 'xz-utils', 'gzip'],
  },
  schema: {
    type: 'object',
    properties: {
      repository: {type: 'string'}
    }
  },
  setup: '',
  defaults: {
    version: '18.15.0'
  },
  run: `curl https://nodejs.org/dist/v\${ACTION_VERSION}/node-v\${ACTION_VERSION}-linux-arm64.tar.xz -o node.tar.xz

mkdir -p /usr/local/node
tar -xvf node.tar.xz --strip-components=1 -C /usr/local/node

chmod +x /usr/local/node/bin/node

export PATH=$PATH:/usr/local/node/bin
`
}