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
        // "primary": "var(--primary-color)",
        // "primary-80": "var(--primary-color-80)",
        // "primary-60": "var(--primary-color-60)",
        // "primary-40": "var(--primary-color-40)",
        // "primary-20": "var(--primary-color-20)",

        // "secondary": "var(--secondary-color)",
        // "secondary-80": "var(--secondary-color-80)",
        // "secondary-60": "var(--secondary-color-60)",
        // "secondary-40": "var(--secondary-color-40)",
        // "secondary-20": "var(--secondary-color-20)",

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

        // "text": "var(--text-color)",
        // "text-80": "var(--text-color-80)",
        // "text-60": "var(--text-color-60)",
        // "text-40": "var(--text-color-40)",
        // "text-20": "var(--text-color-20)",

        "neutral": "#F5F5F5",

        'text': {
          50: '#131603',
          100: '#262d06',
          200: '#4c590d',
          300: '#738613',
          400: '#99b319',
          500: '#bfdf20',
          600: '#cce64c',
          700: '#d9ec79',
          800: '#e5f2a6',
          900: '#f2f9d2',
          950: '#f9fce9',
        },
        'background': {
          50: '#131604',
          100: '#272b08',
          200: '#4e5610',
          300: '#758118',
          400: '#9cac20',
          500: '#c3d728',
          600: '#cfdf53',
          700: '#dbe77e',
          800: '#e7efa9',
          900: '#f3f7d4',
          950: '#f9fbe9',
        },
        'secondary': {
          50: '#141603',
          100: '#282d06',
          200: '#50590d',
          300: '#788613',
          400: '#a1b319',
          500: '#c9df20',
          600: '#d4e64c',
          700: '#deec79',
          800: '#e9f2a6',
          900: '#f4f9d2',
          950: '#fafce9',
        },
        'primary': {
          50: '#031616',
          100: '#062b2d',
          200: '#0d5759',
          300: '#138286',
          400: '#19adb3',
          500: '#20d9df',
          600: '#4ce0e6',
          700: '#79e8ec',
          800: '#a6f0f2',
          900: '#d2f7f9',
          950: '#e9fbfc',
        },
        'accent': {
          50: '#030a16',
          100: '#07132c',
          200: '#0d2659',
          300: '#143a85',
          400: '#1b4db1',
          500: '#2160de',
          600: '#4e80e4',
          700: '#7aa0eb',
          800: '#a6bff2',
          900: '#d3dff8',
          950: '#e9effc',
        },

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
