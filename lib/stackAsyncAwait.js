const got = require('got');

async function fn3() {
    await got('https://www.host.com/url-does-not-exists');
}

async function fn2() {
    await fn3();
}

async function fn1() {
    await fn2();
}

fn1()
    .catch((e) => {
        console.error(`${e.message} : ${e.stack}`);
    });
