import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import styles from './styles';

const SelectButton = ({ title, options, value, setValue}) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <Box className={classes.selectBox}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">{title}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={value}
          label={title}
          onChange={setValue}
          styles={{root: classes.select}}
        >
            {options?.map(option => (
                <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
    );
  }

SelectButton.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setValue: PropTypes.func.isRequired,
    title: PropTypes.string,
    options: PropTypes.instanceOf(Array).isRequired
}

export default memo(SelectButton);