const user = require('./user');

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
};