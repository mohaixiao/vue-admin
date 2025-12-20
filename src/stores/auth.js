import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/sys'
import { removeAllItem } from '@/utils/storage'

export const useAuthStore = defineStore('auth', {
  state: () => {
    // 从 localStorage 初始化 token
    const token = localStorage.getItem('token')
    return {
      token: token || null,
      userInfo: {},
    }
  },
  actions: {
    async login(username, password) {
      try {
        const response = await login({ username, password })
        this.token = response.token
        localStorage.setItem('token', this.token)
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },
    async getUserInfo() {
      const res = await getUserInfo()
      this.userInfo = res
      return res
    },
    logout() {
      // 清理当前用户缓存数据
      this.token = null
      this.userInfo = {}
      // 清理所有 localStorage 数据
      removeAllItem()
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    /**
     * @returns true 表示已存在用户信息
     */
    hasUserInfo: state => {
      return JSON.stringify(state.userInfo) !== '{}'
    },
  },
})
