import React, { useState, useEffect, useContext } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import lightTheme from '../src/lightTheme';
import darkTheme from '../src/darkTheme';

const ThemeContext = React.createContext('light');

export const MyThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(global.window?.__theme || 'dark');
  const toggleTheme = () => {
    global.window.__setPreferredTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    global.window.__onThemeChange = setTheme;
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
