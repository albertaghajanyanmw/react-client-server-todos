const AJV = require('ajv').default;
const ajvFormats = require('ajv-formats');
const ajvKeywords = require('ajv-keywords');

/**
 * Validator ext methods
 */
module.exports = {
    isSchemeValidSync: (scheme, data) => {
        const ajv = new AJV({coerceTypes: true, useDefaults: true});
        ajvFormats(ajv);
        ajvKeywords(ajv);
        const validate = ajv.compile(scheme);
        validate.isValid = validate(data);
        validate.data = data;
        return validate;
    }
};