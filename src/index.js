const api = require('./core/express')
const router = require('./routes')
api.app.use(router)
api.initAPI()