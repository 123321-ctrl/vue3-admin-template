export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuSaleAttrList: null | SaleAttr[]
  spuImageList: null | SpuImage[]
}

export type Records = SpuData[]

export interface SPUResponseData extends responseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

export interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}

export interface AllTradeMark extends responseData {
  data: TradeMark[]
}

export interface SpuImage {
  id?: number
  createIime?: string
  updateTime?: string
  spuId?: number
  imgName: string
  imgUrl: string
}

export interface SpuHasImage extends responseData {
  data: SpuImage[]
}

export interface SaleAttrValue {
  id?: number
  createIime?: string | null
  updateTime?: string | null
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}

export type spuSaleAttrValueList = SaleAttrValue[]

export interface SaleAttr {
  id?: number
  createIime?: string | null
  updateTime?: string | null
  spuId?: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: spuSaleAttrValueList
}

export interface SaleAttrRes extends responseData {
  data: SaleAttr[]
}

export interface HasSaleAttr {
  id: number
  name: string
}

export interface HasSaleAttrRes extends responseData {
  data: HasSaleAttr[]
}
