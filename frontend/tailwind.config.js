const { LuShapes } = require('react-icons/lu')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '3rem',
      },
      backgroundImage: {
        // 'dotted_pattern': 'url(./assets/grainy.svg)',
        // 'c1-2': '#ff0000',
        // 'c1': 'linear-gradient(45deg, rgb(194, 183, 200) 100%, rgb(194, 183, 200) 100%)',
        'blurry': 'url(/blurry.svg)'
        // 'c1': 'linear-gradient(45deg, rgba(168,165,200,1) 0%, rgba(192,192,230,1) 43%, rgb(227, 230, 227) 100%)',
      },
      backgroundSize: {
        'dotted_pattern': '300px 300px',
        'blurry': 'cover'
      },
      backgroundRepeat: {
        'dotted_pattern': 'repeat',
      },
      backgroundPosition: {
        'dotted_pattern': 'center',
      },
      colors: {
        c1: 'rgb(214, 201, 221)',
        c2: 'rgb(204, 239, 254)',
        'base-color': 'rgb(234, 207, 207)',
        'highlight-1': 'rgb(0, 84, 28)',
        'highlight-2': 'rgb(0, 255, 255)',
        'dark-bg': 'rgb(255, 20, 147)'
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
        'abril-fatface': ['Abril Fatface', 'serif']
      },
      boxShadow: {
        'glow': '0 0 10px 5px rgba(255, 255, 255, 0.6)',
        'vaporwave': '5px 5px 6px rgba(255, 0, 255, 0.6), -5px -5px 6px rgba(0, 255, 255, 0.6)',
        'crisp': '-5px 5px 0px rgba(0, 0, 0, 1)'
      },
      spacing: {
        'base': '2rem',
        'double-base': '4rem',
        'triple-base': '6rem'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

