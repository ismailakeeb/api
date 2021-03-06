const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const http = require('http')
const {sub} = require('../../services/queue')
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
    server.listen(config.port, async (err) => {
        if (err) {
            console.log(`API could not be start `, err)
            process.exit(-1)
        }
        const subscriber = await sub()
        subscriber.start(msg => {
            const channelName = msg.fields.routingKey
            console.log(channelName)
            const {event} = JSON.parse(msg.content.toString())
            console.log(msg.content.toString())
            subscriber.ack(msg)

        })
        console.log('API running on '+ config.port)

    })
}
module.exports = {
    app, initAPI
}