const express = require('express');
const controller = require('../controllers');
const validationMiddleware = require('../middleware/validation');

const routerUser = express.Router();

routerUser.post('/',
  validationMiddleware.userCreate,
  controller.user.create);

routerUser.get('/', controller.user.findAll);

module.exports = routerUser;