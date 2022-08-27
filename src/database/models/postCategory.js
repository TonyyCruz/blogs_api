module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('postCategory', {},
  { timestamps: false });

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'blogPosts',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    }, {
      timestamps: false
  });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postCategory;
};