const admin = require('firebase-admin');
const { firebase: { key } } = require('../settings');
const serviceAccount = require(key);

class NotificationService {

    constructor() {
        this.adminApp = admin;
        this.adminApp.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    async sendFCMNotification(title, body, registrationTokens) {
        return new Promise(async (resolve, reject) => {
            const message = {
                notification: {
                    title: title,
                    body: body
                },
                tokens: registrationTokens,
            };
            try {
                const res = await this.adminApp.messaging().send({
                    webpush: {
                        notification: {
                            ...message.notification,
                            requireInteraction: message.requireInteraction ?? false,
                            actions: [{ title: 'Open', action: 'open' }],
                            data: { link: message.link },
                        },
                    },
                    token: registrationTokens,
                });
                resolve(res);
            } catch(err) {
                console.log("Could not sent push notification. Error\n ", err)
            }
        });
    }
}

module.exports = new NotificationService();