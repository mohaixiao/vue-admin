import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/sys'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await login({ username, password })
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
  },
})
