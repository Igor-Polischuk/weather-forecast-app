import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@modules', replacement: path.resolve(__dirname, 'src/modules') },
      { find: '@graphql', replacement: path.resolve(__dirname, 'src/graphql') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@UI', replacement: path.resolve(__dirname, 'src/UI') },
    ]
  }
})
