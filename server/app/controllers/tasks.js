'use strict';
const { Op } = require('sequelize');
const {StatusCodes: {INTERNAL_SERVER_ERROR}} = require('http-status-codes');
const { users: Users, tasks: Tasks } = require('../models');
const responseBuilder = require('../helpers/errorResponseBodyBuilder');
const { isSchemeValidSync } = require('../helpers/validate');
const {CONSTANTS} = require('../constants/Constants');
const { tasks: tasksValidator } = require('../schemes');
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
    try {
        const payload = { ...req.body, userId: req.user.id };
        const { isValid, errors, data: taskData } = isSchemeValidSync(tasksValidator.createTask, payload);
        if (!isValid) {
            return res.status(400).json({ message: 'Validation failed.', errors });
        }
        const createdTask = await Tasks.create(taskData);
        return res.json({ task: createdTask, message: 'Task has been created.' });
    } catch(err) {
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