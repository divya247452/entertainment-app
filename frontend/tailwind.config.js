/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // This line specifies where Tailwind should look for class names
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': '#FC4747', 
        'custom-dark-blue': '#10141E', 
        'custom-light-blue':'#5A698F',
        'gun-metal': '#161D2F'
      },
    },
  },
  plugins: [],
}
