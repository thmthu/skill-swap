import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ Bắt buộc để dark mode hoạt động

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/**/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#AA0000",
        "primary-dark": "#3D0000",
        "primary-medium": "#D14444",
        "primary-light": "#E6A38B",
        "primary-extra-light": "#F5DFCF",

        "secondary-red-pink": "#BB4630",
        "secondary-light-pink": "#F9EEEB",

        "semantic-green": "#699A23",
        "semantic-blue": "#0B66E4",
        "semantic-orange": "#FAA53D",

        "gradient-start": "#893C3E",
        "gradient-mid": "#430D0D",
        "gradient-end": "#1B0705",

        popup: "#979797", // dùng cho popup

        // ⚠️ KHÔNG đặt text-dark = trắng nữa, tránh nhầm!
        // Thay vào đó dùng Tailwind: text-black, dark:text-white
      },

      fontFamily: {
        heading: ["Poppins", ...defaultTheme.fontFamily.sans],
        body: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        display: [
          "2rem",
          {
            lineHeight: "1.2",
            "@screen md": {
              fontSize: "3rem",
            },
          },
        ],
        h1: [
          "1.5rem",
          {
            lineHeight: "1.25",
            "@screen md": {
              fontSize: "2rem",
            },
          },
        ],
        h2: [
          "1.25rem",
          {
            lineHeight: "1.3",
            "@screen md": {
              fontSize: "1.75rem",
            },
          },
        ],
        h3: [
          "1.125rem",
          {
            lineHeight: "1.4",
            "@screen md": {
              fontSize: "1.125rem",
            },
          },
        ],
        subtitle1: [
          "1rem",
          {
            lineHeight: "1.5",
          },
        ],
        subtitle2: [
          "0.875rem",
          {
            lineHeight: "1.4",
          },
        ],
        body1: [
          "0.875rem",
          {
            lineHeight: "1.6",
            "@screen md": {
              fontSize: "1rem",
            },
          },
        ],
        body2: [
          "0.75rem",
          {
            lineHeight: "1.5",
            "@screen md": {
              fontSize: "0.875rem",
            },
          },
        ],
        btn1: [
          "0.875rem",
          {
            lineHeight: "1.4",
            "@screen md": {
              fontSize: "1rem",
            },
          },
        ],
        btn2: [
          "0.75rem",
          {
            lineHeight: "1.4",
            "@screen md": {
              fontSize: "0.875rem",
            },
          },
        ],
      },

      fontWeight: {
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".overflow-anchor-none": {
          "overflow-anchor": "none",
        },
      });
    },
  ],
};
