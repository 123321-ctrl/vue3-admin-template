<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <el-icon style="margin-right: 10px" @click="changeIcon">
        <component
          :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"
        ></component>
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in $route.matched"
          :key="item.path"
          :to="item.path"
        >
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar-right">
      <el-button
        size="small"
        icon="Refresh"
        circle
        @click="refresh"
      ></el-button>
      <el-button
        size="small"
        icon="FullScreen"
        circle
        @click="fullScreen"
      ></el-button>

      <el-popover
        placement="bottom"
        title="主题设置"
        :width="300"
        trigger="hover"
      >
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker v-model="color" @change="serColor" />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch
              v-model="isdark"
              active-icon="MoonNight"
              inactive-icon="Sunny"
              @change="changeDark"
            />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button size="small" icon="Setting" circle></el-button>
        </template>
      </el-popover>

      <img :src="userStore.avatar" alt="" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="layout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'

let color = ref('#409EFF')
let isdark = ref(false)
const serColor = () => {
  let el = document.documentElement
  el.style.setProperty('--el-color-primary', color.value)
}

const changeDark = () => {
  let html = document.documentElement
  isdark.value ? (html.className = 'dark') : (html.className = '')
}

// let newRoute = reactive([])
let $route = useRoute()
let $router = useRouter()

let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()

const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}

const refresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const layout = async () => {
  // 1、发请求告诉服务器注销token，本次没有写这个接口
  // 2、清空相关数据
  // 3、路由跳转
  await userStore.layout()
  $router.push({ path: '/login' })
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tabbar-left {
    display: flex;
  }
  .tabbar-right {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin: 0 10px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
