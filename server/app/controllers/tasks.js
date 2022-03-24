const {StatusCodes: {INTERNAL_SERVER_ERROR}} = require('http-status-codes');
const responseBuilder = require('helpers/errorResponseBodyBuilder');
const { users: Users, tasks: Tasks, sequelize } = require('models');
const { isSchemeValidSync } = require('helpers/validate');
const { tasks: tasksValidator } = require('schemes');
const {CONSTANTS} = require('constants/Constants');
const notificationService = require('services/notificationService');
const { getListPayload } = require('./common');

module.exports.getTasks = async (req, res) => {
    try {
        let payload = getListPayload(req);
        payload.include = [{ model: Users, where: { id: req.user.id } }];
        const { count, rows } = await Tasks.findAndCountAll(payload);
        return res.json({ count: count, data: rows });
    } catch(err) {
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(responseBuilder.couldNotGetCriteria(CONSTANTS.TypeNames.TASKS.toLowerCase()));
    }
};

module.exports.getTask = async (req, res) => {
    try {
        const task = await Tasks.findPk(req.params.id);
        return res.json(task);
    } catch {
        return res
        .status(INTERNAL_SERVER_ERROR)
        .json(responseBuilder.couldNotGetCriteria(CONSTANTS.TypeNames.TASK.toLowerCase()));
    }
};

module.exports.create = async (req, res) => {
    let transaction;
    try {
        const payload = { ...req.body, userId: req.user.id };
        const { isValid, errors, data: taskData } = isSchemeValidSync(tasksValidator.createTask, payload);
        if (!isValid) {
            return res.status(400).json({ message: 'Validation failed.', errors });
        }
        transaction = await sequelize.transaction();
        const createdTask = await Tasks.create(taskData, { transaction });
        // send push notification (todo: separate to generic service)
        const user = await Users.findByPk(req.user.id);
        const firebaseToken = user.firebaseToken;
        const messagePayload = {
            title: `Created Todo.`,
            body: ` Hi ${user.firstName}. New todo.\n { ID: ${createdTask.id}, NAME: ${createdTask.name} }`
        };
        await transaction.commit();
        notificationService.sendFCMNotification(messagePayload.title, messagePayload.body, firebaseToken);
        return res.json({ task: createdTask, message: 'Task has been created.' });
    } catch(err) {
        if (transaction) {
            transaction.rollback();
        }
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(responseBuilder.couldNotAddCriteria(CONSTANTS.TypeNames.TASK.toLowerCase()));
    }
};

module.exports.update = async (req, res) => {
    try {
        const payload = { ...req.body };
        const { isValid, errors, data: taskData } = isSchemeValidSync(tasksValidator.updateTask, payload);
        if (!isValid) {
            return res.status(400).json({ message: 'Validation failed.', errors });
        }
        const apiPayload = { where: { id: req.params.id, userId: req.user.id } };
        await Tasks.update(taskData, apiPayload);
        const updatedTask = await Tasks.findByPk(req.params.id);
        return res.json({ task: updatedTask, message: 'Task has been updated.' });
    } catch(err) {
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(responseBuilder.couldNotUpdateCriteria(CONSTANTS.TypeNames.TASK.toLowerCase()));
    }
};

module.exports.delete = async (req, res) => {
    try {
        const payload = { taskId: req.params.id, userId: req.user.id };
        const { isValid, errors } = isSchemeValidSync(tasksValidator.deleteTask, payload);
        if (!isValid) {
            return res.status(400).json({ message: 'Validation failed.', errors });
        }
        await Tasks.destroy({ where: { id: req.params.id, userId: req.user.id }});
        return res.json({ message: 'Task has been deleted.' });
    } catch(err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error to delete new task.' });
    }
};