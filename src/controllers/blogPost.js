const service = require('../services');

module.exports = {
  create: async (req, res, next) => {
    const { id } = req.user; 
    try {
      const { status, data, message,
      } = await service.blogPost.create({ id, ...req.body });

      res.status(status).json(data || { message });
    } catch (err) {
      next(err);
    }
  },

  findAll: async (_req, res, next) => {
    try {
      const { status, data, message,
      } = await service.blogPost.findAll();

      res.status(status).json(data || { message });
    } catch (err) {
      next(err);
    }
  },

  findByPk: async (req, res, next) => {
    try {
      const { status, data, message,
      } = await service.blogPost.findByPk(req.params);

      res.status(status).json(data || { message });
    } catch (err) {
      next(err);
    }
  },
};