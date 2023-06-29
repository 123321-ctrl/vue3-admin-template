import type { RouteRecordRaw } from 'vue-router'

export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

export interface categoryForm {
  category1: string
  category2: string
  category3: string
}

export interface categoryObj {
  categoryForm: categoryForm | null
}
