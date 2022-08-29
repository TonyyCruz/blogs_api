const { BlogPost, PostCategory } = require('../database/models');

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
};