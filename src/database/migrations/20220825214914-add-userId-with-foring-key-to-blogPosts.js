'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('BlogPosts', 'userId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('BlogPosts', 'userId');
  }
};
