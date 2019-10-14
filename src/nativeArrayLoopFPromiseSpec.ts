import * as chai from 'chai';
import * as _ from 'lodash';
import { wait } from 'f-promise';
const assert = chai.assert;

require('f-mocha').setup();
describe('array functions with f-promise', () => {
    it('execute simple native forEach contains wait should do them sequentially', () => {
        let acc = 0;
        [0, 1, 2].forEach((i) => {
            wait(cb => setTimeout(cb, 1));
            acc+=i;
        });
        assert.equal(acc, 3)
    });

    it('execute simple lodash forEach contains wait should do them sequentially', () => {
        let acc = 0;
        _.forEach([0, 1, 2], (i) => {
            wait(cb => setTimeout(cb, 1));
            acc+=i;
        });
        assert.equal(acc, 3)
    });
});
