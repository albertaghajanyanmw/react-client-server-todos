import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { Button, Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import toast from 'react-hot-toast';

import M from 'messages';
import AuthService from 'services/authService';
import lsConstants from 'constants/local-storage';
import CustomForm from 'components/form';
import { routes } from 'configs';
import { validationSchema } from './validation';
import { formOptions } from './config/config';
import styles from './styles';

const LoginPage = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const history = useHistory();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await AuthService.login(values.email, values.password);
        localStorage.setItem(lsConstants.CURRENT_USER, JSON.stringify(result.data));
        history.push(routes.users.path);
      } catch (err) {
        toast.error(M.get('login.errors.common'));
      }
    },
  });

  return (
    <Box className={classes.container} p={4} elevation={3}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">{M.get('login.title')}</Typography>
              </Grid>
              <CustomForm inputs={formOptions.inputs} formik={formik} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit" className={classes.submit}>
              {M.get('login.signIn')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.description}>
              {M.get('login.createAccount')}
              <a className={classes.link} href={routes.registration.path}> {M.get('login.register')}</a>
            </div>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default LoginPage;