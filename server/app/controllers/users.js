
const { users: Users, tasks: Tasks } = require('models');
const { isSchemeValidSync } = require('helpers/validate');
const { users: usersValidator } = require('schemes');
const responseBuilder = require('helpers/errorResponseBodyBuilder');
const {CONSTANTS} = require('constants/Constants');

module.exports.getUsers = async (req, res) => {
    return Users.findAndCountAll({include: [{model: Tasks}]})
        .then(({ count, rows }) => {
            return res.json({ count, data: rows });
        })
        .catch(() => {
            return response
            .status(500)
            .json(
                responseBuilder.couldNotGet(CONSTANTS.TypeNames.USERS.toLowerCase())
            );
        });
};

module.exports.getUser = async (req, res) => {
    return Users.findPk(req.params.id)
        .then((user) => {
            return res.json(user);
        })
        .catch(() => {
            return res.status(500).json({ message: 'Error in get user' });
        });
};

module.exports.updateFirebaseToken = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const payload = { ...req.body };
        const { isValid, data: userData } = isSchemeValidSync(usersValidator.updateFirebaseToken, payload);
        if (!isValid) {
            return res.status(400).json({ message: 'validation failed' });
        }
        const updatedUser = await Users.update(userData, { where: { id: user.id } } );
        return res.json({ user: updatedUser, message: 'User firebase token has been updated.' });
    } catch(err) {
        return res.status(500).json({ message: 'Error to update firebase token.' });
    }
}