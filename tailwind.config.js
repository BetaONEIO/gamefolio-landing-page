import { IMAGES } from "./src/assets/images";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

      lightbg: `url(${IMAGES.bgImageLight})`,
      darkbg: `url(${IMAGES.bgImageDark})`,
    },
  },
};
export const plugins = [];
export const darkMode = "class";
