/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/pages/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          light: '#FFD6EC',
          DEFAULT: '#FF69B4',
          dark: '#C2185B',
        },
        gold: {
          light: '#FFF7D6',
          DEFAULT: '#FFD700',
          dark: '#BFA100',
        },
        black: {
          DEFAULT: '#18181B',
        },
        cream: {
          DEFAULT: '#FFF9F3',
        },
      },
      borderRadius: {
        'lg': '1.25rem',
        'xl': '2rem',
        '3xl': '2.5rem',
        '4xl': '3rem',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      backgroundImage: {
        'gradient-pink-gold': 'linear-gradient(135deg, #FFD6EC 0%, #FFD700 100%)',
        'gradient-black-cream': 'linear-gradient(135deg, #18181B 0%, #FFF9F3 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
