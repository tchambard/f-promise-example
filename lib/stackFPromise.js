const { run, wait } = require('f-promise');
const got = require('got');

function fn3() {
    wait(got('https://www.host.com/url-does-not-exists'));
}

function fn2() {
    fn3();
}

function main() {
    fn2();
}

run(() => {
    main()
}).catch((e) => {
    console.error(e.stack);
});

