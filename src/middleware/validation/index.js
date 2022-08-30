const user = require('./userValidate');
const tokenValidate = require('./tokenValidate');
const postCreateValidate = require('./postCreateValidate');
const postUpdateValidate = require('./postUpdateValidate');
const postDeleteValidate = require('./postDeleteValidate');

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

  blogPostCreate: async (req, res, next) => {
    try {
      const validate = await postCreateValidate(req.body);
      if (validate.message) {
        return res.status(validate.status).json({ message: validate.message });
      }
      next();
    } catch (err) {
      next(err);
    }
  },

  blogPostUpdate: async (req, res, next) => {
    const userId = req.user.id;
    const postPk = req.params.id;
    try {
      const validate = await postUpdateValidate({
        postPk, userId, ...req.body });

      if (validate.message) {
        return res.status(validate.status).json({ message: validate.message });
      }
      next();
    } catch (err) {
      next(err);
    }
  },

  blogPostDelete: async (req, res, next) => {
    const userId = req.user.id;
    const postPk = req.params.id;
    try {
      const validate = await postDeleteValidate({ postPk, userId });

      if (validate.message) {
        return res.status(validate.status).json({ message: validate.message });
      }
      next();
    } catch (err) {
      next(err);
    }
  },
};