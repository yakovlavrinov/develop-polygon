import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') }
    ]
  },
  plugins: [react(), alias()],
 
})
