import React, { useCallback, memo } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

import CustomDialog from 'components/dialog';
import CustomForm from 'components/form';
import todoService from 'services/todoService';
import { getMessage } from 'helpers/helper';
import { remindTodoOptions } from 'features/todos/config/config';
import { reminderValidationSchema } from './validation';
import styles from './styles';

import M from 'messages';

const Reminder = ({ todo, openReminder, handleCloseReminder }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: { reminderDate: '' },
    validationSchema: reminderValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        handleCloseReminder();
        resetForm();
        if (openReminder) {
          const response = await todoService.reminderTodo(todo.id, values);
          toast.success(getMessage(response?.data, 'success'));
        }
      } catch (err) {
        toast.error(getMessage(err?.response?.data, 'error'));
      }
    },
  });

  const memoHandleCloseReminder = useCallback(() => {
    handleCloseReminder();
    formik.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleCloseReminder]);

  return (
    <CustomDialog
      handleSubmit={formik.handleSubmit}
      open={openReminder}
      handleClose={memoHandleCloseReminder}
      title={M.get('todo.modal.reminder.title')}
      description={M.get('todo.modal.reminder.description')}
    >
      <Box className={classes.todoModal}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <CustomForm inputs={remindTodoOptions.inputs} formik={formik} />
          </Grid>
        </form>
      </Box>
    </CustomDialog>
  );
};

Reminder.propTypes = {
  // todo change to shape and add fields description
  todo: PropTypes.instanceOf(Object).isRequired,
  openReminder: PropTypes.bool,
  handleCloseReminder: PropTypes.func
};

export default memo(Reminder);
