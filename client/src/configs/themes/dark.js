import { createTheme } from '@mui/material/styles';

// Dark theme
const theme = createTheme({
  mode: 'dark',
  typography: {
    button: {
      textTransform: "none"
    }
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9',
      error: '#f44336',
      errorHover: '#ebd7e0',
    },
    secondary: {
      main: '#90caf9',
      error: '#f44336',
      errorHover: '#ebd7e0',
    },
    error: {
      main: '#F2453D',
    }
  },
});

export default theme;