const { run, wait } = require('f-promise');
const got = require('got');

function functionOne() {
    wait(got('https://www.bee.com/url-does-not-exists'));
}

function functionTwo() {
    functionOne();
}

run(() => {
    functionTwo()
}).catch((e) => {
    console.error(`${e.message} : ${e.stack}`);
});

