const {routingKeys} = require('./contants')
const sub = require('./subscriber')
module.exports = {
    sub: () => sub({routingKeys}),
    pub: require('./publisher')
}