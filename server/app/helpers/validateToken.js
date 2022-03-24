const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const {StatusCodes, getReasonPhrase} = require('http-status-codes');
const {CONSTANTS} = require('constants/Constants');
const { loginSecretKey } = require('settings');

const verifyToken = async (request, response, next, token, secret) => {
    try {
        if(!token) {
            return response.status(StatusCodes.UNAUTHORIZED).send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
        }
        const verified = await jwt.verify(token, secret);
        request.user = verified;
        const decodedToken = await jwtDecode(token, loginSecretKey);
        request.guid = decodedToken.guid;
        next();
    } catch(err) {
        response.status(StatusCodes.UNAUTHORIZED).send();
    }
};

module.exports.verifyLoginToken = async (request, response, next) => {
    try {
        const token = request.header(CONSTANTS.AUTHORIZATION).split(CONSTANTS.BEARER)[1];
        verifyToken(request, response, next, token, loginSecretKey);
    } catch(err) {
        response.status(StatusCodes.UNAUTHORIZED).send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    }
};

module.exports.verifyRegisterToken = async (request, response, next) => {
    try {
        const token = request.params.token;
        verifyToken(request, response, next, token, invitationSecretToken);
    } catch(err) {
        response.status(StatusCodes.UNAUTHORIZED).send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    }
};