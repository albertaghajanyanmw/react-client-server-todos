'use strict';

const auth = require('../controllers/auth');

module.exports = (app) => {
    app.route('/auth/login').post(auth.postLogin);
};