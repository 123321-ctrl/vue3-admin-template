import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { constantRoute } from './routes'
import setting from '@/setting'

// import nprogress from 'nprogress'
// import 'nprogress/nprogress.css'
// nprogress.configure({ showSpinner: false })

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
// router.beforeEach(async (to, from, next) => {
//   console.log('from', from)
//   // 进度条
//   // nprogress.start()
//   // 这里不将用户信息存放在local中，防止信息泄露，而是存放在store中，
//   // 但用户刷新之后数据会丢失，这是再发送请求
//   let username = userStore.username
//   if (userStore.token) {
//     if (username) {
//       next()
//     } else {
//       try {
//         // 会携带token
//         await userStore.userInfo()
//         //注意：刷新的时候是异步路由，有可能收到了用户信息，但异步路由还没有加载完成，出现了恐怖效果
//         next({ ...to })
//       } catch (error) {
//         // 用户修改token，token不匹配
//         // 或token过期，token不匹配
//         // 退出登录，将信息清空
//         await userStore.layout()
//         next({ path: '/login' })
//       }
//     }
//   } else {
//     // 未登录
//     if (to.path == '/login') {
//       next()
//     } else {
//       ElMessage.error('请登录')
//       next({ path: '/login' })
//     }
//   }
// })

// 全局后置守卫
router.afterEach((to, from) => {
  console.log('from', from)
  document.title = `${setting.title} - ${to.meta.title}`
  // nprogress.done()
})

export default router
