import { request } from '@/utils/request'
import type { PermissionResData, MenuParams } from './type.ts'

enum API {
  ALLPERMISSSION_URL = '/admin/acl/permission',
  ADDPERMISSION_URL = '/admin/acl/permission/save',
  UPDATEPERMISSION_URL = '/admin/acl/permission/update',
  DELPERMISSSION_URL = '/admin/acl/permission/remove/',
}

export const reqALLPermission = () => {
  return request.get<any, PermissionResData>(API.ALLPERMISSSION_URL)
}

export const addOrUpdatePermission = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEPERMISSION_URL, data)
  } else {
    return request.post<any, any>(API.ADDPERMISSION_URL, data)
  }
}

export const delPermission = (id: number) => {
  return request.delete<any, any>(API.DELPERMISSSION_URL + id)
}
