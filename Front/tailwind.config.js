/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {    
      colors:{
      'main':"#fdf6e4",
      'mainAlt': '#228b22',
      'accentA':'#357CD1',
      'accentB':'#5C1A1B',
      'accentC':'#a1761f',
      'accentD':'#324a81',
      'back': "#000000",
      'backAltA': '#d7c0a1',
      'backAltB': '#fff9f0',
      'textA': '#000000',
      'textB': '#ffffff',
    },},
  },
  plugins: [],
}

