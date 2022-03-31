import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import M from 'messages';
import styles from './styles';

function CustomDialog({ title, description, children, open, handleClose, handleSubmit }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <>
      <div>
        <Dialog
          classes={{ paperScrollPaper: classes.modal }} open={open} onClose={handleClose}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{description}</DialogContentText>
            <div className={classes.description}>
              {children}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{M.get('actions.cancel')}</Button>
            <Button variant="contained" onClick={handleSubmit}> {M.get('actions.submit')}</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

CustomDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func
};

CustomDialog.defaultProps = {
  open: false,
  handleOpen: null,
  handleClose: null,
  handleSubmit: null
};

export default memo(CustomDialog);
