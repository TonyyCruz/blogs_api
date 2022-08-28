const express = require('express');
const controller = require('../controllers');
const validationMiddleware = require('../middleware/validation');

const routerUser = express.Router();

routerUser.post('/',
  validationMiddleware.userCreate,
  controller.user.create);

  //  ====  TOKEN VALIDATION ==== //
routerUser.use(validationMiddleware.token);

routerUser.get('/',
controller.user.findAll);

routerUser.get('/:id',
controller.user.findByPk);

module.exports = routerUser;