const {
    users: Users,
    tasks: Tasks
} = require('../models');

const { Op } = require('sequelize');
const webpush = require('web-push')

const { firebase: { webPushContact, privateVapidKey, publicVapidKeyOrg } } = require('../../app/settings');
const { sendNotification, sendFCMNotification, sendSubscriptionNotification } = require('./firebase');

webpush.setVapidDetails(webPushContact, publicVapidKeyOrg, privateVapidKey);

const sendFCMMessage = async (user, task) => {
    try {
        const firebaseToken = user.dataValues.firebaseToken;
        const payload = {
            title: `Hi ${user.dataValues.firstName}`,
            body: `You have an expired todo. (ID: ${task.dataValues.id}, NAME: ${task.dataValues.name})`,
        };
        const res = await sendFCMNotification(payload.title, payload.body, firebaseToken);
        return res;
    } catch (e) {
        console.error('sendFCMMessage error', e);
    }
}

const sendSubscriptionMessage = async (user, task) => {
    try {
        const firebaseToken = JSON.parse(user.dataValues.firebaseSubscription);
        const payload = {
            title: `Hi ${user.dataValues.firstName}`,
            body: `You have an expired todo. (ID: ${task.dataValues.id}, NAME: ${task.dataValues.name})`,
        };
        console.log("\n\n\n firebaseToken = ", firebaseToken)
        const res = await sendSubscriptionNotification(payload.title, payload.body, firebaseToken, webpush);
        return res;
    } catch (e) {
        console.error('sendFCMMessage error', e);
    }
}

const sendNotificationMessage = async (user, task) => {
    try {
        const firebaseToken = user.dataValues.firebaseToken;
        const payload = {
          title: `Hi ${user.dataValues.firstName}`,
          body: 'You have an expired todo.',
        }
        try {
            await sendNotification(payload.title, payload.body, firebaseToken);
        } catch(err) {
            console.log("\n\n\n Err to sendNotification: ", err)
        }
        return {'success': true};
    } catch(err) {
        console.log("\n\n\n Global error: ", err)
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
        console.log("\n\n\n tasks.length = ", tasks.length)
        for(let i = 0; i < tasks.length; ++i) {
            const task = tasks[i];
            await sendFCMMessage(task.dataValues.user, task);
            // await sendSubscriptionMessage(task.dataValues.user, task);
            // await sendNotificationMessage(task.dataValues.user, task);
        }
        // return res.json({ count: count, data: rows });
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