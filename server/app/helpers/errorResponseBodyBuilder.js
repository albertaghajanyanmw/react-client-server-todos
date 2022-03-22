const util = require('util');
const {CONSTANTS} = require('../constants/Constants');

module.exports.couldNotGetCriteria = (criteriaType, value = '') => {
    return criteria(CONSTANTS.ErrorMessages.COULD_NOT_GET, criteriaType, value);
};

module.exports.couldNotAddCriteria = (criteriaType, value = '') => {
    return criteria(CONSTANTS.ErrorMessages.COULD_NOT_ADD, criteriaType, value);
};

module.exports.couldNotUpdateCriteria = (criteriaType, value = '') => {
    return criteria(CONSTANTS.ErrorMessages.COULD_NOT_UPDATE, criteriaType, value);
};

module.exports.couldNotDeleteCriteria = (criteriaType, value = '') => {
    return criteria(CONSTANTS.ErrorMessages.COULD_NOT_DELETE, criteriaType, value);
};

module.exports.alreadyExistsCriteria = (criteriaType, value = '') => {
    return criteria(CONSTANTS.ErrorMessages.ALREADY_EXISTS, value, criteriaType);
};

module.exports.doesNotExistCriteria = (criteriaType, value = '') => {
    return criteria(CONSTANTS.ErrorMessages.DOES_NOT_EXSTS, criteriaType, value);
};

module.exports.addErrorMsg = msg => {
    return criteria(msg, '', '');
};

module.exports.internalServerError = (criteriaType, value = '') => {
    return criteria('', criteriaType, value);
};

const criteria = (errorTypeMsg, criteriaType, value = '') => {
    return {
        success: false,
        message: `${util.format(errorTypeMsg, criteriaType, value)}`
    };
};