// todo: add and using all variables from theme
export default (theme) => ({
  content: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    display: 'flex',
  },
  grid: {
    margin: 10,
  },
  logout: {
    height: 40,
    width: 300,
    margin: '20px 0',
    // backgroundColor: theme.palette.primary.error,
    color: 'red',
  },
  itemsContent: {
    display: 'flex',
    justifyContent: 'center',
  },
});
