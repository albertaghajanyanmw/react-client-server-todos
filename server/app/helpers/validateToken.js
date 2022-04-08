const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const {CONSTANTS} = require('constants/Constants');
const { loginSecretKey } = require('settings');

const verifyToken = async (request, response, next, token, secret) => {
    try {
        if(!token) {
            return response.status(401).send({message: 'Unauthorized'});
        }
        const verified = await jwt.verify(token, secret);
        request.user = verified;
        const decodedToken = await jwtDecode(token, loginSecretKey);
        request.guid = decodedToken.guid;
        next();
    } catch(err) {
        response.status(401).send();
    }
};

module.exports.verifyLoginToken = async (request, response, next) => {
    try {
        const token = request.header(CONSTANTS.AUTHORIZATION).split(CONSTANTS.BEARER)[1];
        verifyToken(request, response, next, token, loginSecretKey);
    } catch(err) {
        return response.status(401).send({message: 'Unauthorized'});
    }
};