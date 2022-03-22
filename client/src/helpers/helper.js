import M from 'messages';
import moment from 'moment';

const cleanObject = (object) => {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === 'object') {
      cleanObject(v);
    }
    if (
      (v && typeof v === 'object' && !Object.keys(v).length) ||
      v === null ||
      v === undefined ||
      v === ''
    ) {
      if (Array.isArray(object)) {
        object.splice(k, 1);
      } else {
        // eslint-disable-next-line no-param-reassign
        delete object[k];
      }
    }
  });
  return object;
};

const makeEmptiesToNull = (object) => {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === 'object') {
      makeEmptiesToNull(v);
    }
    if (
      (v && typeof v === 'object' && !Object.keys(v).length) ||
      v === null ||
      v === undefined ||
      v === ''
    ) {
      if (Array.isArray(object)) {
        // eslint-disable-next-line no-param-reassign
        object[k] = [];
      } else {
        // eslint-disable-next-line no-param-reassign
        object[k] = null;
      }
    }
  });
  return object;
};

const pad = (num, size)  => {
    let numString = num.toString();
    while (numString.length < size) numString = `0${numString}`;
    return numString;
}

const getMessage = (error, variant = 'success')  => {
  // eslint-disable-next-line no-nested-ternary
  const message = error && error.message ? error.message : error && error.error ? error.error : variant === 'error' ? M.get('actionMsg.error.unknownError') : M.get('actionMsg.success.operationSucceeded')
  return message;
}

const deleteAllSpacesFromStr = (str) => str.replace(/\s/g, '');

const uniqueResultFromTwoArrays = (result1, result2, key) => result1.filter((obj) => !result2.some((obj2) => obj.id === obj2.id && obj[key] === obj2[key]));

const stringTrimValidation = (value) => value.trim().replace(/\s\s+/g, ' ') === value;

const dateFormat = (date, format = "YYYY-MM-DDTHH:mm") => moment(date).format(format);

export { cleanObject, pad, getMessage, makeEmptiesToNull, deleteAllSpacesFromStr, uniqueResultFromTwoArrays, stringTrimValidation, dateFormat };
