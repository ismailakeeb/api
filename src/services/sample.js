const Mali = require('mali')
const path = require('path')
async function sayHello(ctx) {
    console.log(ctx)
    ctx.res = {message: 'Hello '.concat(ctx.req.name)}
}

function main() {
    console.log(path.resolve(__dirname, '../../youid-proto/sample/sample.proto'))
    const app = new Mali(path.resolve(__dirname, '../../youid-proto/sample/sample.proto'), 'SampleService')
    app.use({sayHello })
    app.start('127.0.0.1:50051')
}

main()