/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ['Poppins', "sans-serif"],
    },
    extend: {
      animation: {
        shine: "shine 1s",
      },
      keyframes: {
        shine: {
          "100%": { left: "90%" },
        },
      },
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px"
      },
      colors: {
        organic: {
          200: "#65b74a",
          300: "#5ab73b",
          400: "#51b72f",
          500: "#46b522",
          600: "#3cb815",
          700: "#309310"
        },
        redsub: {
          400: "#d02222",
        }
      },
    },
  },
  plugins: [],
};
