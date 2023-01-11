import { expect } from 'earljs'
import { test } from 'uvu'

import { parse, ValidationError } from '../../main/ts/parser'

test('`parser` throws error on invalid workflow', () => {
  expect(() => parse(`
  name: foo
`))
  .toThrow(
    ValidationError,
    'Invalid workflow'
  )
})

test.run()
