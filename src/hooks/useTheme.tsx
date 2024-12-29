import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import { useEffect, useState } from "react";
import type { Theme } from "~/types/theme";

export default function useTheme(defaultTheme: Theme = "auto") {
  const isMatchDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [value, setValue] = useLocalStorage<Theme>("theme", defaultTheme);
  const [theme, setTheme] = useState<Theme>(value);

  const colorMode =
    theme === "auto"
      ? value === "auto"
        ? isMatchDark
          ? "dark"
          : "light"
        : value
      : theme;
  useEffect(() => {
    if (value && value !== theme) {
      setTheme(value);
    }
  }, []);

  useEffect(() => {
    if (colorMode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }
    if (colorMode === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, [colorMode]);

  const setThemeAndStorage = (theme: Theme) => {
    setValue(theme);
    setTheme(theme);
  };

  return {
    colorMode: colorMode,
    theme: theme,
    setTheme: setThemeAndStorage,
  };
}
