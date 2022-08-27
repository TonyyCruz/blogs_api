const service = require('../services');

module.exports = {
  create: async (req, res, next) => {
    try {
      const { status, data, message,
      } = await service.categories.create(req.body);
      res.status(status).json(data || { message });
      next();
    } catch (err) {
      next(err);
    }
  },
};