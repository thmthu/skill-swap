import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/**/**/**/*.{js,ts,jsx,tsx}"],
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

				"text-light": "#000000",
				"text-dark": "#FFFFFF",

				"bg-light": "#F9FAFB",
				"bg-popup": "#979797",
				"bg-dark": "#1F1F1F",
			},
			fontFamily: {
				heading: ["Poppins", ...defaultTheme.fontFamily.sans],
				body: ["Open Sans", ...defaultTheme.fontFamily.sans],
			},
			// Apply mobile-first styles and override with md: like this:
			// <h1 class="text-h1 md:text-display font-bold font-heading">Title</h1>
			fontSize: {
        display: [
          '2rem', // 32px for mobile
          {
            lineHeight: '1.2',
            '@screen md': {
              fontSize: '3rem', // 48px for desktop
            },
          },
        ],
        h1: [
          '1.5rem', // 24px mobile
          {
            lineHeight: '1.25',
            '@screen md': {
              fontSize: '2rem', // 32px desktop
            },
          },
        ],
        h2: [
          '1.25rem', // 20px mobile
          {
            lineHeight: '1.3',
            '@screen md': {
              fontSize: '1.75rem', // 28px desktop
            },
          },
        ],
        h3: [
          '1.125rem', // 18px mobile
          {
            lineHeight: '1.4',
            '@screen md': {
              fontSize: '1.125rem', // 18px desktop
            },
          },
        ],
        subtitle1: [
          '1rem', // 16px
          {
            lineHeight: '1.5',
          },
        ],
        subtitle2: [
          '0.875rem', // 14px
          {
            lineHeight: '1.4',
          },
        ],
        body1: [
          '0.875rem', // 14px
          {
            lineHeight: '1.6',
            '@screen md': {
              fontSize: '1rem', // 16px desktop
            },
          },
        ],
        body2: [
          '0.75rem', // 12px
          {
            lineHeight: '1.5',
            '@screen md': {
              fontSize: '0.875rem', // 14px desktop
            },
          },
        ],
        btn1: [
          '0.875rem', // 14px
          {
            lineHeight: '1.4',
            '@screen md': {
              fontSize: '1rem', // 16px desktop
            },
          },
        ],
        btn2: [
          '0.75rem', // 12px
          {
            lineHeight: '1.4',
            '@screen md': {
              fontSize: '0.875rem', // 14px desktop
            },
          },
        ],
      }
      ,
			fontWeight: {
				medium: "500",
				semibold: "600",
				bold: "700",
			},
		},
	},
	plugins: [],
};
