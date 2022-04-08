const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const crypt = require('helpers/crypt');
const mailService = require('services/mailService');
const { loginSecretKey, apiUrl, clientUrl } = require('settings');
const { users: Users, sequelize } = require('models');
const { users: usersValidator } = require('schemes');
const { isSchemeValidSync } = require('helpers/validate');
const {CONSTANTS} = require('constants/Constants');

const login = async (request, user) => {
    try {
        if(!user) {
            return {success: false, status: 401, message: 'Unauthorized'};
        }
        if(!user.isActive) {
            return {success: false, status: 403, message: 'Forbidden. Your account is not activated'};
        }
        const validPassword = await crypt.compare(request.body.password, user.passwordHash);
        if(!validPassword) {
            return {success: false, status: 401, message: 'Unauthorized'};
        }
        const token = jwt.sign(
            {
                id: user.id,
                nickName: user.nickName,
                email: user.email,
                isActive: user.is_active,
                createdDate: user.created_date,
                firebaseToken: user.firebaseToken,
                firstName: user.firstName,
                lastName: user.lastName
            },
            loginSecretKey,
            {expiresIn: CONSTANTS.LOGIN_TOKEN_EXPiRE_DATE}
        );
        return {success: true, token};

    } catch(error) {
        return {success: false, status: 500, message: 'Internal server error', error};
    }
};

module.exports.postLogin = async (request, response) => {
    try {
        const user = await Users.findOne({where: { email: request.body.email }});
        const result = await login(request, user);
        if(!result.success) {
            return response.status(result.status).json({message: result.message});
        }
        return response.header(CONSTANTS.AUTHORIZATION, result.token).json({ success: true, token: result.token, ...user.dataValues });
    } catch(error) {
        return response.status(500).json({message: 'Internal server error'});
    }
};

module.exports.postLoginGuest = async (request, response) => {
    try {
        const user = await Users.findOne({where: { nickName: request.body.nickName }});
        const result = await login(request, user);
        if(!result.success) {
            console.log("\n\n result", result);

            return response.status(result.status).json({message: result.message});
        }
        return response.header(CONSTANTS.AUTHORIZATION, result.token).json({ success: true, token: result.token, ...user.dataValues });
    } catch(error) {
        console.log("\n\n error", error);
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
        let existGuest;
        if (req.body.switchGuestAccount) {
            existGuest = await Users.findOne({ where: { nickName: req.body.nickName } });
            if(!existGuest) {
                return res.status(401).send({message: 'Not found guest user.'});
            }
            const validPassword = await crypt.compare(req.body.password, existGuest.passwordHash);
            if(!validPassword) {
                return res.status(401).send({message: 'Invalid credentials'});
            }
        } else {
            const existUser = await Users.findOne({ where: { email: req.body.email } });
            if (existUser) {
                return res.status(409).send({message: "Email already exists"});
            }
            if (payload.password) {
                userData.passwordHash = await crypt.hash(payload.password);
                delete userData.password;
            }
        }

        const activationLink = uuid.v4();
        transaction = await sequelize.transaction();
        let newUser;
        if (req.body.switchGuestAccount) {
            newUser = await Users.update({...userData, isActive: false, activationLink, role: 'user'}, { where: {id: existGuest.id}, transaction });
        } else {
            newUser = await Users.create({...userData, isActive: false, activationLink, role: 'user'}, { transaction });
        }
        if (newUser) {
            mailService.sendActivationMail(req.body.email, `${apiUrl}/api/auth/activate/${activationLink}`);
            await transaction.commit();
            return res.json({ user: newUser, message: 'User has been created.' });
        }
    } catch(err) {
        if (transaction) {
            await transaction.rollback();
        }
        return res.status(500).json({ message: 'Error in create user' });
    }
};

module.exports.registerGuest = async (req, res) => {
    let transaction;
    try {
        const payload = { ...req.body };
        const { isValid, data: userData } = isSchemeValidSync(usersValidator.createGuest, payload);
        if (!isValid) {
            return res.status(400).json({ message: 'validation failed' });
        }
        const exist = await Users.findOne({ where: { nickName: req.body.nickName } });
        if (exist) {
            return res.status(409).send({message: "Nickname already exists"});
        }
        if (payload.password) {
            userData.passwordHash = await crypt.hash(payload.password);
            delete userData.password;
        }
        const createdUser = await Users.create({...userData, isActive: true, role: 'guest'} );
        return res.json({ user: createdUser, message: 'User has been created.' });
    } catch(err) {
        if (transaction) {
            await transaction.rollback();
        }
        return res.status(500).json({ message: 'Error in create user' });
    }
};

module.exports.activate = async (req, res) => {
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