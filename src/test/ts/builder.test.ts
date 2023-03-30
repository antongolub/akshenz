// import { expect } from 'earljs'
// import { test } from 'uvu'
// import {$} from 'zx-extra'
//
// import { parse } from '../../main/ts/parser'
// import { build } from '../../main/ts/builder'
//
// test('`builder` builds an image for the specified step', async () => {
//   const input = {
//     repository: 'https://github.com/semrel-extra/toposource.git'
//   }
//   const {workflow, providers} = await parse(`
//     name: foo
//     on: push
//     jobs:
//       analyze:
//         steps:
//           - uses: checkout
//   `)
//   const tag = 'akshenz'
//   const jobId = 'analyze'
//   const job = workflow.jobs[jobId]
//
// //   await build({
// //     job,
// //     providers,
// //     tag
// //   })
// //   const script = `
// // echo "TEST"
// // echo "TEST2"
// // `
// //
// //   const res = await $`docker run -e INPUT_REPOSITORY='${input.repository}' -e SCRIPT=${script} docker.io/local/${tag}`
// //
// //   console.log(res.stdout.toString())
// })
//
// // test.run()
