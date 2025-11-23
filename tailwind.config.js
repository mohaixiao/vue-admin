/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 侧边栏相关变量
      colors: {
        menu: {
          text: '#bfcbd9',
          'active-text': '#ffffff',
          'sub-active-text': '#f4f4f5',
          bg: '#304156',
          hover: '#263445',
          'sub-bg': '#1f2d3d',
          'sub-hover': '#001528',
        },
        login: {
          bg: '#2d3a4b',
          'dark-gray': '#889aa4',
          'light-gray': '#eee',
          cursor: '#fff',
        },
      },
      width: {
        sidebar: '210px',
        'sidebar-hide': '54px',
      },
      transitionDuration: {
        sidebar: '0.28s',
      },
      fontFamily: {
        sans: [
          'Helvetica Neue',
          'Helvetica',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
