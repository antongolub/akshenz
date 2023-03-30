import { test } from 'uvu'

import { run } from '../../main/ts/runner'

test('`builder` builds an image for the specified step', async () => {
  const event = {
    repository: 'https://github.com/semrel-extra/toposource.git',
    type: 'push',
    event_name: 'push'
  }
  const workflow = `
    name: foo
    on: push
    jobs:
      analyze:
        steps:
          - uses: checkout
          - name: test
            run: git remote -v
  `

  await run(event, workflow)
})

test.run()
