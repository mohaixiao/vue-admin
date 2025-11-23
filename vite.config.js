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
    port: 5173,
    host: true,
    proxy: {
      // 匹配所有以 /api 开头的请求
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club',
        changeOrigin: true, // 必须设置为true，否则会请求到代理服务器
        secure: true, // 如果是 https 接口，需要配置这个参数
        // 先尝试不重写路径，保持 /api 前缀
        // 如果后端路径是 /api/sys/login，则不需要 rewrite
        // 如果后端路径是 /sys/login，则需要取消注释下面的 rewrite
        // rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
