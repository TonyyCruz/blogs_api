module.exports = (sequelize, DataTypes) => {
  const blogPosts =  sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  });

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User, { foreignKey: 'userId', as: 'users' })
  };

  return blogPosts;
};