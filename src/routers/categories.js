const express = require('express');
const controller = require('../controllers');
const middlewareValidation = require('../middleware/validation');

const routerCategories = express.Router();

//  ====  TOKEN VALIDATION ==== //
routerCategories.use(middlewareValidation.token);

routerCategories.post('/', controller.categories.create);

routerCategories.get('/', controller.categories.findAll);

module.exports = routerCategories;