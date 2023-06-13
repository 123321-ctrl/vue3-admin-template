import { request } from '@/utils/request'
import type {
  loginForm,
  loginResponseData,
  userResponseData,
  logoutResponseData,
} from './type.ts'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

export const reqLogin = (data: loginForm) => {
  // http://sph-api.atguigu.com/admin/acl/index/login
  return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}

export const reqUserInfo = () => {
  return request.get<any, userResponseData>(API.USERINFO_URL)
}

export const reqLogout = () => {
  return request.post<any, logoutResponseData>(API.LOGOUT_URL)
}
