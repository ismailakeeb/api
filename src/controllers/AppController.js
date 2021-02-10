const logger = require('../utils/logger')

class AppController {
    constructor() {
        this.logger = logger
    }

    log(){
        this.logger.info('Hello makanaki.')
    }
}

module.exports = AppController