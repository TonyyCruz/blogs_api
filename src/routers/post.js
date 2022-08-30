const express = require('express');
const controller = require('../controllers');
const validationMiddleware = require('../middleware/validation');

const routerPost = express.Router();

//  ====  TOKEN VALIDATION ==== //
routerPost.use(validationMiddleware.token);

routerPost.post('/',
validationMiddleware.blogPost,
controller.blogPost.create);

routerPost.get('/',
controller.blogPost.findAll);

module.exports = routerPost;