
export default () => ({
  root: {
    padding: '10px 10px 10px 24px',
    textAlign: 'start',
    justifyContent: 'space-between',
    minHeight: 40,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexGrow: 1,
  },
  filters: {
    display: 'flex',
    '-webkit-flex-wrap': 'wrap',
    'flex-wrap': 'wrap',
  },
  actions: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignSelf: 'start',
  }
});