export default (theme) => ({
  table: {
    minWidth: 460,
  },
  tableBody: {
    display: 'flex',
    justifyContent: 'center'
  },
  skeletonContainer: {
    display: 'flex'
  },
  skeletonItem: {
    minWidth: '100%',
    height: '40px',
    margin: '10px'
  },
  tableCellAction: {
    padding: '6px 16px',
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  tableRow: {
    height: '52px',
    '& > td': {
      fontWeight: '400',
      fontSize: 16,
      cursor: 'pointer',
    }
  },
  rowSuccess: {
    '& > td': {
      color: theme.palette.primary.tableRowSuccess,
      textDecoration: 'line-through'
    },
  },
  rowInprogress: {
    '& > td': {
      color: theme.palette.primary.tableRowInprogress,
    },
  },
  rowError: {
    '& > td': {
      color: theme.palette.primary.tableRowError,
    },
  },
});