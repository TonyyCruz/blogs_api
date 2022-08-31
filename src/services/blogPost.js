const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../database/models');

module.exports = {
  create: async ({ id, title, content, categoryIds }) => {
    const { dataValues } = await BlogPost.create({
      title, content, userId: id,
    });

    categoryIds.forEach(async (categoryId) => (
      PostCategory.create({ postId: dataValues.id, categoryId })
    ));

    return { status: 201, data: dataValues };
  },

  findAll: async () => {
    const blogsData = await BlogPost.findAll({
      include: [{
        model: User,
        as: 'user', 
        attributes: { exclude: ['password'] },
      }, {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
    });

    return { status: 200, data: blogsData };
  },

  findByPk: async ({ id }) => {
    const postData = await BlogPost.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }, {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
    });

    if (!postData) return { status: 404, message: 'Post does not exist' };

    return { status: 200, data: postData.dataValues };
  },

  update: async ({ id, title, content }) => {
    await BlogPost.update({
      title, content }, { where: id });

    const updateData = await BlogPost.findOne({
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }, { 
        model: Category,
        as: 'categories',
        through: { attributes: [] } },
    ],
    });

    return { status: 200, data: updateData };
  },

  delete: async ({ id }) => {
    const deleteData = await BlogPost.destroy({ where: { id } });

    if (!deleteData) return { status: 504, data: 'Delete Fail' };

    return { status: 204, data: '' };
  },

  search: async ({ q }) => {
    const searchData = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}%` } },
        ],
      },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },

        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return { status: 200, data: searchData };
  },
};