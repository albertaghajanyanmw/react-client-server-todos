import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import styles from './styles';

function CircularLoading() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <Box  className={classes.loading}>
      <CircularProgress size={80} />
    </Box>
  );
}

export default CircularLoading;
