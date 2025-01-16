import { nextui } from "@nextui-org/react";
import daisyui from "daisyui"
import twTypography from "@tailwindcss/typography";
import defaultTheme from 'tailwindcss/defaultTheme'


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./data/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light", "dark",],
  },
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto San',...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [twTypography(), nextui(), daisyui],
};
