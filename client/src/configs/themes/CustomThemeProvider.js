import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import getTheme from './base';

export const CustomThemeContext = React.createContext({
  currentTheme: 'light',
  setTheme: null,
});

const CustomThemeProvider = (props) => {
  const { children } = props;

  const currentTheme = localStorage.getItem('appTheme') || 'light';
  const [themeName, _setThemeName] = useState(currentTheme);
  const theme = getTheme(themeName);

  const setThemeName = (name) => {
    localStorage.setItem('appTheme', name);
    _setThemeName(name);
  };

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

CustomThemeProvider.propTypes = {
  children: PropTypes.node
}
export default CustomThemeProvider;
