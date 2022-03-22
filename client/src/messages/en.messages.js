const en = {
  login: {
    title: 'Sign in',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    signIn: 'Sign in',
    createAccount: 'Dont have an account yet ?',
    register: 'Register one',
    errors: {
      common: 'Invalid credentials!',
    },
  },
  register: {
    title: 'Registration',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    password: 'Password',
    backToLogin: 'Back to Sign in',
    errors: {
      common: 'Could not register new user.'
    }
  },
  navbar: {
    todo: 'Todo',
    todoList: 'Todo List',
    users: 'Users',
    logout: 'Log Out'
  },
  todo: {
    title: 'TODO LIST',
    addTodo: 'Add Todo',
    statuses: {
      all: 'All',
      inprogress: 'Inprogress',
      completed: 'Completed'
    },
    modal: {
      title: 'Add TODO',
      description: 'Fill the todo details.',
      id: 'ID',
      name: 'Name',
      expireDate: 'Expire date',
      status: 'Status'
    },
    noTodos: 'No Todos',
    sortByStatus: 'Sort by status',
    sortByExpireDate: 'Sort by expire date'
  },
  table: {
    noResult: 'No result'
  },
  actions: {
    login: 'Login',
    signIn: 'Sign In',
    cancel: 'Cancel',
    submit: 'Submit',
    search: 'Search',
    changeStatus: 'Click to the row to change status'
  },
  actionMsg: {
    success: {
      create: 'Successfully created.',
      update: 'Successfully updated.',
      delete: 'Successfully deleted.',
      move: 'Successfully Moved.',
      operationSucceeded: 'Operation succeeded.',
    },
    error: {
      get: 'Could not get data',
      create: 'Could not create item.',
      update: 'Could not update item.',
      delete: 'Could not delete item.',
      unknownError: 'Unknown error.',
    }
  },
};

export { en };
