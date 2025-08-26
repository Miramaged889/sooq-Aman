/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A7E8C",
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#0A7E8C",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        secondary: {
          DEFAULT: "#FFB703",
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#FFB703",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        background: "#F8F9FA",
        text: "#212529",
      },
      fontFamily: {
        tajawal: ["Tajawal", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        lg: "8px",
      },
      fontSize: {
        h1: ["32px", { lineHeight: "1.2" }],
        h2: ["28px", { lineHeight: "1.3" }],
        h3: ["24px", { lineHeight: "1.4" }],
        body: ["16px", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
};
