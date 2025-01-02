import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import React, { useEffect, useRef, useState } from "react";
import type { Theme } from "~/types/theme";

export default function useTheme(defaultTheme: Theme = "auto") {
  const isMatchDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [value, setValue] = useLocalStorage<Theme>("theme", defaultTheme);
  const [theme, setTheme] = useState<Theme>(value);
  const mouseEventRef =
    useRef<React.MouseEvent<HTMLButtonElement, MouseEvent>>(null);

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
    const domReady = document?.startViewTransition(() => {
      if (colorMode === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      }
      if (colorMode === "light") {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
    });
    domReady.ready.then(() => {
      const { clientX, clientY } = mouseEventRef.current || {
        clientX: 0,
        clientY: 0,
      };
      const radius = Math.hypot(
        Math.max(clientX, innerWidth - clientX),
        Math.max(clientY, innerHeight - clientY)
      );
      const clipPath = [
        `circle(0 at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`,
      ];
      document.documentElement.animate(
        { clipPath: colorMode === "dark" ? clipPath.reverse() : clipPath },
        {
          duration: 350,
          easing: "ease-out",
          pseudoElement:
            colorMode === "dark"
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
        }
      );
    });
  }, [colorMode]);

  const setThemeAndStorage = (
    theme: Theme,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setValue(theme);
    setTheme(theme);
    mouseEventRef.current = event;
  };

  return {
    colorMode: colorMode,
    theme: theme,
    setTheme: setThemeAndStorage,
  };
}
