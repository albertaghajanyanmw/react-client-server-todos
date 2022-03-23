const { Op } = require('sequelize');
const { users: Users, tasks: Tasks } = require('../models');
const notificationService = require('../services/notificationService');

const sendFCMMessage = async (user, task) => {
    try {
        const firebaseToken = user.dataValues.firebaseToken;
        const payload = {
            title: `Expired Todo.`,
            body: `
                Hi ${user.dataValues.firstName}. You have an expired todo.\n
                { ID: ${task.dataValues.id}, NAME: ${task.dataValues.name} }`,
        };
        const res = notificationService.sendFCMNotification(payload.title, payload.body, firebaseToken);
        return res;
    } catch (error) {
        console.error('sendFCMNotification error...\n', error);
    }
}

const checkExpiredTasks = async () => {
    try {
        const condition = {
            expireDate: { [Op.lte]: new Date(Date.now() - (0.1 * 60 * 60 * 1000)) }
        };
        const tasks = await Tasks.findAll(
            {
                where: condition,
                include: [ { model: Users, required: true } ],
            }
        );
        if (!tasks.length) {
            return;
        }
        for(let i = 0; i < tasks.length; ++i) {
            const task = tasks[i];
            await sendFCMMessage(task.dataValues.user, task);
        }
    } catch (err) {
        console.log(err, 'worker::sendNotificationWithInterval');
    }
};

const start = async () => {
    return setInterval(async () => {
        await checkExpiredTasks();
    }, 6000000);
};

module.exports = {
    start
};