import M from 'messages';
import moment from 'moment';

const getMessage = (error, variant = 'success') => {
	const message = error && error.message ?
		error.message : error && error.error ? error.error : variant === 'error' ?
			M.get('actionMsg.error.unknownError') : M.get('actionMsg.success.operationSucceeded')
	return message;
}

const deleteAllSpacesFromStr = (str) => str.replace(/\s/g, '');

const dateFormat = (date, format = "YYYY-MM-DDTHH:mm") => moment(date).format(format);

export { getMessage, deleteAllSpacesFromStr, dateFormat };