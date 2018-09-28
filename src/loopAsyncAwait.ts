import * as _ from 'lodash';
import * as bluebird from 'bluebird';

const durationTable = [
    500, 500, 500, 500,
];

async function sequentialLoop() {
    console.log('> Sequential loop:');
    console.log(`waiting for about ${_.sum(durationTable)} ms because of sequential loop`);

    const startDate = Date.now();
    await bluebird.each(durationTable, async (duration) => {
        await bluebird.delay(duration);
    });

    console.log('total time: ', Date.now() - startDate);
}

async function concurrentLoop() {
    console.log('> Concurrent loop:');
    console.log(`waiting for about ${_.max(durationTable)} ms because of concurrent loop`);

    const startDate = Date.now();
    await bluebird.map(durationTable, async (duration) => {
        await bluebird.delay(duration);
    });

    console.log('total time: ', Date.now() - startDate);
}

(async function () {
    await sequentialLoop();
    await concurrentLoop();
}()).catch((e) => {
    console.error(e.stack);
});
