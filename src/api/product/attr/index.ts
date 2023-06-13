import { request2 } from '@/utils/request'
import type { CategoryResponse, AttrResponseData, Attr } from './type.ts'

enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTRINFO_URL = '/admin/product/attrInfoList/',
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

export const reqC1 = () => {
  return request2.get<any, CategoryResponse>(API.C1_URL)
}

export const reqC2 = (c1: number | string) => {
  return request2.get<any, CategoryResponse>(API.C2_URL + c1)
}
export const reqC3 = (c2: number | string) => {
  return request2.get<any, CategoryResponse>(API.C3_URL + c2)
}

export const reqAttr = (
  c1: number | string,
  c2: number | string,
  c3: number | string,
) => {
  return request2.get<any, AttrResponseData>(
    API.ATTRINFO_URL + `${c1}/${c2}/${c3}`,
  )
}

export const reqAddOrUpdateAttr = (data: Attr) => {
  return request2.post<any, any>(API.ADDORUPDATEATTR_URL, data)
}

// 新增属性需要的字段
// {
//     "attrName": "string",
//     "attrValueList": [
//       {
//         "valueName": "string"
//       }
//     ],
//     "categoryId": 0, 三级分类的ID
//     "categoryLevel": 3,
// }

//修改属性需要的字段
// {
//     "id": 0,
//     "attrName": "string",
//     "attrValueList": [
//       {
//         "attrId": 0,
//         "id": 0,
//         "valueName": "string"
//       }
//     ],
//     "categoryId": 0,
//     "categoryLevel": 3,
// }

export const deleteAttrs = (id: number) => {
  return request2.delete<any, any>(API.DELETEATTR_URL + id)
}
