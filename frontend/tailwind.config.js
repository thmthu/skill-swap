const tailwindcssConfig = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}", // Adjust paths to your project files
	],
	theme: {
		extend: {
      colors: {
        primary: '#AA0000',
        primaryVariant: {
          dark: '#3D0000',
          medium: '#D14444',
          light: '#E6A38B',
          extraLight: '#F5DFCF',
        },
        secondary: {
          redPink: '#BB4630',
          lightPink: '#F9EEEB',
        },
        semantic: {
          green: '#699A23',
          blue: '#0B66E4',
          orange: '#FAA53D',
        },
        gradient: {
          start: '#893C3E',
          mid: '#430D0D',
          end: '#1B0705',
        },
        text: {
          light: '#000000',
          dark: '#FFFFFF',
        },
        background: {
          light: '#F9FAFB',
          popup: '#979797',
          dark: '#1F1F1F',
        },
      },
      fontFamily: {
        heading: ['Poppins', ...defaultTheme.fontFamily.sans],
        body: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        display: ['3rem', { lineHeight: '1.2' }],         // 48px
        h1: ['2rem', { lineHeight: '1.25' }],             // 32px
        h2: ['1.75rem', { lineHeight: '1.3' }],           // 28px
        h3: ['1.125rem', { lineHeight: '1.4' }],          // 18px
        subtitle1: ['1rem', { lineHeight: '1.5' }],       // 16px
        subtitle2: ['0.875rem', { lineHeight: '1.4' }],   // 14px
        body1: ['1rem', { lineHeight: '1.6' }],           // 16px
        body2: ['0.875rem', { lineHeight: '1.5' }],       // 14px
        btn1: ['1rem', { lineHeight: '1.4' }],            // 16px
        btn2: ['0.875rem', { lineHeight: '1.4' }],        // 14px
      },
      fontWeight: {
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
	},
	plugins: [],
};

export default tailwindcssConfig;
