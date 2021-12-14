const express = require('express');
const UrlController = require('../controllers/urlController')
const router = express.Router();

router.post('/shorten', UrlController.urlShort)
router.get('/:urlCode', UrlController.redirectUrl)

module.exports = router;