import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  );

  useEffect(
    function () {
      const rootElementClass = document.documentElement.classList;

      if (isDarkMode) {
        rootElementClass.add('dark-mode');
        rootElementClass.remove('light-mode');
      } else {
        rootElementClass.add('light-mode');
        rootElementClass.remove('dark-mode');
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error(
      'DarkModeContext was used outside DarkModeProvider'
    );

  return context;
}

export { DarkModeProvider, useDarkMode };
