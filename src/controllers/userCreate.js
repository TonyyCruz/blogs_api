const service = require('../services');

module.exports = (req, res, next) => {
  try {
    const { status, token, message } = service.userCreate(req.body);
    res.status(status).json(token || { message });
  } catch (err) {
    next(err);
  }
};