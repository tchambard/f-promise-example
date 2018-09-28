import 'source-map-support/register';
import { run, wait } from 'f-promise';
import * as got from 'got';

function functionOne() {
    wait(got('https://www.bee.com/url-does-not-exists'));
}

function functionTwo() {
    functionOne();
}

run(() => {
    functionTwo()
}).catch((e) => {
    console.error(e.stack);
});

