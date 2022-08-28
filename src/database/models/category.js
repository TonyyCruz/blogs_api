module.exports = (sequelize, DataTypes) => {
  const category =  sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING
    }, {
    timestamps: false
    });

    category.associate = (models) => {
      category.hasMany(models.PostCategory,
        {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        })
    }

  return category;
};