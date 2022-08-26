const express = require('express');
const controller = require('../controllers');

const routerUser = express.Router();

routerUser.post('/', controller.userCreate);

module.exports = routerUser;