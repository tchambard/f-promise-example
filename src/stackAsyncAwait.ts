import 'source-map-support/register';
import * as got from 'got';

async function functionOne() {
    await got('https://www.bee.com/url-does-not-exists');
}

async function functionTwo() {
    await functionOne();
}

functionTwo()
    .catch((e) => {
        console.error(`${e.message} : ${e.stack}`);
    });
