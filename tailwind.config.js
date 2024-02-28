/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          
          "primary": "#0000ff",
                   
          "secondary": "#009df8",
                   
          "accent": "#0066ff",
                   
          "neutral": "#000c03",
                   
          "base-100": "#fffbf6",
                   
          "info": "#00c3ff",
                   
          "success": "#009864",
                   
          "warning": "#e07f00",
                   
          "error": "#b6143a",
                   },
      },
    ],
  },
  plugins: [require("daisyui")],
};
