module.exports = (sequelize, DataTypes) => {
  const blogPost =  sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    timestamps: false
});

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'users' })
  };

  return blogPost;
};