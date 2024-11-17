import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 注意这里的更改
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(config => {
  config.headers.icode = `helloqianduanxunlianying`
  return config
})

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
    // TODO: 将来处理 token 超时问题
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  },
)

export default service
