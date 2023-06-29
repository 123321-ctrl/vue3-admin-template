<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" />
      <div>
        <h3>{{ `${getTime()}好！${userStore.username}` }}</h3>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { getTime } from '@/utils/time'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
