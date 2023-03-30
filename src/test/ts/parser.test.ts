// import { expect } from 'earljs'
// import { test } from 'uvu'
//
// import { parse, ValidationError } from '../../main/ts/parser'
//
// test('`parser` throws error on invalid workflow', () => {
//   expect(() => parse(`
//   name: foo
// `))
//   .toThrow(
//     ValidationError,
//     'Invalid workflow'
//   )
// })
//
// test('`parser` parses valid workflow', () => {
//   expect(parse(`
//   name: foo
//   on: push
//   jobs:
//     analyze:
//       steps:
//         - uses: checkout
// `))
//   .toEqual({
//     name: 'foo',
//     on: 'push',
//     jobs: {
//       analyze: {
//         steps: [
//           {
//             uses: 'checkout',
//           }
//         ]
//       }
//     }
//   })
// })
//
// // test.run()
