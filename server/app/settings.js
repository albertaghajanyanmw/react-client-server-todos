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
    mailSettings: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            password: process.env.MAIL_PASSWORD
        }
    },
    clientUrl: process.env.CLIENT_URL,
    apiUrl: process.env.API_URL,
    server: {
        port: 4000
    }
};
