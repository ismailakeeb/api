const amqp = require('amqplib')
const config = require('../../config')
const addEvents = require('./add-events')
const QError= require('./error')
const {type} = require('./contants')

/**
 * Create a Subscriber with the given options.
 * @param options
 *   - routingKeys An array of keys to use for message handler routing (optional, defaults to [])
 *   - onError a handler to handle connection errors (optional)
 *   - onClose a handler to handle connection closed events (optional)
 * @return A Subscriber
 */

const subscriber = options => {
    const {routingKeys, onError, onClose, exchange, queueName} = options
    let connection
    let channel
    let queue

    const start = async handler => {
        if (channel) throw new Error(QError.NOT_CONNECTED)
        connection = await amqp.connect(config.amqURL)
        addEvents(connection, {onError, onClose})
        channel = await connection.createChannel()
        channel.assertExchange(exchange, type, { durable: true })
        const result = await channel.assertQueue(queueName, { exclusive: false });
        ({ queue } = result)
        const rKeys = routingKeys || [queueName]
        rKeys.forEach(rKey => {
            channel.bindQueue(queueName, exchange, rKey)
        })
        channel.prefetch(1)
        channel.consume(queue, handler)
    }

    const stop = async () => {
        if (!channel) throw new Error('Queue not started')
        await channel.close()
        channel = undefined
    }

    const ack = message => {
        if (!channel) throw new Error('No channel')
        channel.ack(message)
    }

    const nack = message => {
        if (!channel) throw new Error('Queue not started')
        channel.nack(message)
    }

    const purgeQueue = async () => {
        if (!channel) throw new Error('Queue not started')
        await channel.purgeQueue(queue)
    }

    const close = async () => {
        if (!connection) throw new Error('No Connection')
        await connection.close()
        channel = undefined
        connection = undefined
    }
    return {start, stop, close, ack, nack, purgeQueue}
}

module.exports = subscriber