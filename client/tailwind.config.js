/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fb: {
          primary:  "#1877F2",
          dark:     "#166FE5",
          deeper:   "#0F5DC4",
          light:    "#E7F3FF",
          surface:  "#F0F2F5",
          panel:    "#FFFFFF",
          text:     "#050505",
          muted:    "#65676B",
          border:   "#CED0D4",
          accent:   "#42B72A",
          accentDk: "#36A420",
          danger:   "#E41E3F",
        },
      },
      fontFamily: {
        fb: ['"Segoe UI"', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'fb-card':  '0 1px 2px rgba(0,0,0,0.10)',
        'fb-hover': '0 2px 12px rgba(0,0,0,0.14)',
        'fb-modal': '0 8px 40px rgba(0,0,0,0.20)',
      },
    },
  },
  plugins: [],
};
