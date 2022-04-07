const CONSTANTS = {
    LOGIN_TOKEN_EXPiRE_DATE: '7 d',
    PASSWORD_EXPIRE_DAYS: 90,
    JSON_TOKEN_TYPES: {
        USER_AUTH: 'auth',
        USER_REGISTER: 'register'
    },

    AUTHORIZATION: 'Authorization',
    BEARER: 'Bearer ',

    ErrorMessages: {
        COULD_NOT_GET: 'Could not get %s %s',
        COULD_NOT_ADD: 'Could not add \'%s\' %s.',
        ALREADY_EXISTS: '\'%s\' %s already exists.',
        COULD_NOT_UPDATE: 'Could not update \'%s\' %s.',
        COULD_NOT_DELETE: 'Could not delete \'%s\' %s.',
        DOES_NOT_EXSTS: '\'%s\' %s does not exists.'
    },
    TypeNames: {
        USERS: 'Users',
        USER: 'User',
        TASKS: 'Tasks',
        TASK: 'Task'
    },
    TaskStatuses:{
        list: ['inprogress', 'completed'],
        defaultValue: 'inprogress',
        expireDate: 10
    },
    UsersRoles: ['guest', 'user', 'admin']
};

module.exports = {CONSTANTS};