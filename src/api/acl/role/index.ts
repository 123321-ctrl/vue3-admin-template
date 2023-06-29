import { request } from '@/utils/request'
import type { allRoleRes, Role, MenuResData } from './type.ts'

enum API {
  ALLROLE_URL = '/admin/acl/role/',
  ADDROLE_URL = '/admin/acl/role/save',
  UPDATEROLE_URL = '/admin/acl/role/update',
  // 根据角色获取菜单
  ALLPERMISSSION_URL = '/admin/acl/permission/toAssign/',
  // 给角色分配权限
  SETPERMISSSION_URL = '/admin/acl/permission/doAssign',
  DELETEROLE_URL = '/admin/acl/role/remove/',
}

export const reqRoleInfo = (page: number, limit: number, role: string) => {
  return request.get<any, allRoleRes>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${role}`,
  )
}

export const addOrUpdateRole = (data: Role) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}

export const reqAllPermission = (roleId: number) => {
  return request.get<any, MenuResData>(API.ALLPERMISSSION_URL + roleId)
}

export const reqSetPermission = (roleId: number, permissionId: number[]) => {
  return request.post<any, any>(
    API.SETPERMISSSION_URL + `?roleId=${roleId}&permissionId=${permissionId}`,
  )
}

export const reqDeleteRole = (roleId: number) => {
  return request.delete<any, any>(API.DELETEROLE_URL + roleId)
}
