const mongoose = require('mongoose')
const config = require('../../config')
mongoose.connection.on('connected', () => {
    console.log(' API Db connected !!!')
})

mongoose.connection.on('disconnected', (err) => {
    console.warn(` Db disconnect from MongoDB via Mongoose because of ${err}`)
})

mongoose.connection.on('error', (err) => {
    console.log(`Could not connect to  DB because of ${err}`)
    process.exit(-1)
})
const db = mongoose.createConnection(config.mongoURL,  {
    poolSize: 10,
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
    //  useUnifiedTopology: true
})
db.then(conn => {
    console.log(`Mongodb connected successfully.`)
})
db.on('connected', () => {
    console.log('Db connected successfully')
})

module.exports = db
/*

exports.connect = () => {
    let mURL = config.mongoURL
    return new Promise((resolve, reject) => {
        mongoose.connect(mURL, {
            poolSize: 10,
            keepAlive: 1,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
            //  useUnifiedTopology: true
        }).then(() => {
            resolve(mongoose.connection)
        }).catch(err => reject(err))
    })
}*/
