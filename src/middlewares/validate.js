const responseHandler = require('../utils/response')
const validate = (joi, body = 'body') => {
    return (req, res, next) => {
        const {error} = joi.validate(req[body],{abortEarly: false,allowUnknown: true})
        const valid = error == null
        if (valid){
            next()
        } else{
            const {details} = error
            const message = details.map(i => i.message && i.message.replace(/['"]/g, '').replace(/mongo/g, '')).join(' and ')
            return responseHandler.sendError(res, message, 422)
        }
    }
}

module.exports = validate;