import * as _ from 'lodash';
import * as bluebird from 'bluebird';
import Semaphore from 'semaphore-async-await';

const durationTable = [
    500, 500, 500, 500,
];

async function sequentialLoop() {
    console.log('> Sequential loop:');
    console.log(`waiting for about ${_.sum(durationTable)} ms`);

    const startDate = Date.now();
    await bluebird.each(durationTable, async (duration) => {
        await bluebird.delay(duration);
    });

    console.log('total time: ', Date.now() - startDate);
}

async function sequentialLoopNotWorking() {
    console.log('> [FAIL] Sequential loop with simple map:');
    console.log(`waiting for about ${_.sum(durationTable)} ms`);

    const startDate = Date.now();
    await durationTable.map(async (duration) => {
        await bluebird.delay(duration);
    });

    console.log('total time: ', Date.now() - startDate);
}

async function concurrentLoop() {
    console.log('> Concurrent loop:');
    console.log(`waiting for about ${_.max(durationTable)} ms`);

    const startDate = Date.now();
    await bluebird.map(durationTable, async (duration) => {
        await bluebird.delay(duration);
    });

    console.log('total time: ', Date.now() - startDate);
}

async function concurrentLoopWithLocalSem() {
    console.log('> Concurrent loop with sem(2) (with bluebird):');
    console.log(`waiting for about ${_.sum(durationTable)/2} ms`);

    const startDate = Date.now();

    async function functionWithTwoConcurrentRunnersMax(duration) {
        await bluebird.delay(duration);
    }
    await bluebird.map(durationTable, functionWithTwoConcurrentRunnersMax, { concurrency: 2 });

    console.log('total time: ', Date.now() - startDate);
}

async function concurrentLoopWithGlobalSemNotWorking() {
    console.log('> [FAIL] Concurrent loop with global sem(2) is called by 2 concurrent consumers (with bluebird):');
    console.log(`waiting for about ${_.sum(durationTable)} ms`);

    const startDate = Date.now();

    async function functionWithTwoConcurrentRunnersMax(duration) {
        await bluebird.delay(duration);
    }

    await bluebird.map([1, 2], async () => {
        await bluebird.map(durationTable, functionWithTwoConcurrentRunnersMax, { concurrency: 2 });
    });

    console.log('total time: ', Date.now() - startDate);
}

async function concurrentLoopWithGlobalSemWorking() {
    console.log('> Concurrent loop with global sem(2) is called by 2 concurrent consumers (with Semaphore):');
    console.log(`waiting for about ${_.sum(durationTable)} ms`);

    const startDate = Date.now();
    const lock = new Semaphore(2);

    async function loopFunction(duration) {
        await lock.acquire();
        await bluebird.delay(duration);
        lock.release();
    }

    await bluebird.map([1, 2], async () => {
        await bluebird.map(durationTable, loopFunction);
    });

    console.log('total time: ', Date.now() - startDate);
}

(async function () {
    await sequentialLoop();
    await concurrentLoop();
    await sequentialLoopNotWorking();
    await concurrentLoopWithLocalSem();
    await concurrentLoopWithGlobalSemNotWorking();
    await concurrentLoopWithGlobalSemWorking();
}()).catch((e) => {
    console.error(e.stack);
});
