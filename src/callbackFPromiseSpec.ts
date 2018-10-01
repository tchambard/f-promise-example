import { wait } from 'f-promise';
import * as fs from 'fs';
import * as chai from 'chai';
const assert = chai.assert;

require('f-mocha').setup();

describe('how to call functions with callbacks with f-promise', () => {
    it('execute simple callback without error', () => {
        const result: string[] = wait(cb => fs.readdir('/tmp', cb));
        assert.isAbove(result.length, 0);
    });

    it('execute simple callback with error', () => {
        assert.throws(() => {
            wait(cb => fs.readdir('/not-exists', cb));
        });
    });
});
