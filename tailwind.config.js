const defaultTheme = require('tailwindcss/defaultTheme');
const darkModePluglin = require('tailwindcss-dark-mode');


/** @type {import('tailwindcss').Config} */
//const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  darkMode: [
    'selector'
  ],
  content: [
    './src/**/*.{html,ts}',
    './node_modules/tailwindcss-dark-mode/prefers-dark.js',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        sans: [
          'Lato',
          ...defaultTheme.fontFamily.sans,
        ],
        serif: [
          'Lato',
          ...defaultTheme.fontFamily.serif,
        ],
      }
    },
  },
  plugins: [
    darkModePluglin()
  ],
  variants: {
    backgroundColor: [
      'dark',
      'dark-hover',
      'dark-group-hover',
      'dark-even',
      'dark-odd'
    ],
    borderColor: [
      'dark',
      'dark-disabled',
      'dark-focus',
      'dark-focus-within'
    ],
    textColor: [
      'dark',
      'dark-hover',
      'dark-active',
      'dark-placeholder'
    ]
  }
}