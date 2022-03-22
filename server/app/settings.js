require('dotenv').config();

module.exports = {
    env: process.env.NODE_ENV,
    firebase: {
        key: process.env.key,
        webPushContact: process.env.WEB_PUSH_CONTACT,
        publicVapidKey: process.env.PUBLIC_VAPID_KEY,
        privateVapidKey: process.env.PRIVATE_VAPID_KEY,
        publicVapidKeyOrg: process.env.PUBLIC_VAPID_KEY_ORG,
    },

    server: {
        port: 4000
    }
};
