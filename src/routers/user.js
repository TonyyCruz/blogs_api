const express = require('express');
const controller = require('../controllers');
const validationMiddleware = require('../middleware/validation');

const routerUser = express.Router();

routerUser.post('/',
  validationMiddleware.userCreate,
  controller.userCreate);

module.exports = routerUser;