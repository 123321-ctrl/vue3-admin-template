import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,
      refresh: false,
    }
  },
  actions: {},
  getters: {},
})

export default useLayoutSettingStore
