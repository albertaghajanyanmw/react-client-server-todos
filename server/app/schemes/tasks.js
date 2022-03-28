'use strict';

module.exports = {
    updateTask: {
        properties: {
            name: {type: 'string', maxLength: 255 },
            description: {type: ['string', 'null'], maxLength: 255 },
            status: {type: 'string', maxLength: 255 },
            estimatedDate: {type: ['string', 'null'], maxLength: 255 },
        },
        required: [],
        additionalProperties: false
    },
    createTask: {
        properties: {
            name: { type: 'string', maxLength: 255 },
            description: { type: 'string', maxLength: 255 },
            estimatedDate: { type: ['string', 'null'], maxLength: 255 },
            userId: { type: 'number', maxLength: 10 },
        },
        required: ['name'],
        additionalProperties: false
    },
    deleteTask: {
        properties: {
            taskId: { type: 'number', maxLength: 10 },
            // userId: { type: 'number', maxLength: 10 },
        },
        required: ['taskId'],
        additionalProperties: false
    },
};