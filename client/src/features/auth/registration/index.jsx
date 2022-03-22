import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Box, Paper, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import M from 'messages';
import authService from 'services/authService';
import { routes } from 'configs';
import CustomForm from 'components/form';
import { formOptions } from './config/config';
import { validationSchema } from './validation';
import styles from './styles';
import toast from 'react-hot-toast';

const RegistrationPage = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await authService.register(values);
        toast.success(M.get('actionMsg.success.create'));
        history.push(routes.login.path);
      } catch (error) {
        toast.error(M.get('register.errors.common'));
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
                <Typography variant="h5"> {M.get('register.title')} </Typography>
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
              <a className={classes.link} href={routes.login.path}> {"<"} {M.get('register.backToLogin')} </a>
            </div>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegistrationPage;
