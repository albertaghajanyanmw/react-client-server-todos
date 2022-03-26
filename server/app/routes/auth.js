const auth = require('controllers/auth');

module.exports = (app) => {
    app.route('/auth/login').post(auth.postLogin);
    app.route('/auth/login/guest').post(auth.postLoginGuest);
    app.route('/auth/register').post(auth.register);
    app.route('/auth/register/guest').post(auth.registerGuest);
    app.route('/auth/activate/:link').get(auth.activate);
};