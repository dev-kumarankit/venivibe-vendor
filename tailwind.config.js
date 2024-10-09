/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      width: {
        aside: "14rem",
      },
      colors: {
        primary: "#00A99D",
        secondary: "#044B76",
        "primary-text": "#212121",
        "secondary-700": "#006CAE",
        secondaryBlue: "#006CAE",
        black: "#212121",
        gray: "#637381",
        grayBorder:"#F1F1F1",
        secondaryGray: "#F8F8F8",
        customBorder: 'rgba(166, 175, 195, 0.4)',
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.42, 0, 0.58, 1)",
      },
      transitionDuration: {
        650: "450ms",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #00A99D , #044B76)",
        "gradient-ticket": "linear-gradient(to right, #00919D , #004C9D)",
        "gradient-signin": "linear-gradient(to top left, #00919D, #004C9D)",

        overlay: "linear-gradient(to right, #232526, #414345)",
      },
      boxShadow: {
        "light": "0px 0px 3px 0px #A6AFC366",
        dashCard: "0px 1px 3px 0px #606C800D",
      },
      borderRadius: {
        12: "12px",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    function ({ addComponents }) {
      addComponents({
        ".input-autofill": {
          "input:-webkit-autofill": {
            boxShadow: "0 0 0px 1000px #F8F8F8 inset !important",
            "-webkit-text-fill-color": "#000 !important",
            border: "1px solid #F8F8F8 !important",
          },
        },
      });
    },
  ],
};
