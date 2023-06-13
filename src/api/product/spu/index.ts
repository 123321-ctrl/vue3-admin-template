import { request2 } from '@/utils/request'
import type {
  SPUResponseData,
  AllTradeMark,
  SpuHasImage,
  SaleAttrRes,
  HasSaleAttrRes,
  SpuData,
} from './type.ts'

enum API {
  SPU_URL = '/admin/product/',
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  IMAGR_URL = '/admin/product/spuImageList/',
  SPUSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
}

export const reqSpu = (
  page: number,
  limit: number,
  category3Id: number | string | undefined,
) => {
  return request2.get<any, SPUResponseData>(
    API.SPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
}

export const reqAllTrademark = () => {
  return request2.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
}

export const reqSpuImageList = (spuId: number) => {
  return request2.get<any, SpuHasImage>(API.IMAGR_URL + spuId)
}

export const reqSpuSaleAttr = (spuId: number) => {
  return request2.get<any, SaleAttrRes>(API.SPUSALEATTR_URL + spuId)
}

export const reqAllSaleAttr = () => {
  return request2.get<any, HasSaleAttrRes>(API.ALLSALEATTR_URL)
}

// 添加或修改spu
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request2.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request2.post<any, any>(API.ADDSPU_URL, data)
  }
}
