// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Keep the React plugin
import tailwindcss from '@tailwindcss/vite' // Import the Tailwind plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),          // Keep the React plugin
    tailwindcss(),    // Add the Tailwind plugin here
  ],
})