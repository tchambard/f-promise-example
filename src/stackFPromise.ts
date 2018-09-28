import 'source-map-support/register';
import { run, wait } from 'f-promise';
import * as got from 'got';

function fn3() {
    wait(got('https://www.host.com/url-does-not-exists'));
}

function fn2() {
    fn3();
}

function fn1() {
    fn2();
}

run(() => {
    fn1();
}).catch((e) => {
    console.error(e.stack);
});

