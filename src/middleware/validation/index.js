const user = require('./userValidate');
const tokenValidate = require('./tokenValidate');
const blogPostValidate = require('./blogPostValidate');

module.exports = {
  userCreate: async (req, res, next) => {
    try {
      const validate = await user.createUserValidation(req.body);
      if (validate.message) {
        return res.status(validate.status).json({ message: validate.message });
      }
      next();
    } catch (err) {
      next(err);
    }
  },

  token: (req, res, next) => {
    const { authorization } = req.headers;
    try {
      const validation = tokenValidate(authorization);
      if (validation.message) {
        return res.status(validation.status)
        .json({ message: validation.message });
      }

      const { id, displayName, email } = validation;
      req.user = { id, displayName, email };

      next();
    } catch (err) {
      next(err);
    }
  },

  blogPost: async (req, res, next) => {
    try {
      const validate = await blogPostValidate(req.body);
      if (validate.message) {
        return res.status(validate.status).json({ message: validate.message });
      }
      next();
    } catch (err) {
      next(err);
    }
  },
};