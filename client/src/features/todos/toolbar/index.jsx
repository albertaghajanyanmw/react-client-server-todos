import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';

import CustomSearch from 'components/customSearch';

import styles from './styles';

const useStyles = makeStyles(styles);

const CustomTableToolbar = (props) => {
  const classes = useStyles();

  const {
    onSearchCallback,
    filteredParams,
  } = props;

  const searchValue = filteredParams?.params?.search?.value || '';

  return (
    <Toolbar className={classes.root}>
      <div className={classes.filters}>
        <CustomSearch
          onSearchCallback={onSearchCallback}
          searchValue={searchValue}
        />
      </div>
    </Toolbar>
  );
};

// params: {
//   sort: { field: "id", order: "desc" },
//   filter: {},
//   limit: 3,
//   skip: 0,
// }

// inputs: PropTypes.arrayOf(
//   PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     variant: PropTypes.string.isRequired,
//     icon: PropTypes.node,
//   })
// ),

CustomTableToolbar.propTypes = {
  onSearchCallback: PropTypes.func.isRequired,
  filteredParams: PropTypes.instanceOf(Object).isRequired,
};

export default CustomTableToolbar;