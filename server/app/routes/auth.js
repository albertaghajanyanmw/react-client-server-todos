const auth = require('../controllers/auth');

module.exports = (app) => {
    app.route('/auth/login').post(auth.postLogin);
    app.route('/auth/register').post(auth.register);
    app.route('/auth/activate/:link').get(auth.activate);
};