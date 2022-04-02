require('dotenv').config();

module.exports = {
    env: process.env.NODE_ENV,
    firebase: {
        key: process.env.key,
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
    },
    dbSettings: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_DATABASE || 'database_development',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: process.env.DB_DIALECT || 'mysql',
        port: process.env.DB_PORT || 3306,
        connectionLimit: process.env.DB_CONNECTION_LIMIT || 10
    },
    loginSecretKey: process.env.LOGIN_SECRET_KEY
};
