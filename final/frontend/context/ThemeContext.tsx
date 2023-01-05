import { FC, createContext, useContext, useEffect, useState } from "react";
import { PropsChildren } from "../interfaces/Props";

type themeContextType = {
  darkTheme: boolean;
  toggleDark: () => void;
};

const themeContextDefaultValue: themeContextType = {
  darkTheme: true,
  toggleDark: () => {},
};

const ThemeContext = createContext<themeContextType>(themeContextDefaultValue);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeContextProvider: FC<PropsChildren> = ({
  children,
}: PropsChildren) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(
    themeContextDefaultValue.darkTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    darkTheme ? root.classList.add("dark") : root.classList.remove("dark");
    // localStorage.setItem("theme", darkToggle);
  }, [darkTheme]);

  const toggleDark = () => {
    setDarkTheme(!darkTheme);
  };
  const value: themeContextType = {
    darkTheme,
    toggleDark,
  };
  return (
    <>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </>
  );
};
