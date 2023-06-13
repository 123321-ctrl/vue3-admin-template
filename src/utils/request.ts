import axios from 'axios'
import { ElMessage } from 'element-plus'

import useUserStore from '@/store/modules/user'

// 利用axios对象的create方法，创建一个axios实例（其他的配置：基础路径、超时时间）
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //请求时基础路径会携带/api,跨域时不带/api
  timeout: 5000,
})

let request2 = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_DEV,
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  // console.log(config)
  let userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  //   config.headers.token = '123'
  // config配置对象里面有headers请求头，给服务器携带公共参数
  return config
})

request.interceptors.response.use(
  (response: any) => {
    return response.data
  },
  (error: any) => {
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

request2.interceptors.response.use(
  (response: any) => {
    return response.data
  },
  (error: any) => {
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export { request, request2 }
