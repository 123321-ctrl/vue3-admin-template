export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface user {
  id?: number | string
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: null
  roleName?: string
}

export type Records = user[]

export interface AllUserRes extends responseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

export interface Role {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

export type assignRoles = Role[]
export type allRolesList = Role[]

export interface userRoleRes extends responseData {
  data: {
    assignRoles: assignRoles
    allRolesList: allRolesList
  }
}

export interface updateRole {
  roleIdList: number[]
  userId: number
}
