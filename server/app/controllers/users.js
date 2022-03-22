'use strict';
const { Op } = require('sequelize');
const {StatusCodes, getReasonPhrase} = require('http-status-codes');
const {
    users: Users,
    tasks: Tasks
} = require('../models');
const crypt = require('../helpers/crypt');
const { isSchemeValidSync } = require('../helpers/validate');
const { users: usersValidator } = require('../schemes');
const responseBuilder = require('../helpers/errorResponseBodyBuilder');
const {CONSTANTS} = require('../constants/Constants');

module.exports.getUsers = async (req, res) => {
    return Users.findAndCountAll({include: [{model: Tasks}]})
        .then(({ count, rows }) => {
            return res.json({ count, data: rows });
        })
        .catch((err) => {
            return response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                responseBuilder.couldNotGetCriteria(CONSTANTS.TypeNames.USERS.toLowerCase())
            );
        });
};

module.exports.getUser = async (req, res) => {
    return Users.findPk(req.params.id)
        .then((user) => {
            return res.json(user);
        })
        .catch((err) => {
            return res.status(500).json({ message: 'Error in get user' });
        });
};

module.exports.create = async (req, res) => {
    const payload = { ...req.body };
    const { isValid, data: userData } = isSchemeValidSync(usersValidator.createUser, payload);
    if (!isValid) {
        return res.status(400).json({ message: 'validation failed' });
    }
    Users.findOne({ where: { email: req.body.email } })
        .then(async exist => {
            if (exist) {
                return res.status(409).send("Email already exists");
            }
            if (payload.password) {
                userData.passwordHash = await crypt.hash(payload.password);
                delete userData.password;
            }
            Users.create(userData).then(async (createdUser) => {
                if (createdUser) {
                    return res.json({ user: createdUser, message: 'User has been created.' });
                }
            }).catch(err => {
                return res.status(500).json({ message: 'Error in create user' });
            });
        })
        .catch(err => {
            return res.status(500).json({ message: 'validation error' });
        });
};

module.exports.notificationsSubscribe = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const payload = { ...req.body };
        console.log("\n\n\n payload = ", payload)
        // const { isValid, data: userData } = isSchemeValidSync(usersValidator.subscribe, payload);
        // if (!isValid) {
        //     return res.status(400).json({ message: 'validation failed' });
        // }
        const updatedUser = await Users.update({firebaseSubscription: JSON.stringify(payload)}, { where: { id: user.id } } );
        return res.json({ user: updatedUser, message: 'User has been subscribed.' });
    } catch(err) {
        return res.status(500).json({ message: 'Error in subscribe user' });
    }
}

module.exports.updateFirebaseToken = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const payload = { ...req.body };
        console.log("\n\n\n payload = ", payload)
        const { isValid, data: userData } = isSchemeValidSync(usersValidator.updateFirebaseToken, payload);
        console.log("\n\n\n userData = ", userData)
        if (!isValid) {
            return res.status(400).json({ message: 'validation failed' });
        }
        const updatedUser = await Users.update(userData, { where: { id: user.id } } );
        return res.json({ user: updatedUser, message: 'User firebase token has been updated.' });
    } catch(err) {
        return res.status(500).json({ message: 'Error to update firebase token.' });
    }
}