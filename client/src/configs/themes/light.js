import { createTheme } from '@mui/material/styles';

// Default theme
const theme = createTheme({
  mode: 'light',
  typography: {
    button: {
      textTransform: "none"
    },
  },

  palette: {
    primary: {
      main: '#540089',
      error: '#f44336',
      warn: '#ff6000',
      errorHover: '#ebd7e0',
      link: '#2170ff',
      titleColor: '#646681',
      modalBg: '#ecedf6',
      tableRowSuccess: 'green',
      tableRowInprogress: 'orange',
      tableRowError: 'red',
      navActive: '#daa7ff'
    },
    secondary: {
      main: '#2f4266',
      error: '#f44336',
      warn: '#ff6000',
      errorHover: '#ebd7e0',
      link: '#2170ff',
      titleColor: '#646681',
      modalBg: '#ecedf6'
    },
    error: {
      main: '#F2453D',
    }
  },
  components: {
    MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
                border: "1px solid #32302F",
            },
        },
    },
    MuiButton: {
      styleOverrides: {
        root: {
              fontSize: "16px",
              fontWeight: 600
          },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: 24,
          fontWeight: 700,
          color: '#646681'
          },
      },
    }
},
});

export default theme;
