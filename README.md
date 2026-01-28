# TLDR

See the error demonstrated with `npm start`. Comment out syntax error in
`foo.test.mjs` to see correct behavior.

Current (incorrect) output:

```
Start.
Error: No file field
    at TestsStream.<anonymous> (file:///home/hamptos/Artifacts/code/@schildkroeteninsel/node-test-reporter-mre/index.mjs:13:27)
    at TestsStream.emit (node:events:508:28)
    at [kEmitMessage] (node:internal/test_runner/tests_stream:153:10)
    at TestsStream.enqueue (node:internal/test_runner/tests_stream:91:23)
    at Test.start (node:internal/test_runner/test:993:19)
    at startSubtestAfterBootstrap (node:internal/test_runner/harness:358:17) {
  enqueueEvent: [Object: null prototype] {
    nesting: 0,
    name: './foo.test.mjs',
    type: 'test'
  }
}
```

Correct expected output:

```
Start.
File: /home/hamptos/Artifacts/code/@schildkroeteninsel/node-test-reporter-mre/foo.test.mjs
Finish.
```

# Info

When running the Node test-runner with `isolation="none"`, e.g.:

```javascript
run({
    files: ['./foo.test.mjs'],
    isolation: 'none'
})
```

If the identified test file contains a syntax error, the generated
`test:enqueue` does not have a `file` field.
