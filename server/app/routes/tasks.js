const tasks = require('controllers/tasks');
const {verifyLoginToken} = require('helpers/validateToken');

module.exports = (app) => {
    app.route('/tasks/all').get(verifyLoginToken, tasks.getAllTasks)
    app.route('/tasks').get(verifyLoginToken, tasks.getTasks);
    app.route('/tasks/:id').get(verifyLoginToken, tasks.getTask);
    app.route('/tasks').post(verifyLoginToken, tasks.create);
    app.route('/tasks/:id').put(verifyLoginToken, tasks.update);
    app.route('/tasks/:id').delete(verifyLoginToken, tasks.delete);
    app.route('/tasks/reminder/:id').put(verifyLoginToken, tasks.scheduleReminder);
};