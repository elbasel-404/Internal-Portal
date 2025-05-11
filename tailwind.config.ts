// TODO: maintenance
import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  safelist: [
    'w-[48vw]',
    'pr-[344px]',
    'pr-[135px]',
    'animate-in',
    'animate-out',
    'fade-in-0',
    'fade-out-0',
    'duration-500',
    'slide-in-from-bottom-full',
    'slide-out-to-bottom-full',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './api/error/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/server/api/test/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        blue: {
          50: 'hsl(var(--blue-50))',
          100: 'hsl(var(--blue-100))',
          200: 'hsl(var(--blue-200))',
          300: 'hsl(var(--blue-300))',
          400: 'hsl(var(--blue-400))',
          500: 'hsl(var(--blue-500))',
          600: 'hsl(var(--blue-600))',
          700: 'hsl(var(--blue-700))',
          800: 'hsl(var(--blue-800))',
          950: 'hsl(var(--blue-950))',
        },
        grey: {
          muted: 'hsl(var(--grey-muted))',
          50: 'hsl(var(--grey-50))',
          100: 'hsl(var(--grey-100))',
          200: 'hsl(var(--grey-200))',
          300: 'hsl(var(--grey-300))',
          400: 'hsl(var(--grey-400))',
          500: 'hsl(var(--grey-500))',
          600: 'hsl(var(--grey-600))',
          700: 'hsl(var(--grey-700))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          opacity: 'hsl(var(--primary-opacity))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          opacity: 'hsl(var(--destructive-opacity))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'hsl(var(--danger-foreground))',
          500: 'hsl(var(--danger-500))',
        },
        light: {
          DEFAULT: 'hsl(var(--light))',
        },
        shadowBlue: {
          DEFAULT: 'hsl(var(--shadow-blue))',
        },
        cloudGray: {
          DEFAULT: 'hsl(var(--cloud-gray))',
        },
        lightGray: {
          DEFAULT: 'hsl(var(--light-gray))',
        },
        oceanBlue: {
          DEFAULT: 'hsl(var(--ocean-blue))',
          opacity: 'hsl(var(--ocean-blue-opacity))',
        },
        stormGray: {
          DEFAULT: 'hsl(var(--storm-gray))',
        },
        darkBlue: {
          DEFAULT: 'hsl(var(--dark-blue))',
        },
        lightGrayish: {
          DEFAULT: 'hsl(var(--light-grayish))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        base: '14px',
      },
      screens: {
        xs: '376px',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
    tailwindAnimate,
    plugin(function ({ matchVariant }) {
      matchVariant(
        'nth',
        (value) => {
          return `&:nth-child(${value})`;
        },
        {
          // values: {
          //   1: '1',
          //   2: '2',
          //   3: '3',
          // },
        }
      );
    }),
  ],
};
export default config;
