const express = require('express')

const router = express.Router()
const {redirectUrl} = require('../controllers/url.controller')

const {createShortUrl} = require('../controllers/url.controller')

router.post('/api/shorten',createShortUrl)
router.get('/:shortCode',redirectUrl)
module.exports = router