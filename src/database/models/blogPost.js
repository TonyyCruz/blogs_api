module.exports = (sequelize, DataTypes) => {
  const blogPost =  sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    }
  }, {
    timestamps: false
});

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
  };

  return blogPost;
};