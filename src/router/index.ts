import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
import setting from '@/setting'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })

import pinia from '@/store/index'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)

let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 进度条
  nprogress.start()
  // 这里不将用户信息存放在local中，防止信息泄露，而是存放在store中，
  // 但用户刷新之后数据会丢失，这是再发送请求
  let username = userStore.username
  if (userStore.token) {
    if (username) {
      next()
    } else {
      try {
        // 会携带token
        await userStore.userInfo()
        next()
      } catch (error) {
        // 用户修改token，token不匹配
        // 或token过期，token不匹配
        // 退出登录，将信息清空
        await userStore.layout()
        next({ path: '/login' })
      }
    }
  } else {
    // 未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.done()
})

export default router
