import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.name === 'login' && authStore.isLoggedIn) {
    // 如果用户已经登录，尝试访问登录页面，则重定向到首页
    next({ name: 'home' })
  } else if (to.name !== 'login' && !authStore.isLoggedIn) {
    // 如果用户未登录，尝试访问非登录页面，则重定向到登录页面
    next({ name: 'login' })
  } else {
    // 判断用户资料是否获取
    // 若不存在用户信息，则需要获取用户信息
    if (to.name !== 'login' && !authStore.hasUserInfo) {
      // 触发获取用户信息的 action
      await authStore.getUserInfo()
    }
    next()
  }
})

export default router
