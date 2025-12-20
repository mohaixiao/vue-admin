import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { isCheckTimeout } from '@/utils/auth'
import router from '@/router'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 注意这里的更改
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers.icode = `helloqianduanxunlianying`
    // 在这个位置需要统一的去注入token
    const authStore = useAuthStore()
    if (authStore.token) {
      // 检查 token 是否超时
      if (isCheckTimeout()) {
        // 登出操作
        authStore.logout()
        router.push('/login')
        return Promise.reject(new Error('token 失效'))
      }
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      const authStore = useAuthStore()
      authStore.logout()
      router.push('/login')
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  },
)

export default service
