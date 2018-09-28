const { run, wait } = require('f-promise');
const got = require('got');

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
    fn1()
}).catch((e) => {
    console.error(e.stack);
});

