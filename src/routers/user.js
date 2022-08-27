const express = require('express');
const controller = require('../controllers');
const validationMiddleware = require('../middleware/validation');

const routerUser = express.Router();

routerUser.post('/',
  validationMiddleware.userCreate,
  controller.user.create);

routerUser.get('/',
validationMiddleware.token,
controller.user.findAll);

routerUser.get('/:id',
validationMiddleware.token,
controller.user.findByPk);

module.exports = routerUser;