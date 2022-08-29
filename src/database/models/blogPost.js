module.exports = (sequelize, DataTypes) => {
  const blogPost =  sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    }
  }, {
    timestamps: false
});

  blogPost.associate = (models) => {

    blogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });

    blogPost.hasOne(models.PostCategory,{ as: 'postCategory' } );
  };

  return blogPost;
};