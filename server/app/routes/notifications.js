// TODO notification

const message = require('../controllers/message');

module.exports = (app) => {
    app.route('/notify').post(message.addMessage);
};