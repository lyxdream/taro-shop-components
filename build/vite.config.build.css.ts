import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: true, // 压缩
    lib: {
      entry: './dist/styles/themes/default.scss',
      formats: ['es'],
      name: 'style',
      fileName: 'style'
    },
    emptyOutDir: false
  }
})
