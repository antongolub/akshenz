import { expect } from 'earljs'
import { test } from 'uvu'

import { parse } from '../../main/ts/parser'
import { build } from '../../main/ts/builder'

test('`builder` builds an image for the specified step', async () => {
  const {workflow} = await parse(`
    name: foo
    on: push
    jobs:
      analyze:
        steps:
          - uses: checkout
  `)
  const jobId = 'analyze'
  const job = workflow.jobs[jobId]

  await build({
    actions
  })
})

test.run()
