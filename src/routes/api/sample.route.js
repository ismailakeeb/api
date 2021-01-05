const express = require('express')
const router = express.Router()

router.get('/x', (req, res) => {
    return res.status(200).send('api running...')
})

module.exports = router