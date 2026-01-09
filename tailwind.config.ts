import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Parisian Nude Palette - Elegant Beige/Cream Theme
        parisian: {
          beige: {
            50: '#FAF7F4',    // Lightest beige (almost white)
            100: '#F3E5D8',   // Powder beige (primary)
            200: '#E6D0B3',   // Warm beige
            300: '#D9BB8E',   // Medium beige
            400: '#CCA669',   // Darker beige
            500: '#BF9144',   // Deep beige/tan
            600: '#997436',   // Brown-beige
            700: '#735728',   // Dark tan
            800: '#4D3A1B',   // Deep brown
            900: '#261D0D',   // Almost black brown
          },
          cream: {
            50: '#FFFEFB',    // Pure white with warmth
            100: '#FFF9F0',   // Soft cream
            200: '#FFF3E1',   // Cream
            300: '#FFEDD2',   // Light cream
          },
          grey: {
            50: '#F9F9F9',    // Almost white
            100: '#EFEFEF',   // Light grey
            200: '#E0E0E0',   // Medium light grey
            300: '#CCCCCC',   // Medium grey
            400: '#999999',   // Grey
            500: '#666666',   // Dark grey
            600: '#4D4D4D',   // Darker grey
            700: '#333333',   // Text grey (primary text)
            800: '#1A1A1A',   // Almost black
            900: '#0D0D0D',   // Pure black
          },
        },
        // Legacy French Tricolor (keeping for backwards compatibility)
        french: {
          blue: {
            50: '#E6EEF9',
            100: '#CCDdf3',
            200: '#99BBE7',
            300: '#6699DB',
            400: '#3377CF',
            500: '#002395',
            600: '#001C77',
            700: '#001559',
            800: '#000E3B',
            900: '#00071E',
          },
          red: {
            50: '#FEF2F2',
            100: '#FEE2E2',
            200: '#FDC5C5',
            300: '#FCA8A8',
            400: '#FB8B8B',
            500: '#ED2939',
            600: '#BE212E',
            700: '#8E1922',
            800: '#5F1117',
            900: '#2F080B',
          },
        },
        // Neutral grays
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
