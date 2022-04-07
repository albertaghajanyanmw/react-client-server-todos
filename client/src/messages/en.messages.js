const en = {
  login: {
    title: 'Sign in',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    signIn: 'Sign in',
    signInGuest: 'Sign in as a guest',
    createAccount: 'Dont have an account yet ?',
    register: 'Register one',
    errors: {
      common: 'Invalid credentials!',
    },
    registerGuest: 'Register as a guest',
    nickName: 'Nick name',
  },
  register: {
    title: 'Registration',
    nickName: 'Nick name',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    password: 'Password',
    backToLogin: 'Back to Sign in',
    errors: {
      common: 'Could not register new user.'
    },
    submit: 'Register',
    switchGuest: 'Switch with your guest account',
    guestNickName: 'Your guest account nick name',
    guestPassword: 'Your guest account password'
  },
  navbar: {
    todo: 'Todo',
    todoList: 'Todo List',
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
      estimatedDate: 'Estimated date',
      status: 'Status',
      reminderDate: 'Reminder date',
      reminder: {
        title: 'Schedule reminder',
        description: 'Set up todo reminder date.',
        setReminder: 'Set reminder',
      }
    },
    noTodos: 'No Todos',
    sortByStatus: 'Sort by status',
    sortByEstimatedDate: 'Sort by estimated date',
    table: {
      id: 'ID',
      name: 'Name',
      estimatedDate: 'Estimated date',
      status: 'Status',
      reminderDate: 'Reminder date',
      user: 'User'
    },
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
    edit: 'Edit',
    delete: 'Delete',
    setReminder: 'Set reminder time',
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
