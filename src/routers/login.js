const express = require('express');
const controller = require('../controllers');

const routerLogin = express.Router();

routerLogin.post('/', controller.login);

module.exports = routerLogin;