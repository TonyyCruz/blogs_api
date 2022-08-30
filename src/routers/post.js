const express = require('express');
const controller = require('../controllers');
const validationMiddleware = require('../middleware/validation');

const routerPost = express.Router();

//  ====  TOKEN VALIDATION ==== //
routerPost.use(validationMiddleware.token);

routerPost.post('/',
validationMiddleware.blogPostCreate,
controller.blogPost.create);

routerPost.get('/',
controller.blogPost.findAll);

routerPost.get('/:id',
controller.blogPost.findByPk);

routerPost.put('/:id',
validationMiddleware.blogPostUpdate,
controller.blogPost.update);

routerPost.delete('/:id',
validationMiddleware.blogPostDelete,
controller.blogPost.delete);

module.exports = routerPost;