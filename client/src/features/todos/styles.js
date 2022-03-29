import { variables } from "configs";

// todo: add and using all variables from theme
export default (theme) => ({
  root: {
    minHeight: `calc(100vh - ${variables.headerHeight} - 60px)`,
    borderRadius: 'unset',
    flexGrow: 1,
    display: 'block',
    textAlign: 'start',
    padding: '24px 32px',
  },
  rootGrid: {
    display: 'flex',
    justifyContent: 'center'
  },
  rootContainer: {
    width: '100%'
  },
  pageAction: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down(700)]: {
      display: 'block',
      '& > *': {
        margin: '0 0 30px 0'
    }
    }
  },
  stickyHeader: {
    position: 'sticky',
    top: variables.headerHeight,
    backgroundColor: 'white',
    zIndex: 1,
    paddingBottom: 20,
    borderRadius: 4
  },
  rootActionContent: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  todoModal: {
    padding: 0,
    margin: 'auto',
    marginTop: '7%',
    width: 'auto',
    borderRadius: '4px',
  },
  todoContent: {
    display: 'block'
  },
  pageTitle: {
    display: 'inline-block',
    width: '100%',
    fontFamily: 'Poppins',
    fontSize: '3rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '2rem',
    marginBottom: '1.5rem',
    color: theme.palette.primary.titleColor,
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px',
    "& .MuiPaper-root": {
      backgroundColor: '#ecedf6'
    }
  },
  item: {
    display: 'block'
  },
  completedItem: {
    color: 'green'
  },
  inprogressItem: {
    color: '#ef6c00'
  },
  expiredItem: {
    color: 'red'
  },
  itemTitle: {
    margin: '0 0 10px 0',
  },
  itemTime: {
    margin: 0
  },
  doneItemTitle: {
    margin: '0 0 10px 0',
    textDecoration: 'line-through'
  },
  paperContent: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '80px',
    padding: '0 24px',
    justifyContent: 'space-between',
    backgroundColor: '#ecedf6'
  },
  emptyText: {
    color: 'grey'
  },
  loading: {
    minHeight: `calc(100vh - ${variables.headerHeight} - 60px)`,
    display: 'flex',
    alignItems: 'center',
  }
});