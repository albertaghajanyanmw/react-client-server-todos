import React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import styles from './styles';
import { Button } from '@mui/material';

const NotificationButton = ({handleClick, text}) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();


  return (
    <div className={classes.btnContainer}>
      <Button variant="contained" onClick={handleClick}>{text}</Button>
    </div>
  );
};

NotificationButton.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
  }

export default NotificationButton;
