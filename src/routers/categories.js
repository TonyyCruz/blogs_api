const express = require('express');
const controller = require('../controllers');
const middlewareValidation = require('../middleware/validation');
// const controller = require('../controllers');

const routerCategories = express.Router();

routerCategories.use(middlewareValidation.token);

routerCategories.post('/', controller.categories.create);

module.exports = routerCategories;