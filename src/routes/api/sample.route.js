const express = require('express')
const router = express.Router()
const App = require('../../controllers/AppController')
const appC = new App()
router.get('/x', (req, res) => {
    appC.log()
    return res.status(200).send('api running...')
})

module.exports = router