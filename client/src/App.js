import React, { Suspense, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import classNames from 'classnames';
// private route
import PrivateRoute from 'routes/PrivateRoute';

import LoginPage from 'features/auth/login';
import RegistrationPage from 'features/auth/registration';
import UsersPage from 'features/users';
import TodoList from 'features/todos';
import { setupInterceptors } from 'services/client/axiosHelper';

import { routes } from 'configs/index';

import './App.css';
import { Toaster } from 'react-hot-toast';
import CircularLoading from 'components/loading/Loading';
import { askForPermissionToReceiveNotifications } from 'firebase/pushNotification';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
  }
}));

function App() {
  const classes = useStyles();
  const history = useHistory();

  setupInterceptors(history);

  return (
    <div className={classNames(classes.root, 'App')}>
      <Suspense fallback={<CircularLoading />}>
        <BrowserRouter>
          <Switch>
              <Route path={routes.login.path} exact component={LoginPage} />
              <Route path={routes.loginGuest.path} exact component={LoginPage} />
              <Route path={routes.registration.path} exact component={RegistrationPage} />
              <Route path={routes.registrationGuest.path} exact component={RegistrationPage} />
              <PrivateRoute exact path={routes.home.path} component={UsersPage} />
              <PrivateRoute exact path={routes.users.path} component={UsersPage} />
              <PrivateRoute exact path={routes.todo.path} component={TodoList} />
              {/* TODO create not found page*/}
              <PrivateRoute path="**" component={() => (<>Not found</>)}/>
          </Switch>
          <div className="alert-container">
            <Toaster
              position="bottom-right"
              toastOptions={{ style: { fontSize: '16px', padding: '10px 30px' } }}
            />
          </div>

        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;