import * as fs from 'fs-extra';
import { wait } from 'f-promise';

require('f-mocha').setup();

describe('polling with f-promise', () => {
    const pollingFile = '/tmp/f-promise-polling';

    before(() => {
        fs.removeSync(pollingFile);
    });

    after(() => {
        fs.removeSync(pollingFile);
    });

    function fileExists(): boolean {
        return wait(fs.pathExists(pollingFile));
    }

    it('wait for someting change ', () => {
        setTimeout(() => {
            fs.writeFileSync(pollingFile, '');
        }, 1500);

        while (!fileExists()) {
            console.log('polling...');
            wait(cb => setTimeout(cb, 400));
        }
    });

});
