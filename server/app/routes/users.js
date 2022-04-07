const users = require('controllers/users');
const {verifyLoginToken} = require('helpers/validateToken');

module.exports = (app) => {
    app.route('/users').get(verifyLoginToken, users.getUsers);
    app.route('/users/:id').get(verifyLoginToken, users.getUser);
    app.route('/users/:id/firebase/token').put(users.updateFirebaseToken);
};