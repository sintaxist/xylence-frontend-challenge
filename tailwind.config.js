/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        appBg: 'var(--color-bg-app)',
        cardBg: 'var(--color-bg-card)',
        accent: 'var(--color-accent)',
        textMain: 'var(--color-text-main)',
        textSecondary: 'var(--color-text-secondary)',
        cardBorder: 'var(--color-border)',
        trendUp: 'var(--color-trend-up)',
        trendDown: 'var(--color-trend-down)',
        trendNeutral: 'var(--color-trend-neutral)',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 20px 40px -10px rgba(205, 242, 88, 0.5)',
      },
      borderRadius: {
        'card': 'var(--radius-card)',
      }
    },
  },
  plugins: [],
}