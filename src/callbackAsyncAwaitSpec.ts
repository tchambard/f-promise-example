import * as bluebird from 'bluebird';
import * as chai from 'chai';

const fs = bluebird.promisifyAll(require("fs"));

chai.use(require('chai-as-promised'));
const assert = chai.assert;

describe('how to call functions with callbacks with async/await', () => {
    it('execute simple callback without error', async () => {
        const result = await fs.readdirAsync('/tmp');
        assert.isAbove(result.length, 0)
    });

    it('execute simple callback with error', () => {
        assert.isRejected(fs.readdirAsync('/not-exists'));
    });
});
