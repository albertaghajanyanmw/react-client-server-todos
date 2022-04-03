// todo: add and using all variables from theme
export default (theme) => ({
    btn: {
        minHeight: 56,
        width: 200,
        [theme.breakpoints.down(700)]: {
            width: '100%',
        }
    },
    selectBox: {
        maxWidth: 200,
        minWidth: 200,
        [theme.breakpoints.down(700)]: {
            maxWidth: '100%'
        }
    },
    select: {
        border: '1px solid grey',
        [theme.breakpoints.down(600)]: {
            width: '100%',
        },
    }
});
