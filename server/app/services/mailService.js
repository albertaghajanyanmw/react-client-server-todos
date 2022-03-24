const nodemailer = require('nodemailer');
const { mailSettings } = require('settings');
class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: mailSettings.host,
            port: mailSettings.port,
            secure: true,
            ignoreTLS: true,
            auth: {
                user: mailSettings.auth.user,
                pass: mailSettings.auth.password
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: mailSettings.auth.user,
            to,
            subject: 'Activate account ',
            text: '',
            html:
                `
                    <div>
                        <h1>To activate the account follow the link.</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService();