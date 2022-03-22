import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@mui/material/TableCell';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import M from 'messages';
import { getCellPadding } from '../config/tableStyleHelper';
import TableConfigs from '../config/tableConfigs';

import styles from './styles';

const useStyles = makeStyles(styles);

function CustomTableCell({
  isEditAction,
  isDeleteAction,
  isEmptyCell,
  cellItem,
  data,
  loading,
  handleClickIcon
}) {
  const classes = useStyles();

  const onActionIconClick = (e, values) => {
    e.stopPropagation();
    handleClickIcon(values);
  }

  const cellView = () => {
    if (isEmptyCell) {
      return <TableCell style={getCellPadding(TableConfigs.defaultCellPadding, TableConfigs.defaultCellPadding)} colSpan={20} > {!loading && M.get('table.noResult')} </TableCell>;
    }
    if (isEditAction) {
      return <TableCell align="left" onClick={(e) => onActionIconClick(e, data)} className={classes.tableCellAction}> <EditIcon color="primary"/> </TableCell>
    }

    if (isDeleteAction) {
      return <TableCell align="left" onClick={(e) => onActionIconClick(e, data)} className={classes.tableCellAction}> <DeleteIcon className={classes.delIcon} color="error"/> </TableCell>
    }
    return <TableCell className={classNames(classes.tableCellItem)} style={getCellPadding(cellItem.cellPaddingRight, cellItem.cellPaddingLeft)} align={cellItem.textAlign || "left"}>{data[cellItem.id]}</TableCell>;
  }
  return (
    <>
      {cellView()}
    </>
  );
}

CustomTableCell.propTypes = {
  cellItem: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Object),
  isEditAction: PropTypes.bool,
  isDeleteAction: PropTypes.bool,
  isEmptyCell: PropTypes.bool,
  loading: PropTypes.bool,
  handleClickIcon: PropTypes.func
};

CustomTableCell.defaultProps = {
  cellItem: {},
  data: {},
  isEditAction: false,
  isDeleteAction: false,
  isEmptyCell: false,
  loading: false,
  handleClickIcon: null
};

export default memo(CustomTableCell);