import * as bluebird from 'bluebird';
const fs = bluebird.promisifyAll(require("fs"));

import * as chai from 'chai';
chai.use(require('chai-as-promised'));
const assert = chai.assert;


async function executeSimpleCallbackWithoutError() {
    const result = await fs.readdirAsync('/tmp');
    assert.isAbove(result.length, 0)
}

async function executeSimpleCallbackWithError() {
    return assert.isRejected(fs.readdirAsync('/not-exists'));
}

(async function () {
    await executeSimpleCallbackWithoutError();
    await executeSimpleCallbackWithError();
}()).catch((e) => {
    console.error(e.stack);
});
