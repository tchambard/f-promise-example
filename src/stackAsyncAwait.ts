import 'source-map-support/register';
import * as got from 'got';

async function fn3() {
    await got('https://www.host.com/url-does-not-exists');
}

async function fn2() {
    await fn3();
}

async function main() {
    await fn2();
}

main()
    .catch((e) => {
        console.error(e.stack);
    });
