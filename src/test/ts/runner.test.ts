import { expect } from 'earljs'
import { test } from 'uvu'

import { run } from '../../main/ts/runner'

test('`runner` builds image(s) and invokes workflow jobs', async () => {
  await run({
    name: 'foo',
    on: 'push',
    jobs: {
      analyze: {
        steps: [
          {
            uses: 'checkout',
          }
        ]
      }
    }
  })
})

// test.run()
