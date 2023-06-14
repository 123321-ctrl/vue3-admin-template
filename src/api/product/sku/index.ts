import { request2, request3 } from '@/utils/request'
import type { SKUResponseData } from './type.ts'

enum API {
  SKU_URL = '/admin/product/list/',
  SALE_URL = '/admin/product/onSale/',
  CANCELSALE_URL = '/admin/product/cancelSale/',
}

export const reqSku = (page: number, limit: number) => {
  return request2.get<any, SKUResponseData>(API.SKU_URL + `${page}/${limit}`)
}

export const reqSaleSku = (skuId: number) => {
  return request3.get<any, any>(API.SALE_URL + skuId)
}

export const reqCancelSaleSku = (skuId: number) => {
  return request3.get<any, any>(API.CANCELSALE_URL + skuId)
}
