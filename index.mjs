import { run } from 'node:test';

async function main() {
    console.log('Start.');

    await new Promise((res, rej) => run({
            files: ['./foo.test.mjs'],
            isolation: 'none'
        })
        .on('data', () => {})
        .on('test:enqueue', enqueueEvent => {
            if (!enqueueEvent?.file) {
                const e = new Error('No file field');
                e.enqueueEvent = enqueueEvent;
                rej(e);
            }
        })
        .on('end', res)
        .on('error', rej)
    );

    console.log('Finish.');
}

main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
