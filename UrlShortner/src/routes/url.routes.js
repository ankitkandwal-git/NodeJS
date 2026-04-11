const express = require('express')

const router = express.Router()

const {createShortUrl} = require('../controllers/url.controller')

router.post('/api/shorten',createShortUrl)

module.exports = router