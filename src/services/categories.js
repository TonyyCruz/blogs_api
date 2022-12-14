const { Category } = require('../database/models');

module.exports = {
  create: async ({ name }) => {
    if (!name) return { status: 400, message: '"name" is required' };

    const newCategory = await Category.create({ name });

    if (!newCategory) return { status: 401, message: 'Unexpected error' };

    return { status: 201, data: newCategory.dataValues };
  },

  findAll: async () => {
    const categories = await Category.findAll();

    if (!categories) return { status: 401, message: 'Unexpected error' };
    return { status: 200, data: categories };
  },
};