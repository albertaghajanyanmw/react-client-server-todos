const { Op } = require('sequelize');
const { users: Users, tasks: Tasks } = require('../models');
const notificationService = require('../services/notificationService');

const sendFCMMessage = async (user, task) => {
    try {
        const firebaseToken = user.dataValues.firebaseToken;
        const payload = {
            title: `Expired Todo.`,
            body: `
                Hi ${user.dataValues.firstName || user.dataValues.nickName}. You have an expired todo.\n
                { ID: ${task.dataValues.id}, NAME: ${task.dataValues.name} }`,
        };
        if (firebaseToken) {
            const res = await notificationService.sendFCMNotification(payload.title, payload.body, firebaseToken, user.dataValues.id);
            return res;
        }
    } catch (error) {
        console.error('sendFCMNotification error...\n', error);
    }
}

const checkExpiredTasks = async () => {
    try {
        const condition = {
            estimatedDate: { [Op.lte]: new Date(Date.now() - (0.1 * 60 * 60 * 1000)) }
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
        console.error(err, 'worker::sendNotificationWithInterval');
    }
};

const INTERVAL = 300000;

const start = async () => {
    console.log("\n\n\n...Worker started")
    return setInterval(async () => {
        await checkExpiredTasks();
    }, INTERVAL);
};

module.exports = {
    start
};