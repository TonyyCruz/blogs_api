const express = require('express');

const router = express.Router();

router.use('/login', require('./login'));

router.use('/user', require('./user'));

router.use('/categories', require('./categories'));

router.use('/post', require('./post'));

module.exports = router;