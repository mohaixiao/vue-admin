import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'), // 假设您的源代码在 src 目录
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'parens-division',
      },
      scss: {
        api: 'modern-compiler', // 或 "modern"，"legacy"
        importers: [
          // ...
        ],
      },
    },
  },
  server: {
    proxy: {
      // 匹配所有以 /api 开头的请求
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/', // 你的后端服务地址
        changeOrigin: true, // 必须设置为true，否则会请求到代理服务器
        rewrite: path => path.replace(/^\/api/, ''), // 重写路径，去掉路径中的 /api
      },
    },
  },
})
