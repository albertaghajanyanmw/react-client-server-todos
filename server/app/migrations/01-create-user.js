const { CONSTANTS } = require("../constants/Constants");

const PASSWORD_EXPIRE_DAYS = 90;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickName: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'nick_name'
      },
      firstName: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'first_name'
      },
      lastName: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'last_name'
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'email'
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        },
        field: 'password_hash'
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      last_login: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      archived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active'
      },
      activationLink: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'activation_link'
      },
      phone: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'phone'
      },
      role: {
        // todo separate to another table
        type: Sequelize.ENUM(CONSTANTS.UsersRoles),
        validate: {
            notEmpty: true
        }
      },
      passwordExpireDate: {
          type: 'TIMESTAMP',
          allowNull: false,
          defaultValue: new Date(Date.now() + PASSWORD_EXPIRE_DAYS * 24 * 60 * 60 * 1000),
          field: 'password_expire_date'
      },
      image: {
        type: Sequelize.STRING(1024),
        allowNull: true,
        field: 'image'
      },
      firebaseSubscription: {
        type: Sequelize.STRING(2048),
        allowNull: true,
        field: 'firebase_subscription'
      },
      firebaseToken: {
        type: Sequelize.STRING(1024),
        allowNull: true,
        field: 'firebase_token'
      },
      deviceType: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'device_type'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};