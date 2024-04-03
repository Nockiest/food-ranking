import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inder: ['Inder', 'sans-serif'],
        inika: ['Inika', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      rounded: {
        'lg': '0.5rem',
      },
      colors: {
        "primary": "var(--primary-color)",
        "primary-80": "var(--primary-color-80)",
        "primary-60": "var(--primary-color-60)",
        "primary-40": "var(--primary-color-40)",
        "primary-20": "var(--primary-color-20)",

        "secondary": "var(--secondary-color)",
        "secondary-80": "var(--secondary-color-80)",
        "secondary-60": "var(--secondary-color-60)",
        "secondary-40": "var(--secondary-color-40)",
        "secondary-20": "var(--secondary-color-20)",

        "ternary": "var(--ternary-color)",
        "ternary-80": "var(--ternary-color-80)",
        "ternary-60": "var(--ternary-color-60)",
        "ternary-40": "var(--ternary-color-40)",
        "ternary-20": "var(--ternary-color-20)",

        "error": "var(--error-color)",
        "error-80": "var(--error-color-80)",
        "error-60": "var(--error-color-60)",
        "error-40": "var(--error-color-40)",
        "error-20": "var(--error-color-20)",

        "text": "var(--text-color)",
        "text-80": "var(--text-color-80)",
        "text-60": "var(--text-color-60)",
        "text-40": "var(--text-color-40)",
        "text-20": "var(--text-color-20)",

        "neutral": "#F5F5F5"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      botderRadius:{
        '10': '10px'
      },
      inset: {

       '64': '16rem',
       '1/5': '20%',
       '2/5': '40%',
       '3/7': '45%',
       "1/8": "12%",
       "1/16": "6%",
      
      }
    },
  },
  plugins: [],
};
export default config;
