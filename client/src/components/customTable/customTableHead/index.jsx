import React, { memo } from 'react';
import PropTypes from 'prop-types';

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import { makeStyles } from '@mui/styles';
import M from 'messages';
import { getCellPadding, getWidth } from '../config/tableStyleHelper';
import TableConfigs from '../config/tableConfigs';

import styles from './styles';

const useStyles = makeStyles(styles);

function CustomTableHead(props) {
  const classes = useStyles();
  const {
    sortObj,
    onRequestSort,
    rowCount,
    fields,
    filteredParams,
    withEditAction,
    withDeleteAction,
    withReminderAction,
  } = props;

  const createSortHandler = (property) => (event) => {
    if (onRequestSort) {
      onRequestSort(event, property);
    }
  };

  return (
    <TableHead>
      <TableRow className={classes.tableHeadRow}>
        {fields.map((headCell) => {
          const id = headCell.orderField || headCell.id;
          const { cellPaddingRight, cellPaddingLeft } =
            rowCount > 0
              ? headCell
              : {
                  cellPaddingRight: TableConfigs.defaultCellPadding,
                  cellPaddingLeft: TableConfigs.defaultCellPadding,
                };
          return (
            <TableCell
              key={id}
              sortDirection={sortObj.field === id ? sortObj.order : false}
              style={{
                ...getWidth(headCell.width),
                ...getCellPadding(cellPaddingRight, cellPaddingLeft),
              }}
              align={headCell.headAlign || 'left'}
            >
              {headCell.sortable && (
                <TableSortLabel
                  active={filteredParams?.params?.sort?.field === id}
                  direction={
                    filteredParams?.params?.sort?.field === id
                      ? filteredParams.params.sort.order
                      : 'asc'
                  }
                  onClick={createSortHandler(id)}
                >
                  {M.get(headCell.label)}
                </TableSortLabel>
              )}
              {!headCell.sortable && M.get(headCell.label)}
            </TableCell>
          );
        })}
        {withEditAction && ( <TableCell style={{ width: '24px', paddingRight: '16px', paddingLeft: '24px' }} /> )}
        {withDeleteAction && ( <TableCell style={{ width: '24px', paddingRight: '16px', paddingLeft: '24px' }} /> )}
        {withReminderAction && ( <TableCell style={{ width: '24px', paddingRight: '16px', paddingLeft: '24px' }} /> )}
      </TableRow>
    </TableHead>
  );
}

CustomTableHead.propTypes = {
  sortObj: PropTypes.shape({
    order: PropTypes.oneOf(['asc', 'desc', '']),
    field: PropTypes.string,
  }).isRequired,
  onRequestSort: PropTypes.func,
  rowCount: PropTypes.number,
  fields: PropTypes.instanceOf(Array).isRequired,
  filteredParams: PropTypes.instanceOf(Object).isRequired,
  withEditAction: PropTypes.bool,
  withDeleteAction: PropTypes.bool,
  withReminderAction: PropTypes.bool,
};

CustomTableHead.defaultProps = {
  onRequestSort: null,
  rowCount: 0,
  withEditAction: true,
  withDeleteAction: true,
  withReminderAction: true,
};

export default memo(CustomTableHead);
