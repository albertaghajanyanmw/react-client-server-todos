const crypt = require('helpers/crypt');
const { CONSTANTS } = require('../constants/Constants');
const PASSWORD_EXPIRE_DAYS = 90;

module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        nickName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'nick_name'
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'last_name'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'email'
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            field: 'password_hash'
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'last_login'
        },
        password: {
            type: DataTypes.VIRTUAL,
            validate: {
                notEmpty: true
            }
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'is_active'
        },
        activationLink: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'activation_link'
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'phone'
        },
        role: {
            // todo separate to another table
            type: DataTypes.ENUM(CONSTANTS.UsersRoles),
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
            type: DataTypes.STRING(1024),
            allowNull: true,
            field: 'image'
        },
        firebaseSubscription: {
            type: DataTypes.STRING(2048),
            allowNull: true,
            field: 'firebase_subscription'
        },
        firebaseToken: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            field: 'firebase_token'
        },
        deviceType: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'device_type'
        }
    };

    const definition = {
        tableName: 'users',
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ],
        defaultScope: {
            where: { },
            attributes: { exclude: ['password'] },
        },
        scopes: {
            email: (value) => {
                return {
                    attributes: { exclude: ['passwordHash', 'password'] },
                    where: { email: value }
                };
            },
            users: () => {
                return {
                    attributes: { exclude: ['passwordHash', 'password'] }
                };
            },
            user: (id) => {
                return {
                    attributes: { exclude: ['passwordHash', 'password'] },
                    where: {
                        id: id
                    }
                };
            }
        },
        hooks: {
            beforeUpdate: hashPasswordHook
        },
        timestamps: true
    };

    const users = sequelize.define('users', fields, definition);

    users.associate = (db) => {
        users.hasMany(db.tasks, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };
    return users;
};

const hashPasswordHook = (instance, options) => {
    if (!instance.changed('password')) {
        return;
    } else {
        return crypt.hash(instance.get('password'))
            .then((hash) => {
                // Set password expire date
                const expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + PASSWORD_EXPIRE_DAYS);
                instance.set('passwordExpireDate', expireDate);
                // Remember to set the data value, otherwise it won't be validated
                return instance.set('passwordHash', hash);
            });
    }
};