import React, { useEffect, useRef, useCallback, useMemo } from "react";
import type { P5I } from "p5i";
import { p5i } from "p5i";
import useTheme from "~/hooks/useTheme";

const { random, trunc, min } = Math;
const {
  mount,
  unmount,
  createCanvas,
  resizeCanvas,
  background,
  noFill,
  stroke,
  noise,
  noiseSeed,
  cos,
  sin,
  line,
  TWO_PI,
} = p5i();

// 合并常量配置
const CONFIG = {
  SCALE: 70,
  SCALE_Z: window.innerWidth * 1.5,
  LENGTH: 4,
  AMOUNT: 2000,
  COLORS: {
    light: {
      background: "rgba(255, 255, 255, 0.5)",
      stroke: [136, 136, 136],
    },
    dark: {
      background: "rgba(0, 0, 0, 0.5)",
      stroke: [102, 102, 102],
    },
  },
} as const;

let points: { x: number; y: number; t: number }[] = [];

// 优化 force 计算函数
const getForceOnPoint = (x: number, y: number, z: number) =>
  (noise(x / CONFIG.SCALE, y / CONFIG.SCALE, z / CONFIG.SCALE_Z) - 0.5) *
  2 *
  TWO_PI;

// 合并 setup 和初始化逻辑
function initializeCanvas(width: number, height: number, isDark: boolean) {
  const colors = CONFIG.COLORS[isDark ? "dark" : "light"];
  createCanvas(width, height);
  background(colors.background);
  stroke(colors.stroke.join(","));
  noFill();
  noiseSeed(Date.now());

  points = Array.from({ length: CONFIG.AMOUNT }, () => ({
    x: random() * width,
    y: random() * height,
    t: 0,
  }));
}

// 优化 draw 函数
function draw(
  { frameCount, mouseX, mouseY }: P5I,
  width: number,
  height: number,
  isDark: boolean
) {
  const colors = CONFIG.COLORS[isDark ? "dark" : "light"];
  background(colors.background);

  points = points.filter(
    ({ x, y }) => x > 0 && x < width && y > 0 && y < height
  );

  // 批量创建新点
  if (points.length < CONFIG.AMOUNT) {
    points.push(
      ...Array.from({ length: CONFIG.AMOUNT - points.length }, () => {
        const sourcePoint = points[trunc(random() * points.length)];
        return {
          x: sourcePoint.x + (random() - 0.5) * CONFIG.LENGTH * 50,
          y: sourcePoint.y + (random() - 0.5) * CONFIG.LENGTH * 50,
          t: 0,
        };
      })
    );
  }

  // 批量更新点
  const [r, g, b] = colors.stroke;
  points.forEach((p) => {
    const { x, y, t } = p;
    stroke(r, g, b, min(t * 10, 200));
    const rad = getForceOnPoint(x, y, mouseX + mouseY + frameCount / 2);
    const nx = x + cos(rad) * CONFIG.LENGTH;
    const ny = y + sin(rad) * CONFIG.LENGTH;
    line(x, y, nx, ny);
    p.x = nx;
    p.y = ny;
    p.t += 1;
  });
}

const RiverBackground: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isDark = useMemo(() => theme === "dark", [theme]);
  const dimensionsRef = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    const { width, height } = dimensionsRef.current;
    if (canvasRef.current) {
      resizeCanvas(width, height);
      initializeCanvas(width, height, isDark);
    }
  }, [isDark]);

  useEffect(() => {
    const handleWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (
        width === dimensionsRef.current.width &&
        height === dimensionsRef.current.height
      )
        return;

      dimensionsRef.current = { width, height };
      handleResize();
    };

    if (canvasRef.current) {
      const { width, height } = dimensionsRef.current;
      mount(canvasRef.current, {
        setup: () => initializeCanvas(width, height, isDark),
        draw: (p: P5I) => draw(p, width, height, isDark),
      });
    }

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      unmount();
    };
  }, [handleResize, isDark]);

  const colors = useMemo(
    () => CONFIG.COLORS[isDark ? "dark" : "light"],
    [isDark]
  );

  return (
    <div
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none -z-1 print:hidden"
      style={{
        background: colors.background,
        maskImage: "radial-gradient(circle, transparent, black)",
      }}
    />
  );
};

export default RiverBackground;
