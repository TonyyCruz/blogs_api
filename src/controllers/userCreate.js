const service = require('../services');

module.exports = async (req, res, next) => {
  try {
    const { status, token, message } = await service.userCreate(req.body);
    res.status(status).json(token || { message });
  } catch (err) {
    next(err);
  }
};