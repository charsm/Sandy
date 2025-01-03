import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { RectBounds, Theme } from "~/types/theme";
import { themeAtom } from "~/store";

export default function UseTheme(defaultTheme: Theme = "auto") {
  const isMatchDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [value, setValue] = useLocalStorage<Theme>("theme", defaultTheme);
  const [theme, setTheme] = useState<Theme>(value);
  const rectBoundsRef = useRef<RectBounds>(null);

  // 简化 colorMode 计算逻辑
  const colorMode = useMemo(() => {
    if (theme === "auto") {
      return value === "auto" ? (isMatchDark ? "dark" : "light") : value;
    }
    return theme;
  }, [theme, value, isMatchDark]);

  // 提取动画逻辑
  const animateThemeTransition = useCallback(
    (clientX: number, clientY: number) => {
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
    },
    [colorMode]
  );

  // 同步主题状态
  useEffect(() => {
    if (value && value !== theme) setTheme(value);
  }, [value]);

  // 更新 DOM 和动画
  useEffect(() => {
    themeAtom.set(colorMode);
    const domReady = document.startViewTransition(() => {
      document.documentElement.classList.toggle("dark", colorMode === "dark");
      document.documentElement.style.colorScheme = colorMode;
    });

    domReady.ready.then(() => {
      const { x = 0, y = 0 } = rectBoundsRef.current || {};
      animateThemeTransition(x, y);
    });
  }, [colorMode, animateThemeTransition]);

  const setThemeAndStorage = useCallback(
    (newTheme: Theme, event: RectBounds) => {
      setValue(newTheme);
      setTheme(newTheme);
      rectBoundsRef.current = event;
    },
    [setValue]
  );

  return {
    colorMode,
    theme,
    setTheme: setThemeAndStorage,
  };
}
