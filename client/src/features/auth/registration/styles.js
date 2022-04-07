// todo: add and using all variables from theme
export default (theme) => ({
  container: {
    margin: 'auto',
    marginTop: '7%',
    width: 'auto',
    borderRadius: '4px',
    [theme.breakpoints.up(350)]: {
      width: 350,
      marginLeft: "auto",
      marginRight: "auto",
      boxShadow: '1px 2px 10px 0px #3a4e9975'
    },
    [theme.breakpoints.down(450)]: {
      boxShadow: 'none'
    }
  },
  description: {
    fontWeight: 400,
    fontSize: 16,
    color: '#343a40',
    marginTop: 20,
  },
  link: {
    fontWeight: '600',
    textDecoration: 'unset',
    alignSelf: 'center',
    color: theme.palette.primary.link,
  },
  submit: {
    height: 50,
  },
});
