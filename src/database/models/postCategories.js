module.exports = (sequelize, DataTypes) => {
  const postCategories = sequelize.define('postCategories', {},
  { timestamps: false });

  postCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'blogPosts',
      through: postCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    }, {
      timestamps: false
  });

    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'categories',
      through: postCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postCategories;
};