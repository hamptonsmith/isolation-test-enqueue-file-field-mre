import reporter from 'node-test-reporter';

import { run } from 'node:test';

const isolation = false;

async function main() {
    console.log('Without:');
    try {
        console.log(await awaitSummary(
            testStream()
        ));
    }
    catch (e) {
        console.log(e);
    }

    console.log('With:');
    try {
        console.log(await awaitSummary(
            testStream().compose(reporter)
        ));
    }
    catch (e) {
        console.log(e);
    }
}

function testStream() {
    return run({
        files: ['./foo.test.mjs'],
        isolation: isolation ? 'process' : 'none'
    });
}

function awaitSummary(stream) {
    let summary;

    return new Promise((res, rej) => stream
        .on('test:fail', f => rej(f))
        .on('test:summary', s => { summary = s; })
        .on('data', () => {})
        .on('error', rej)
        .on('end', () => res(summary)));
}

main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
