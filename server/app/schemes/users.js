'use strict';

module.exports = {
    getUser: {
        user: {
            type: 'object',
            properties: {
                guid: {type: 'string', format: 'uuid'}
            },
            required: ['guid']
        },
        required: ['user']
    },
    deleteUser: {
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    },
    deleteMany: {
        properties: {
            ids: {
                type: 'array',
                items: [{type: 'number'}]
            }
        },
        required: ['id']
    },
    putUser: {
        properties: {
            firstName: {type: 'string'},
            lastName: {type: 'string'},
            email: {type: 'string', format: 'email'},
            phone: { type: 'string' },
            password: {type: 'string'},
        },
        required: [ 'firstName', 'lastName', 'email']
    },
    createUser: {
        properties: {
            firstName: {
                type: 'string',
                maxLength: 255
            },
            lastName: {
                type: 'string',
                maxLength: 255
            },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            archived: { type: 'boolean' },
            isActive: {
                type: 'boolean'
            },
            // Validators maxLength, minLength or regexp ?
            password:{
                type: 'string',
            }
        },
        required: ['firstName', 'lastName', 'email', 'password']
    },
    subscribe: {
        properties: {
            firebaseSubscribe: {
                type: 'string',
                maxLength: 2048
            },
        },
        required: ['firebaseSubscribe'],
        additionalProperties: false
    },
    updateFirebaseToken: {
        properties: {
            firebaseToken: {
                type: 'string',
                maxLength: 1024
            },
            deviceType: {
                type: 'string',
                maxLength: 255
            },
        },
        required: ['firebaseToken', 'deviceType'],
        additionalProperties: false
    },
};