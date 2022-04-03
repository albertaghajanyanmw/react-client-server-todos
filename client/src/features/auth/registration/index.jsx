import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Box, Grid, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { makeStyles } from '@mui/styles';

import M from 'messages';
import authService from 'services/authService';
import { routes } from 'configs';
import CustomForm from 'components/form';
import { formOptions } from './config/config';
import { userValidationSchema, guestValidationSchema, switchGuestValidationSchema } from './validation';
import styles from './styles';
import toast from 'react-hot-toast';

const RegistrationPage = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const history = useHistory();

  const [switchGuest, setSwitchGuest] = useState(false);

  const asGuest = history?.location?.pathname?.includes('/guest');
  const initialValues = asGuest ? {nickName: '', password: ''} : switchGuest ? { firstName: '', lastName: '', nickName: '', password: '' } : { firstName: '', lastName: '', email: '', password: '' };
  const validationSchema = asGuest ? guestValidationSchema : switchGuest ? switchGuestValidationSchema : userValidationSchema;
  const registerCallback = asGuest ? authService.registerGuest : authService.register;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await registerCallback({...values, switchGuestAccount: switchGuest});
        toast.success(M.get('actionMsg.success.create'));
        history.push(routes.login.path);
      } catch (error) {
        toast.error(M.get('register.errors.common'));
      }
    },
  });

  const formInputs = asGuest ? formOptions.guestInputs : switchGuest ? formOptions.switchGuestInputs : formOptions.inputs;

  const handleSwitchGuest = () => {
    setSwitchGuest((prev) => !prev);
  }

  return (
    <Box className={classes.container} p={4} elevation={3}>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="primary" variant="h5"> {M.get('register.title')} </Typography>
              </Grid>
              {!asGuest && <Grid item xs={12}>
                <FormControlLabel name="switchGuestAccount" checked={switchGuest} onClick={handleSwitchGuest} control={<Switch />} label={M.get('register.switchGuest')} />
              </Grid>}
              <CustomForm inputs={formInputs} formik={formik} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit" className={classes.submit}>
              {M.get('register.submit')}
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
