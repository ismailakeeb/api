const attachEvents = (connection, {onError, onClose}) => {
    const add = (event, handler) => {
        if (typeof handler === 'function') connection.on(event, handler)
    }
    add('error', onError)
    add('close', onClose)
}

module.exports = attachEvents