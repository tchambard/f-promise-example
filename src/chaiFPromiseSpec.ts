import * as got from 'got';
import * as chai from 'chai';
import { wait } from 'f-promise';

const assert = chai.assert;
require('f-mocha').setup();

describe('chai behaviour with f-promise', () => {
    function throwAsync() {
        wait(got('https://www.host.com/url-does-not-exists'));
    }

    function throwSync() {
        throw new Error();
    }

    it('assert async function throws ', () => {
        assert.throws(throwAsync);
    });

    it('assert sync function throws ', () => {
        assert.throws(throwSync);
    });
});
