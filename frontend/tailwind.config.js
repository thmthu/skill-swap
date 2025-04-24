import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
				display: ["2rem", { lineHeight: "1.2" }], // Mobile: 32px
				h1: ["1.5rem", { lineHeight: "1.25" }], // Mobile: 24px
				h2: ["1.25rem", { lineHeight: "1.3" }], // Mobile: 20px
				h3: ["1.125rem", { lineHeight: "1.4" }], // Mobile: 18px
				subtitle1: ["1rem", { lineHeight: "1.5" }], // Mobile: 16px
				subtitle2: ["0.875rem", { lineHeight: "1.4" }], // Mobile: 14px
				body1: ["0.875rem", { lineHeight: "1.6" }], // Mobile: 14px
				body2: ["0.75rem", { lineHeight: "1.5" }], // Mobile: 12px
				btn1: ["0.875rem", { lineHeight: "1.4" }], // Mobile: 14px
				btn2: ["0.75rem", { lineHeight: "1.4" }], // Mobile: 12px

				// Desktop overrides
				"md:display": ["2rem", { lineHeight: "1.2" }], // Desktop: 32px
				"md:h1": ["1.5rem", { lineHeight: "1.25" }], // Desktop: 24px
				"md:h2": ["1.25rem", { lineHeight: "1.3" }], // Desktop: 20px
				"md:h3": ["1.125rem", { lineHeight: "1.4" }], // Desktop: 18px
				"md:subtitle1": ["1rem", { lineHeight: "1.5" }], // Desktop: 16px
				"md:subtitle2": ["0.875rem", { lineHeight: "1.4" }], // Desktop: 14px
				"md:body1": ["0.875rem", { lineHeight: "1.6" }], // Desktop: 14px
				"md:body2": ["0.75rem", { lineHeight: "1.5" }], // Desktop: 12px
				"md:btn1": ["0.875rem", { lineHeight: "1.4" }], // Desktop: 14px
				"md:btn2": ["0.75rem", { lineHeight: "1.4" }], // Desktop: 12px
			},
			fontWeight: {
				medium: "500",
				semibold: "600",
				bold: "700",
			},
		},
	},
	plugins: [],
};
