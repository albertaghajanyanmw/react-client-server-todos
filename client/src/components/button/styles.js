import { grey } from "@mui/material/colors";

// todo: add and using all variables from theme
export default (theme) => ({
    btn: {
        minHeight: 56,
        [theme.breakpoints.down(600)]: {
            width: '100%',
            marginBottom: 20
        }
    },
    selectBox: {
        maxWidth: 200,
        [theme.breakpoints.down(600)]: {
            marginTop: 20,
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
