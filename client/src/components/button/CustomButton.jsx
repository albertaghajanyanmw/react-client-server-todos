import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import styles from './styles';

const CustomButton = ({text, variant = "contained", onClick}) => {

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <Button className={classes.btn} onClick={onClick} variant={variant} >{text}</Button>
  )
}

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default memo(CustomButton);
