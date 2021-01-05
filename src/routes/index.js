const express = require('express')
const smaple = require('./api/sample.route')
const router = express.Router()
router.get('/', (req, res) => {
    res.send('YOUID API running...')
})
router.use('/test', smaple)
module.exports = router;