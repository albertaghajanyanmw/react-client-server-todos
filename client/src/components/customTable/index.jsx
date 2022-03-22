import React, { useState, useMemo, memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import M from 'messages';
import CustomTableHead from './customTableHead';
import CustomTableCell from './customTableCell';
import styles from './styles';
import moment from 'moment';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles(styles);

function CustomTable({
  tableSources,
  tableOptions,
  loading,
  filteredParams,
  setFilteredParams,
  handleEditAction,
  handleDeleteAction,
  rowUniqueKey,
  handleClickIcon,
  handleRowClick,
  toolbarView,
}) {

  const classes = useStyles();

  const {limit, skip} = filteredParams?.params;
  const page = parseInt(skip/limit, 10);
  const [rowsPerPage, setRowsPerPage] = useState(parseInt(limit, 10));

  const sortObj = filteredParams?.params?.sort || {};
  const {order, field: orderBy} = sortObj;

  const {fields, rowsPerPageOptions} = tableOptions;
  const {data: tableData, count} = tableSources;


  const handleRequestSort = useCallback((e, property) => {
    const isAsc = orderBy === property && order === 'asc';
    const newFilter = {params: {...filteredParams.params, sort: {field: property, order: isAsc ? 'desc' : 'asc'}, skip: 0}}
    setFilteredParams(newFilter);
  }, [filteredParams.params, setFilteredParams, order, orderBy]);

  const handleChangePage = (e, newPage) => {
    const newFilter = {params: {...filteredParams.params, skip: newPage * filteredParams.params.limit}};
    setFilteredParams(newFilter);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    const newFilter = {params: {...filteredParams.params, skip: 0, limit: parseInt(event.target.value, 10)}};
    setFilteredParams(newFilter);
  };

  const collectSkeletonContainer = fields.map(fld => (
    <Skeleton key={fld.id} className={classes.skeletonItem} animation="pulse" />
  ));

  const isCompleted = (row) => row.status === 'completed';
  // const isInprogress = (row) => row.status === 'inprogress';
  // const isExpired = (row) => row.expireDateOrg && moment(row.expireDateOrg).isBefore(new Date());

  const renderCustomTableCell = useMemo(() => {
    return (
      tableData?.map((row) => {
        return loading ? (<td key={row.id}>{collectSkeletonContainer}</td>) :
          (
            <Tooltip key={row[rowUniqueKey]} title={M.get('actions.changeStatus')}>
              <TableRow
                onClick={() => handleRowClick(row)}
                hover={row.isDoorOpened === undefined}
                key={row[rowUniqueKey]}
                className={classNames(classes.tableRow, {
                    [classes.rowSuccess]: isCompleted(row),
                    // [classes.rowInprogress]: isInprogress(row) && !isExpired(row),
                    // [classes.rowError]: isExpired(row),
                  })
                }
              >
                {fields.map((item) =>
                  (<CustomTableCell
                    key={item.id}
                    handleClickIcon={handleClickIcon}
                    cellItem={item}
                    data={row}
                    filteredParams={filteredParams}
                  />)
                )}
                {handleEditAction &&
                  <CustomTableCell
                    key={`${row[rowUniqueKey]}-edit`}
                    handleClickIcon={handleEditAction}
                    data={row}
                    isEditAction
                  />
                }
                {handleDeleteAction &&
                  <CustomTableCell
                    key={`${row[rowUniqueKey]}-delete`}
                    handleClickIcon={handleDeleteAction}
                    data={row}
                    isDeleteAction
                  />
                }
              </TableRow>
            </Tooltip>
          );
      })
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, collectSkeletonContainer, tableData, handleClickIcon, handleEditAction]);

  return (
    <div>
      <Paper>
        <TableContainer>
          {toolbarView && toolbarView}
          <Table className={classes.table} size="small" padding="checkbox">
              <CustomTableHead
                sortObj={sortObj}
                onRequestSort={tableData?.length > 0 ? handleRequestSort : null}
                rowCount={tableData?.length}
                fields={fields}
                filteredParams={filteredParams}
                withEditAction={!!tableData?.length && handleEditAction ? true : false}
                withDeleteAction={!!tableData?.length && handleDeleteAction ? true : false}
              />
            <TableBody className={loading ? classes.tableBody : ''}>
                {renderCustomTableCell}
                {!tableData?.length &&  (
                  <TableRow style={{ height: 60 }}>
                    <CustomTableCell
                      isEmptyCell
                      loading={loading}
                    />
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        {(tableData?.length > 0) && (
          <TablePagination
            component='div'
            rowsPerPageOptions={rowsPerPageOptions}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </div>
  );
}

CustomTable.propTypes = {
  tableSources: PropTypes.shape({ data: PropTypes.instanceOf(Array), count: PropTypes.number }),
  tableOptions: PropTypes.shape({ fields: PropTypes.instanceOf(Array), rowsPerPageOptions: PropTypes.instanceOf(Array), searchFields: PropTypes.instanceOf(Array) }).isRequired,
  loading: PropTypes.bool,
  filteredParams: PropTypes.instanceOf(Object).isRequired,
  setFilteredParams: PropTypes.func,
  handleEditAction: PropTypes.func,
  handleDeleteAction: PropTypes.func,
  rowUniqueKey: PropTypes.string,
  handleClickIcon: PropTypes.func,
  toolbarView: PropTypes.node,
  handleRowClick: PropTypes.func

};

CustomTable.defaultProps = {
  tableSources: {data: [], count: 0},
  loading: false,
  setFilteredParams: null,
  handleEditAction: null,
  handleDeleteAction: null,
  rowUniqueKey: 'id',
  handleClickIcon: null,
  toolbarView: null,
  handleRowClick: null
};

export default memo(CustomTable);
