import {IActionProvider} from '../interface'

export const action: IActionProvider = {
  name: 'setup-bun',
  requirements: {
    arch: ['x64'],
    platform: ['linux'],
    deps: ['wget', 'unzip'],
  },
  schema: {
    type: 'object',
    properties: {
      repository: {type: 'string'}
    }
  },
  defaults: {
    version: '0.5.8'
  },
  setup: '',
  run: `wget -q -O bun.zip https://github.com/oven-sh/bun/releases/download/bun-v$\{ACTION_VERSION\}/bun-linux-aarch64.zip
unzip bun.zip

mv bun-linux-aarch64/bun /usr/local/bin/bun
chmod +xrw /usr/local/bin/bun

export PATH=$PATH:/usr/local/bin

rm bun.zip
`
}