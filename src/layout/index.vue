<template>
  <div class="common-layout">
    <el-container>
      <el-aside :class="{ fold: layoutSettingStore.fold ? true : false }">
        <Logo></Logo>
        <el-menu
          active-text-color="#ffd04b"
          text-color="#fff"
          :router="true"
          collapse-transition
          background-color="#001529"
          :default-active="$route.path"
          :collapse="layoutSettingStore.fold ? true : false"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <Tabbar></Tabbar>
        </el-header>
        <el-main>
          <!-- 过渡动效 -->
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" v-if="flag" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'

import Logo from '@/components/logo/index.vue'
import Menu from '@/components/menu/index.vue'
import Tabbar from '@/components/tabbar/index.vue'

// import { constantRoute } from '@/router/routes'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()

import useLayoutSettingStore from '@/store/modules/setting'

let layoutSettingStore = useLayoutSettingStore()
let $route = useRoute()

let flag = ref(true)
watch(
  () => layoutSettingStore.refresh,
  () => {
    //nextTick:当数据发生变化时，可以获取到更新后的dom
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
  ::v-deep .el-container {
    height: 100%;
    .el-aside {
      width: $base-menu-width;
      background: $base-menu-background;
      transition: all 0.3s;
      .el-menu {
        background: none;
      }
    }
    .fold {
      width: $base-menu-min-width;
      overflow: hidden;
    }
  }
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
