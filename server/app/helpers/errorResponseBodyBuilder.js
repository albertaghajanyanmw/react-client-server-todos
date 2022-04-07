const util = require('util');
const {CONSTANTS} = require('../constants/Constants');

module.exports.couldNotGet = (modelName, value = '') => {
    return errorBuilder(CONSTANTS.ErrorMessages.COULD_NOT_GET, modelName, value);
};

module.exports.couldNotAdd = (modelName, value = '') => {
    return errorBuilder(CONSTANTS.ErrorMessages.COULD_NOT_ADD, modelName, value);
};

module.exports.couldNotUpdate = (modelName, value = '') => {
    return errorBuilder(CONSTANTS.ErrorMessages.COULD_NOT_UPDATE, modelName, value);
};

module.exports.couldNotDelete = (modelName, value = '') => {
    return errorBuilder(CONSTANTS.ErrorMessages.COULD_NOT_DELETE, modelName, value);
};

module.exports.alreadyExists = (modelName, value = '') => {
    return errorBuilder(CONSTANTS.ErrorMessages.ALREADY_EXISTS, value, modelName);
};

module.exports.doesNotExist = (modelName, value = '') => {
    return errorBuilder(CONSTANTS.ErrorMessages.DOES_NOT_EXSTS, modelName, value);
};

module.exports.addErrorMsg = msg => {
    return errorBuilder(msg, '', '');
};

module.exports.internalServerError = (modelName, value = '') => {
    return errorBuilder('', modelName, value);
};

const errorBuilder = (errorTypeMsg, modelName, value = '') => {
    return {
        success: false,
        message: `${util.format(errorTypeMsg, modelName, value)}`
    };
};