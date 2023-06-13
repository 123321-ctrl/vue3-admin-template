import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'

import router from './router'
import pinia from './store'
import '@/styles/index.scss'

import globalComponent from '@/components'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})

//使用全局组件
app.use(globalComponent)

app.use(router)
app.use(pinia)
app.mount('#app')
