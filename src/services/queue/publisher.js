const amqp = require('amqplib')
const config = require('../../config')
const addEvents = require('./add-events')
const {type} = require('./contants')
const QError = require('./error')

/**
 * Create a publisher with the given options.
 * @param options
 *   - exchange
 *   - onError a handler to handle connection errors (optional)
 *   - onClose a handler to handle connection closed events (optional)
 * @return A Publisher
 */
const publisher = options => {
    const {onError, onClose, exchange} = options
    let connection
    let channel
    const start = async () => {
        if (channel) throw new Error(QError.QUEUE_ALREADY_STARTED)
        connection = await amqp.connect(config.amqURL)
        addEvents(connection, {onError, onClose})
        channel = await connection.createChannel()
        await channel.assertExchange(exchange, type, {durable: true})
    }
    const stop = async () => {
        if (!channel) throw new Error(QError.QUEUE_NOT_STARTED)
        await channel.close()
        channel = undefined
    }
    const publish = async (key, message) => {
        if (!channel) throw new Error(QError.QUEUE_NOT_STARTED)
        const buffer = Buffer.from(message)
        console.log(buffer)
        return channel.publish(exchange, key, buffer)
    }

    const close = async () => {
        if (!connection) throw new Error(QError.QUEUE_NOT_STARTED)
        await connection.close()
        channel = undefined
        connection = undefined
    }
    return {start, stop, close, publish}
}

module.exports = publisher