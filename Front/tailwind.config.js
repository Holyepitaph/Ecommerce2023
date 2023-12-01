/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {    
      colors:{
      'main':"#136161",
      'mainAlt': '#044b4b',
      'accentA':'#1e366c',
      'accentB':'#a15a1f',
      'accentC':'#a1761f',
      'accentD':'#324a81',
      'accentE':'',
      'accentF':'',
      'accentG':'',
      'gradient': '',
      'back': "#b69870",
      'backAltA': '#d7c0a1',
      'backAltB': '#fff9f0'
    },},
  },
  plugins: [],
}

