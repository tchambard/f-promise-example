import * as bluebird from 'bluebird';
import * as chai from 'chai';
import * as _ from 'lodash';
const assert = chai.assert;

describe('array functions with async/await', () => {
    it('[FAIL] execute simple native forEach contains await should do them sequentially', async () => {
        let acc = 0;
        await [0, 1, 2].forEach(async (i) => {
            await bluebird.delay(1);
            acc+=i;
        });
        assert.equal(acc, 3)
    });

    it('[FAIL] execute simple lodash forEach contains await should do them sequentially', async () => {
        let acc = 0;
        await _.forEach([0, 1, 2], async (i) => {
            await bluebird.delay(1);
            acc+=i;
        });
        assert.equal(acc, 3)
    });
});
