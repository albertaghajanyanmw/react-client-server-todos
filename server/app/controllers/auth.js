'use strict';
const jwt = require('jsonwebtoken');
const crypt = require('../helpers/crypt');
const models = require('../models');
const {CONSTANTS} = require('../constants/Constants');
const config = require('../config/env-settings.json');

module.exports.postLogin = async (request, response) => {
    try {
        const user = await models.users.findOne({where: { email: request.body.email }});

        if(!user) {
            return response.status(401).json({message: 'Unauthorized'});
        }
        const validPassword = await crypt.compare(request.body.password, user.passwordHash);
        if(!validPassword) {
            return response.status(401).json({message: 'Unauthorized'});
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                is_active: user.is_active,
                created_date: user.created_date
            },
            config.loginSecretKey,
            {expiresIn: CONSTANTS.LOGIN_TOKEN_EXPiRE_DATE}
        );
        return response.header(CONSTANTS.AUTHORIZATION, token).json({ success: true, token: token, ...user.dataValues });
    } catch(error) {
        return response.status(500).json({message: 'Internal server error'});
    }
};