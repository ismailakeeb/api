const winston = require('winston')
const root = require('app-root-path')
module.exports = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: `${root}/logs/combine.log`,
            maxsize: 5342880,
            maxFiles: 5,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
        new winston.transports.Console({
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.colorize({all: true}),
                winston.format.timestamp(),
                winston.format.errors({stack: true}),
                winston.format.printf((info) =>{
                    `${info.timestamp} [${info.level}]: ${info.message}`
                } )
            )
        })
    ],
    exitOnError: false
})