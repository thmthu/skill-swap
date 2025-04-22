import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#AA0000',
        'primary-dark': '#3D0000',
        'primary-medium': '#D14444',
        'primary-light': '#E6A38B',
        'primary-extra-light': '#F5DFCF',
        'secondary-red-pink': '#BB4630',
        'secondary-light-pink': '#F9EEEB',

        'semantic-green': '#699A23',
        'semantic-blue': '#0B66E4',
        'semantic-orange': '#FAA53D',

        'gradient-start': '#893C3E',
        'gradient-mid': '#430D0D',
        'gradient-end': '#1B0705',

        'text-light': '#000000',
        'text-dark': '#FFFFFF',

        'bg-light': '#F9FAFB',
        'bg-popup': '#979797',
        'bg-dark': '#1F1F1F',
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
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
}
