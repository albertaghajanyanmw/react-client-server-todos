'use strict';

const {CONSTANTS} = require('../constants/Constants');

module.exports = {
    postLogin: {
        type: 'object',
        properties: {
            email: {type: 'string', format: 'email'},
            password: {type: 'string'}
        },
        required: ['email', 'password']
    },
    postReset: {
        type: 'object',
        properties: {
            email: {type: 'string', format: 'email'}
        },
        required: ['email']
    },
    userToken: {
        type: 'object',
        properties: {
            type: {
                type: 'string',
                enum: [
                    CONSTANTS.JSON_TOKEN_TYPES.USER_AUTH,
                    CONSTANTS.JSON_TOKEN_TYPES.CONSUMER_AUTH,
                    CONSTANTS.JSON_TOKEN_TYPES.USER_SET_PASSWORD,
                    CONSTANTS.JSON_TOKEN_TYPES.USER_REGISTER
                ]
            },
            user: {
                type: 'object',
                properties: {
                    id: {type: 'integer'}
                },
                required: ['id']
            },
            iat: {type: 'integer'},
            exp: {type: 'integer'},
            iss: {type: 'string'}
        },
        required: ['type', 'user', 'iat', 'exp', 'iss']
    }
};