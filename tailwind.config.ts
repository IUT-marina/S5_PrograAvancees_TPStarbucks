import type { Config } from 'tailwindcss'

const {stGreen} = require('tp-kit/tailwind/colors')
const {gray} = require('tailwindcss/colors');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './tp-kit/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Use for default text color
        default: gray[800],
        green: stGreen,
        brand: stGreen,
        coffee : {
          DEFAULT: "#463F3A",
          50: "#fcf9f4",
          100: "#e6e2de",
          200: "#bab6b3",
          300: "#D7BDA2",
          400: "#9c9a98",
          500: "#B68554",
          600: "#73675F",
          700: "#5C534C",
          800: "#463F3A",
          900: "#272321",
          950: "#181614",
        },
        vertsb: "#002F16",
        cream: "#FCF9F4"
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
