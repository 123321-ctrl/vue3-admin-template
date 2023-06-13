import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type {
  loginForm,
  loginResponseData,
  userResponseData,
  logoutResponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      username: '',
      avatar: '',
    }
  },
  actions: {
    //async 返回一个promise，而promise的成功还是失败取决于return
    async userLogin(data: loginForm) {
      let res: loginResponseData = await reqLogin(data)
      if (res.code == 200) {
        this.token = res.data as string
        SET_TOKEN(res.data as string)

        return 'OK'
      } else {
        return Promise.reject(new Error(res.data))
      }
    },
    // 获取用户信息
    async userInfo() {
      // 要携带请求头token，使用请求拦截器
      let res: userResponseData = await reqUserInfo()
      if (res.code == 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        return 'ok'
      } else {
        ElMessage({
          type: 'error',
          message: res.message,
        })
        return Promise.reject(new Error(res.message))
      }
    },
    async layout() {
      let res: logoutResponseData = await reqLogout()
      if (res.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
