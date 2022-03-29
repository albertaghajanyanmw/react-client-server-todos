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
        console.log(err, 'worker::sendNotificationWithInterval');
    }
};

const start = async () => {
    return setInterval(async () => {
        await checkExpiredTasks();
    }, 600000000);
};

module.exports = {
    start
};





// todo for all users
// const { Op } = require('sequelize');
// const { users: Users, tasks: Tasks } = require('../models');
// const notificationService = require('../services/notificationService');

// const sendFCMMessage = async (user, task) => {
//     try {
//         const usersList = await Users.findAll();
//         const firebaseTokens = (usersList.filter(i => i.firebaseToken).map(i => i.firebaseToken));
//         console.log("\n\n firebaseTokens = ", firebaseTokens)
//         for(let i = 0; i < firebaseTokens.length; i+=1) {
//             const firebaseToken = firebaseTokens[i];
//             const payload = {
//                 title: `Expired Todo.`,
//                 body: `
//                     Hi ${usersList[i].firstName}. You have an expired todo.\n
//                     { ID: ${task.dataValues.id}, NAME: ${task.dataValues.name} }`,
//             };
//             await notificationService.sendFCMNotification(payload.title, payload.body, firebaseToken);
//         }
//         return true;
//     } catch (error) {
//         console.error('sendFCMNotification error...\n', error);
//     }
// }

// const checkExpiredTasks = async () => {
//     try {
//         const condition = {
//             expirestimatedDateeDate: { [Op.lte]: new Date(Date.now() - (0.1 * 60 * 60 * 1000)) }
//         };
//         const tasks = await Tasks.findAll(
//             {
//                 where: condition,
//                 include: [ { model: Users, required: true } ],
//             }
//         );
//         if (!tasks.length) {
//             return;
//         }
//         for(let i = 0; i < tasks.length; ++i) {
//             const task = tasks[i];
//             await sendFCMMessage([task.dataValues.user.dataValues], task);
//         }
//     } catch (err) {
//         console.log(err, 'worker::sendNotificationWithInterval');
//     }
// };

// const start = async () => {
//     return setInterval(async () => {
//         await checkExpiredTasks();
//     }, 100000);
// };

// module.exports = {
//     start
// };