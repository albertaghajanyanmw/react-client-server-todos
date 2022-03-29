// todo: add and using all variables from theme
export default (theme) => ({
    navLinkText: {
        color: 'white',
        textDecoration: 'none',
    },
    isActive: {
        textDecoration: 'none',
        marginRight: 20,
        '& > h6:first-child': {
            color: theme.palette.primary.navActive,
        }
    },
    inactive: {
        textDecoration: 'none',
        marginRight: 20,
    },
    menuItem: {
        color: 'black',
        textDecoration: 'none',
    },
  });
