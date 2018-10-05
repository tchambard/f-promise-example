import * as fs from 'fs-extra';
import { wait } from 'f-promise';
import * as bluebird from 'bluebird';

require('f-mocha').setup();

describe('polling with async', () => {
    const pollingFile = '/tmp/async-await-polling';

    before(() => {
        fs.removeSync(pollingFile);
    });

    after(() => {
        fs.removeSync(pollingFile);
    });

    async function fileExists(): Promise<boolean> {
        return await fs.pathExists(pollingFile);
    }

    it('wait for someting change ', async () => {
        setTimeout(() => {
            fs.writeFileSync(pollingFile, '');
        }, 1500);

        while (!await fileExists()) {
            console.log('polling...');
            await bluebird.delay(400)
        }
    });

});
