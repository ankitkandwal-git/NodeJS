const express = require('express')

const router = express.Router()
const {redirectUrl} = require('../controllers/url.controller')
const {getStats} = require('../controllers/url.controller')
const {createShortUrl} = require('../controllers/url.controller')

router.post('/api/shorten', createShortUrl)
router.get('/api/stats/:shortCode', getStats)
// Keep dynamic shortCode route last so it doesn't shadow /api routes
router.get('/:shortCode', redirectUrl)
module.exports = router