const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const http = require('http')
let caller = require('grpc-caller')
const config = require('../../config')
const rawBodySaver = function (req, _res, buf, encoding) {
    if (buf && buf.length)req.rawBody = buf.toString(encoding || 'utf8');
}
const app = express()
app.use(cors())
app.use(bodyParser.json({limit: '50mb', verify: rawBodySaver}))
app.use(bodyParser.urlencoded({limit: '50mb', verify: rawBodySaver, extended: false}))
app.use(morgan('dev'))
app.use(helmet())


const initAPI = () => {
    const server = http.createServer(app)
    server.listen(config.port, (err) => {
        if (err) {
            console.log(`API could not be start `, err)
            process.exit(-1)
        }
        const path = require('path')
        let client = caller('127.0.0.1:50051', path.resolve(__dirname, '../../../youid-proto/sample/sample.proto'), 'SampleService')
         client.sayHello('Akeeb').then(res => {
             console.log('service reponse', res)
         })
        console.log('API running on '+ config.port)

    })
}
module.exports = {
    app, initAPI
}