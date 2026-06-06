
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fb: {
          primary:   "#1877F2",  
          dark:      "#166FE5",   // hover state
          deeper:    "#0F5DC4",   // active/pressed
          light:     "#E7F3FF",   // soft blue backgrounds
          surface:   "#F0F2F5",   // page background 
          panel:     "#FFFFFF",   // card/panel background
          text:      "#050505",   // primary text
          muted:     "#65676B",   // secondary text
          border:    "#CED0D4",   // dividers & input borders
          accent:    "#42B72A",   // green accent 
        },
      },
      fontFamily: {
        fb: ['"Segoe UI"', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'fb-card': '0 1px 2px rgba(0,0,0,0.1)',
        'fb-hover': '0 2px 8px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
};
