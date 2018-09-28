import { wait, run, map, funnel } from 'f-promise';
import * as _ from 'lodash';

const durationTable = [
    500,500,500,500
];

function sequentialLoop() {
    console.log('> Sequential loop:');
    console.log(`waiting for about ${_.sum(durationTable)} ms`);

    const startDate = Date.now();
    durationTable.forEach((duration) => {
        wait(cb => setTimeout(cb, duration));
    });

    console.log('total time: ',  Date.now() - startDate);
}

function concurrentLoop() {
    console.log('> Concurrent loop:');
    console.log(`waiting for about ${_.max(durationTable)} ms`);

    const startDate = Date.now();
    map(durationTable, (duration) => {
        wait(cb => setTimeout(cb, duration));
    });

    console.log('total time: ', Date.now() - startDate);
}

function concurrentLoopWithLocalFunnel() {
    console.log('> Concurrent loop with funnel(2):');
    console.log(`waiting for about ${_.sum(durationTable)/2} ms`);

    const localFunnel = funnel(2);
    const startDate = Date.now();

    function loopFunction(duration) {
        localFunnel(() => {
            wait(cb => setTimeout(cb, duration));
        })
    }
    map(durationTable, loopFunction);

    console.log('total time: ', Date.now() - startDate);
}

function concurrentLoopWithGlobalFunnel() {
    console.log('> Concurrent loop with global funnel(2) is called by 2 concurrent consumers:');
    console.log(`waiting for about ${_.sum(durationTable)} ms`);

    const startDate = Date.now();
    const globalFunnel = funnel(2);

    function functionWithTwoConcurrentRunnersMax(duration) {
        globalFunnel(() => {
            wait(cb => setTimeout(cb, duration));
        })
    }

    map([1, 2], () => {
        map(durationTable, functionWithTwoConcurrentRunnersMax);
    });

    console.log('total time: ', Date.now() - startDate);
}

run(() => {
    sequentialLoop();
    concurrentLoop();
    concurrentLoopWithLocalFunnel();
    concurrentLoopWithGlobalFunnel();
}).catch((e) => {
    console.error(e.stack);
});
