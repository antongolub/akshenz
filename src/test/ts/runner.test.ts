import { test } from 'uvu'

import {$} from 'zx-extra'
import { run } from '../../main/ts/runner'

test('`builder` builds an image for the specified step', async () => {
  const event = {
    repository: 'https://github.com/semrel-extra/toposource.git',
    type: 'push',
    event_name: 'push'
  }

  const workflow1 = `
    name: foo
    on: push
    jobs:
      analyze:
        steps:
          - uses: checkout
            with:
              repository: https://github.com/semrel-extra/topo.git
          - name: test git remote
            run: git remote -v
          - uses: setup-node
            with:
              version: 18.14.0
          - name: test node
            run: node -v
          - uses: setup-bun
            with:
              version: 0.5.0
          - run: bun -v
  `

  const workflow = `
    name: foo
    on: push
    jobs:
      analyze:
        steps:
          - uses: checkout
            with:
              repository: https://github.com/semrel-extra/topo.git
          - name: test git remote
            run: git remote -v
  `

  $.verbose = true
  await run(event, workflow)
})

test.run()
