import { wait, map, funnel } from 'f-promise';
import * as chai from 'chai';
import * as _ from 'lodash';

const assert = chai.assert;
require('f-mocha').setup();

const durationTable = [
    500,500,500,500
];

describe.only('loops with f-promise', () => {

    describe('> Sequential loop', () => {
        it(`> should wait for about ${_.sum(durationTable)} ms`, () => {
            const startDate = Date.now();
            durationTable.forEach((duration) => {
                wait(cb => setTimeout(cb, duration));
            });
            assert.isBelow(Date.now() - startDate, _.sum(durationTable) + 20);
        }).timeout(10000);
    });

    describe('> Concurrent loop', () => {
        it(`> should wait for about ${_.max(durationTable)} ms`, () => {
            const startDate = Date.now();
            map(durationTable, (duration) => {
                wait(cb => setTimeout(cb, duration));
            });
            assert.isBelow(Date.now() - startDate, _.max(durationTable) as number + 20);
        }).timeout(10000);
    });

    describe('> Concurrent loop with funnel(2)', () => {
        it(`> should wait for about ${_.sum(durationTable)/2} ms`, () => {
            const localFunnel = funnel(2);
            const startDate = Date.now();

            function loopFunction(duration) {
                localFunnel(() => {
                    wait(cb => setTimeout(cb, duration));
                })
            }
            map(durationTable, loopFunction);
            assert.isBelow(Date.now() - startDate, _.sum(durationTable)/2 as number + 20);
        }).timeout(10000);
    });

    describe('> Concurrent loop with global funnel(2) is called by 2 concurrent consumers', () => {
        it(`> should wait for about ${_.sum(durationTable)} ms`, () => {
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

            assert.isBelow(Date.now() - startDate, _.sum(durationTable) as number + 20);
        }).timeout(10000);
    });

});
