export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface trademark {
  id?: number
  tmName: string
  logoUrl: string
}

export type Records = trademark[]

export interface responseTrademark extends responseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
