const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const crypt = require('helpers/crypt');
const mailService = require('services/mailService');
const { loginSecretKey, apiUrl, clientUrl } = require('settings');
const { users: Users, sequelize } = require('models');
const { users: usersValidator } = require('schemes');
const { isSchemeValidSync } = require('helpers/validate');
const {CONSTANTS} = require('constants/Constants');

module.exports.postLogin = async (request, response) => {
    try {
        const user = await Users.findOne({where: { email: request.body.email }});

        if(!user) {
            return response.status(401).json({message: 'Unauthorized'});
        }
        const validPassword = await crypt.compare(request.body.password, user.passwordHash);
        if(!validPassword) {
            return response.status(401).json({message: 'Unauthorized'});
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                is_active: user.is_active,
                created_date: user.created_date,
                firebaseToken: user.firebaseToken,
                firstName: user.firstName,
                lastName: user.lastName
            },
            loginSecretKey,
            {expiresIn: CONSTANTS.LOGIN_TOKEN_EXPiRE_DATE}
        );
        return response.header(CONSTANTS.AUTHORIZATION, token).json({ success: true, token: token, ...user.dataValues });
    } catch(error) {
        return response.status(500).json({message: 'Internal server error'});
    }
};

module.exports.register = async (req, res) => {
    let transaction;
    try {
        const payload = { ...req.body };
        const { isValid, data: userData } = isSchemeValidSync(usersValidator.createUser, payload);
        if (!isValid) {
            return res.status(400).json({ message: 'validation failed' });
        }
        const exist = await Users.findOne({ where: { email: req.body.email } });
        if (exist) {
            return res.status(409).send("Email already exists");
        }
        if (payload.password) {
            userData.passwordHash = await crypt.hash(payload.password);
            delete userData.password;
        }
        const activationLink = uuid.v4();
        transaction = await sequelize.transaction();
        const createdUser = await Users.create({...userData, isActive: false, activationLink}, { transaction });
        if (createdUser) {
            await mailService.sendActivationMail(req.body.email, `${apiUrl}/api/auth/activate/${activationLink}`);
            await transaction.commit();
            return res.json({ user: createdUser, message: 'User has been created.' });
        }
    } catch(err) {
        if (transaction) {
            await transaction.rollback();
        }
        return res.status(500).json({ message: 'Error in create user' });
    }
};

module.exports.activate = async (req, res, next) => {
    try {
        const activationLink = req.params.link;
        const user = await Users.findOne({activationLink});
        if (!user) {
            return response.status(400).json({message: 'Invalid activation link'});
        }
        await Users.update({ isActive: true }, {where: { activationLink }});
        return res.redirect(clientUrl);
    } catch (e) {
        return res.status(500).json({ message: 'Could not activate account.' });
    }
}