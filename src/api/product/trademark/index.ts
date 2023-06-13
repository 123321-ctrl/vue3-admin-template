import { request2 } from '@/utils/request'
import type { responseTrademark, trademark } from './type.ts'
// import axios from 'axios'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

export const reqTrademark = (page: number, limit: number) => {
  return request2.get<any, responseTrademark>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
}

export const addOrUpdateTrademark = (data: trademark) => {
  // 修改品牌
  if (data.id) {
    return request2.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    //新增品牌
    return request2.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

export const deleteTrademark = (id: number) => {
  return request2.delete<any, any>(API.DELETETRADEMARK_URL + id)
}
