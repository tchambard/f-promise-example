import * as bluebird from 'bluebird';
import Semaphore from 'semaphore-async-await';
import * as chai from 'chai';
import * as _ from 'lodash';

const assert = chai.assert;
const durationTable = [
    500,500,500,500
];

describe.only('loops with async/await and bluebird', () => {

    describe('> Sequential loop', () => {
        it(`> should wait for about ${_.sum(durationTable)} ms`, async () => {
            const startDate = Date.now();
            await bluebird.each(durationTable, async (duration) => {
                await bluebird.delay(duration);
            });

            assert.isAbove(Date.now() - startDate, _.sum(durationTable) as number);
            assert.isBelow(Date.now() - startDate, _.sum(durationTable) + 20);
        }).timeout(10000);
    });

    describe('> [FAIL] Concurrent loop with native array functions', () => {
        it(`> should wait for about ${_.max(durationTable)} ms`, async () => {
            const startDate = Date.now();
            await durationTable.map(async (duration) => {
                await bluebird.delay(duration);
            });

            assert.isAbove(Date.now() - startDate, _.max(durationTable) as number);
            assert.isBelow(Date.now() - startDate, _.max(durationTable) as number + 20);
        }).timeout(10000);
    });

    describe('> Concurrent loop with concurrency in bluebird', () => {
        it(`> should wait for about ${_.sum(durationTable)/2} ms`, async () => {
            const startDate = Date.now();

            async function functionWithTwoConcurrentRunnersMax(duration) {
                await bluebird.delay(duration);
            }
            await bluebird.map(durationTable, functionWithTwoConcurrentRunnersMax, { concurrency: 2 });

            assert.isAbove(Date.now() - startDate, _.sum(durationTable)/2 as number);
            assert.isBelow(Date.now() - startDate, _.sum(durationTable)/2 as number + 20);
        }).timeout(10000);
    });

    describe('> [FAIL] Concurrent loop with global sem(2) is called by 2 concurrent consumers (with bluebird)', () => {
        it(`> should wait for about ${_.sum(durationTable)} ms`, async () => {
            const startDate = Date.now();

            async function functionWithTwoConcurrentRunnersMax(duration) {
                await bluebird.delay(duration);
            }

            await bluebird.map([1, 2], async () => {
                await bluebird.map(durationTable, functionWithTwoConcurrentRunnersMax, { concurrency: 2 });
            });

            assert.isAbove(Date.now() - startDate, _.sum(durationTable) as number);
            assert.isBelow(Date.now() - startDate, _.sum(durationTable) as number + 20);
        }).timeout(10000);
    });

    describe('> Concurrent loop with global sem(2) is called by 2 concurrent consumers (with Semaphore)', () => {
        it(`> should wait for about ${_.sum(durationTable)} ms`, async () => {
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

            assert.isAbove(Date.now() - startDate, _.sum(durationTable) as number);
            assert.isBelow(Date.now() - startDate, _.sum(durationTable) as number + 20);
        }).timeout(10000);
    });

});
