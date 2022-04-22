'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('BlogPosts', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: {type: Sequelize.STRING, allowNull: false},
      content: { type: Sequelize.STRING, allowNull: false },
      userId: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      published: {allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
      updated: { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },

    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
