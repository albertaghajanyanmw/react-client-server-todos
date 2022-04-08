import React, {memo} from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import styles from './styles';

function PageTitle({ children, ...rest }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <div className={classes.pageTitle} {...rest}>
      {children}
    </div>
  );
}

PageTitle.propTypes = {
  children: PropTypes.string
}

PageTitle.defaultValue = {
  children: ''
}

export default memo(PageTitle);
