const service = require('../services');

module.exports = {
  create: async (req, res, next) => {
    try {
      const { status, token, message } = await service.user.create(req.body);
      res.status(status).json(token || { message });
    } catch (err) {
      next(err);
    }
  },

  findAll: async (_req, res, next) => {
    try {
      const { status, data, message } = await service.user.findAll();
      res.status(status).json(data || { message });
    } catch (err) {
      next(err);
    }
  },
};