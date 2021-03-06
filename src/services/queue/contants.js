module.exports = {
    type: 'topic',
    exchange: 'YOUID',
    queueName: 'YOUID-ADMIN',
    routingKeys: ['template.published', 'template.published.updated', 'payment.failed']
}