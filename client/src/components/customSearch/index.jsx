import React from 'react';
import { FormControl, TextField, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import M from 'messages';
import { useDebounce } from 'hooks/common';
import styles from './styles';

const useStyles = makeStyles(styles);

const CustomSearch = ({
  onSearchCallback,
  searchValue,
  disableFieldsOnSearch,
}) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState(searchValue);
  const debouncedValue = useDebounce(searchTerm, 1000);

  const handleDisableFieldsOnSearch = () => {
    if (disableFieldsOnSearch && typeof disableFieldsOnSearch === 'function') {
      disableFieldsOnSearch(true);
    }
  };

  React.useEffect(() => {
    setSearchTerm(searchValue);
  }, [searchValue]);

  React.useEffect(() => {
    onSearchCallback(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className={classes.box}>
      <FormControl margin="dense" fullWidth variant="outlined">
        <TextField
          type="text"
          variant="outlined"
          size="small"
          placeholder={M.get('actions.search')}
          className={classes.searchInput}
          value={searchTerm}
          label={M.get('actions.search')}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            handleDisableFieldsOnSearch();
          }}
          InputLabelProps={{
            style: { fontSize: 14, fontWeight: 500, opacity: 0.8 },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
            classes: {
              adornedEnd: classes.adornedEnd,
            },
          }}
          id="search"
          key="search"
        />
      </FormControl>
    </div>
  );
};

CustomSearch.propTypes = {
  onSearchCallback: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  disableFieldsOnSearch: PropTypes.func,
};

CustomSearch.defaultProps = {
  searchValue: '',
  disableFieldsOnSearch: null,
};

export default CustomSearch;
