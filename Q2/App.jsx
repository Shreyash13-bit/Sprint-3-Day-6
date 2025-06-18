import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
const App = () => {
  return (
    <ThemeProvider>
      <h1>Welcome to Theme Toggle App</h1>
      <ThemeToggle />
    </ThemeProvider>
  );
};
export default App;
