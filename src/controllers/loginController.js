const service = require('../services');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { token, status, message } = await service.login({ email, password });
    res.status(status).json(token || message);
  } catch (err) {
    next(err);
  }
};
