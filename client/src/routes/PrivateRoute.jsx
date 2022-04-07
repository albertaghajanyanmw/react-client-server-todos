import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies';

import { Route, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import { isLoggedIn } from 'services/authService';
import { routes } from 'configs/index';
import styles from './styles';
import { Grid } from '@mui/material';
import CustomAppBar from 'components/navbar';
import { askForPermissionToReceiveNotifications } from 'firebase/pushNotification';
import CircularLoading from 'components/loading/Loading';

const useStyles = makeStyles(styles);

function PrivateRoute({ component: Component, ...rest }) {
  const classes = useStyles();
  const currentUser = isLoggedIn();

  const history = useHistory();
  const [loading, setLoading] = useState(true);

  // save firebase token in the server
  useEffect(() => {
    let timer;
    if (currentUser) {
      timer = setTimeout(() => askForPermissionToReceiveNotifications(), 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [currentUser]);

  useEffect(() => {
    const navigateToLogin = () => {
      history.push({ pathname: '/login' });
    };

    if (!currentUser) {
      setLoading(false);
      const token = cookie.load('auth_token');
      if (!token) {
        navigateToLogin();
      }
    } else {
      setLoading(false);
    }
  }, [currentUser, history]);

  if (loading) return <div className={classes.loadingRoot}><CircularLoading /></div>;

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <div className={classes.layout}>
              <Grid item sm={12} xs={12} md={12}>
                <CustomAppBar {...rest} />
              </Grid>
              <div className={classes.main}>
                <Component {...props} {...rest} />
              </div>
          </div>
        ) : (
          <Redirect
            to={{
              pathname: routes.login.path,
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default PrivateRoute;
