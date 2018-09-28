import { wait, run } from 'f-promise';
import * as fs from 'fs';
import * as chai from 'chai';
const assert = chai.assert;

function executeSimpleCallbackWithoutError() {
    const result: string[] = wait(cb => fs.readdir('/tmp', cb));
    assert.isAbove(result.length, 0)
}

function executeSimpleCallbackWithError() {
    assert.throws(() => {
        wait(cb => fs.readdir('/not-exists', cb));
    });
}

run(() => {
    executeSimpleCallbackWithoutError();
    executeSimpleCallbackWithError();
}).catch((e) => {
    console.error(e.stack);
});
