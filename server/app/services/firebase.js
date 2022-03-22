const admin = require('firebase-admin');
const { firebase: { key } } = require('../settings');
const serviceAccount = require(key);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports.sendNotification = async (title, body, registrationTokens) => {
    return new Promise((resolve, reject) => {
        const message = {
            notification: {
                title: title,
                body: body
            },
            tokens: registrationTokens,
        };
        console.log("\n\n\n registrationTokens = ", registrationTokens)
        // admin.messaging().sendMulticast(message).then((response) => {
        admin.messaging().send(message).then((response) => {
            const failedTokens = [];
            const successTokens = [];
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    failedTokens.push(registrationTokens[idx]);
                } else {
                    successTokens.push(registrationTokens[idx]);
                }
            });
            resolve({ successCount: response.successCount, failureCount: response.failureCount, failedTokens, successTokens });
            if (response.failureCount > 0) {
                console.log(response.responses[0].error)
            }
        }).catch(err => {
            console.log("\n\n\n err = ", err)
        });
    });
}

module.exports.sendFCMNotification = async (title, body, registrationTokens) => {
    return new Promise(async (resolve, reject) => {
        const message = {
            notification: {
                title: title,
                body: body
            },
            tokens: registrationTokens,
        };
        try {
            const res = await admin.messaging().send({
                webpush: {
                    notification: {
                        ...message.notification,
                        requireInteraction: message.requireInteraction ?? false,
                        actions: [{
                            title: 'Open',
                            action: 'open',
                        }],
                        data: {
                            link: message.link,
                        },
                    },
                },
                token: registrationTokens,
            });
            resolve(res);
        } catch(err) {
            console.log("ERROR = ", err)
        }
    });
};

module.exports.sendSubscriptionNotification = (title, body, subscription, webpush) => {
    const payload = JSON.stringify({
      title,
      description: body
    })
    webpush.sendNotification(subscription, payload)
      .then(result => console.log(result))
      .catch(e => {
          console.log("\n\n\n err = ", e)
        })

    return {'success': true};
  };