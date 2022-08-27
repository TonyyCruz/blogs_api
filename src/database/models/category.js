module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Categories', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING
  }, {
    timestamps: false
});
};