import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cookie from 'react-cookies';

import { Route, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import { isLoggedIn } from 'services/authService';
import { routes } from 'configs/index';
import styles from './styles';
import { Grid } from '@mui/material';
import CustomAppBar from 'components/navbar';

const useStyles = makeStyles(styles);

function PrivateRoute({ component: Component, ...rest }) {
  const classes = useStyles();
  const currentUser = isLoggedIn();
  const dispatch = useDispatch();

  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const navigateToLogin = () => {
      history.push({
        pathname: '/login',
      });
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
  }, [currentUser, dispatch, history]);

  if (loading) return <div className={classes.loadingRoot}>... Loading</div>;

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
  status: PropTypes.string,
};

PrivateRoute.defaultProps = {
  status: '',
};

export default PrivateRoute;
