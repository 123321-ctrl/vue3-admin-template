import { request } from '@/utils/request'
import type { AllUserRes, user, userRoleRes, updateRole } from './type.ts'

enum API {
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  //根据用户获取角色数据
  USERROLE_URL = '/admin/acl/user/toAssign/',
  //   根据用户分配角色
  UPDATEUSERROLE_URL = '/admin/acl/user/doAssignRole',
  //删除管理用户
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 批量删除用户
  DELETEUSERLIST_URL = '/admin/acl/user/batchRemove',
}

export const reqUserInfo = (
  page: number,
  limit: number,
  searchName: string,
) => {
  return request.get<any, AllUserRes>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${searchName}`,
  )
}

export const addOrUpdateUser = (data: user) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}

export const reqUserRole = (adminId: number) => {
  return request.get<any, userRoleRes>(API.USERROLE_URL + adminId)
}

export const updateUserRole = (data: updateRole) => {
  return request.post<any, any>(API.UPDATEUSERROLE_URL, data)
}

export const deleterUser = (userId: number) => {
  return request.delete<any, any>(API.DELETEUSER_URL + userId)
}

export const deleterUserList = (idList: number[]) => {
  return request.delete<any, any>(API.DELETEUSERLIST_URL, { data: idList })
}
