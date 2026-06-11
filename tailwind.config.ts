import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7B9FFF',
          light: '#A78BFA',
          dark: '#5B7FE8',
        },
        surface: '#FFFFFF',
        accent: {
          blue: '#7B9FFF',
          purple: '#A78BFA',
          pink: '#F472B6',
          orange: '#FF9500',
        },
        bg: {
          start: '#EEF2FF',
          end: '#F8F0FF',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        btn: '14px',
      },
      backgroundImage: {
        'app-gradient': 'linear-gradient(135deg, #EEF2FF 0%, #F5F0FF 50%, #FDF2F8 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
