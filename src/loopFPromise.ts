import { wait, run, map } from 'f-promise';
import * as _ from 'lodash';

const durationTable = [
    500,500,500,500
];

function sequentialLoop() {
    console.log('> Sequential loop:');
    console.log(`waiting for about ${_.sum(durationTable)} ms because of sequential loop`);

    const startDate = Date.now();
    _.each(durationTable, (duration) => {
        wait(cb => setTimeout(cb, duration));
    });

    console.log('total time: ',  Date.now() - startDate);
}

function concurrentLoop() {
    console.log('> Concurrent loop:');
    console.log(`waiting for about ${_.max(durationTable)} ms because of concurrent loop`);

    const startDate = Date.now();
    map(durationTable, (duration) => {
        wait(cb => setTimeout(cb, duration));
    });

    console.log('total time: ', Date.now() - startDate);
}

run(() => {
    sequentialLoop();
    concurrentLoop();
}).catch((e) => {
    console.error(e.stack);
});
