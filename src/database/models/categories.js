module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Categories', {
    name: DataTypes.STRING
  });
};