import { defineStore } from 'pinia'

import type { categoryForm, categoryObj } from './types/type'

let useCategoryStore = defineStore('categoryStore', {
  state: (): categoryObj => {
    return {
      categoryForm: null,
    }
  },
  actions: {
    changeForm(val: categoryForm) {
      this.categoryForm = val
    },
  },
  getters: {},
})

export default useCategoryStore
