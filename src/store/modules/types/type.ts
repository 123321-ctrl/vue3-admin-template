export interface UserState {
  token: string | null
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
