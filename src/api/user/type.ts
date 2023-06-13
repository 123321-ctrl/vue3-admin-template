// 登录接口需要携带的参数ts类型
export interface loginForm {
  username: string
  password: string
}

export interface responseData {
  code: number
  message: string
  ok: boolean
}

// interface dataType {
//   message?: string
//   token?: string
// }

// 登录接口返回的数据类型
export interface loginResponseData extends responseData {
  data: string
}

interface userInfo {
  avatar: string
  name: string
  roles: string[]
  buttons: string[]
  routes: string[]
}

// interface user {
//   checkUser: userInfo
//   message: string
// }

// 服务器返回用户信息相关的数据类型
export interface userResponseData extends responseData {
  data: userInfo
}

export interface logoutResponseData extends responseData {
  data: any
}
