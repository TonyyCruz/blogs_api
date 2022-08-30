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
    const dataValues = await BlogPost.findAll({
      include: [{
        model: User,
        as: 'user', 
        attributes: { exclude: ['password'] },
      }, {
        model: Category,
        as: 'categories',
        through: {
          attributes: [],
        },
      }],
    });

    return { status: 200, data: dataValues };
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
        through: {
          attributes: [],
        },
      }],
    });

    if (!postData) return { status: 404, message: 'Post does not exist' };

    return { status: 200, data: postData.dataValues };
  },
};