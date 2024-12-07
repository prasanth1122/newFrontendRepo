/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the path as per your project structure
  ], // Adjust paths as needed
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Comic Neue"', "sans-serif"],
      },
      colors: {
        primary: "#305050",
        secondary: "#FF5E5B",
        terinary: "#EDC9AF",
        important_text: "#002147",
        highlight_background: "#F4F4F9",
      },
      width: {
        mainWidth: "98%",
        sidebar: "15%",
        coverImage: "200px",
        ProblemStatement_md: "380px",
        ProblemStatement_xl: "510px",
        ProblemStatement_lg: "380px",
      },
      height: {
        coverImage: "300px",
      },
      minWidth: {
        coverImage: "200px",
      },
    },
    minheight: {
      articleBar: "450px",
    },
    boxShadow: {
      input_shadow: "inset 0px 2px 2px rgba(0, 0, 0, 0.2)", // Custom inner shadow
      cta_button_shadow: "0px 4px 4px rgba(0, 0, 0, 0.15)", //button shadow
      text_area_shadow: "0px 4px 4px rgba(0, 0, 0, 0.4)",
      card_shadow: "0px 4px 12px rgba(0, 0, 4, 0.15)",
    },
  },
  plugins: [scrollbarHide],
};
