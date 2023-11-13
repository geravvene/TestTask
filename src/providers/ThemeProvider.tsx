/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, PropsWithChildren } from 'react';

type ThemeType = boolean;

type ThemeContextType = {
  isDark: ThemeType;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContextType>({ isDark: true, setIsDark: () => {} });

function ThemeProvider({ children }: PropsWithChildren) {
  const [isDark, setIsDark] = useState<ThemeType>(true);

  return <ThemeContext.Provider value={{ isDark, setIsDark }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
