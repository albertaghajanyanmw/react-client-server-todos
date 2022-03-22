import { variables } from "configs";

// todo: add and using all variables from theme
export default (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${variables.headerHeight} - 40px)`,
  },
  root__container: {
    width: '100%'
  },
  stickyHeader: {
    position: 'sticky',
    top: variables.headerHeight,
    backgroundColor: 'white',
    zIndex: 1,
    paddingBottom: 20,
    borderRadius: 4
  },
  root__actionContent: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  todo__modal: {
    padding: 0,
    margin: 'auto',
    marginTop: '7%',
    width: 'auto',
    borderRadius: '4px',
  },
  todoContent: {
    display: 'block'
  },
  todoContent__paper: {
    padding: '10px',
  },
  page__title: {
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
    color: '#646681',
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
  }
});


