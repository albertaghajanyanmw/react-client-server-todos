'use strict';
const { CONSTANTS } = require('../constants/Constants');
const crypt = require('../helpers/crypt');
const PASSWORD_EXPIRE_DAYS = 90;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'name'
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'description'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      expireDate: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'expire_date'
      },
      archived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: Sequelize.ENUM(CONSTANTS.TaskStatuses.list),
        defaultValue: CONSTANTS.TaskStatuses.defaultValue
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tasks');
  }
};