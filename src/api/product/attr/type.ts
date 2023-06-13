export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface Category {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

export interface CategoryResponse extends responseData {
  data: Category[]
}

//属性值对象的ts类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
}

export type attrValueList = AttrValue[]

export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: attrValueList
}

export interface AttrResponseData extends responseData {
  data: Attr[]
}
