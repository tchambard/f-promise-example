import * as got from 'got';
import * as chai from 'chai';

chai.use(require('chai-as-promised'));
const assert = chai.assert;

describe('chai behaviour with async/await', () => {
    async function throwAsync() {
        await got('https://www.host.com/url-does-not-exists');
    }

    function throwSync() {
        throw new Error();
    }

    it('assert async function throws ', () => {
        return assert.isRejected(throwAsync());
    });

    it('assert sync function throws ', () => {
        return assert.throws(throwSync);
    });
});
