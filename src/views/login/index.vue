<template>
  <div class="login_container">
    <el-form
      class="login_form"
      :model="loginForm"
      :rules="rules"
      ref="loginForms"
    >
      <h1>Hello！</h1>
      <h2>欢迎来到我的后台管理模板</h2>
      <el-form-item prop="username">
        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          :prefix-icon="Lock"
          v-model="loginForm.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          size="default"
          @click="login"
          class="btn"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { reactive, ref } from 'vue'

import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'

import { getTime } from '@/utils/time'

let $router = useRouter()
let useStore = useUserStore()

let loginForms = ref()
let loading = ref(false)
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })

const validateName = (_rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('长度至少5位'))
  }
}

const validatePass = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('长度至少6位'))
  }
}

const rules = reactive({
  username: [{ validator: validateName, trigger: 'change' }],
  password: [{ validator: validatePass, trigger: 'change' }],
})

const login = async () => {
  // 保证表单验证通过
  await loginForms.value.validate()

  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `hi,${getTime()}好`,
    })
  } catch (error) {
    console.log('error', error)
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/22091Q63645F45-0-lp.jpg') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  .login_form {
    width: 30%;
    position: absolute;
    top: 195px;
    padding: 26px;
    background-color: aliceblue;
    border-radius: 12px;
    h1,
    h2 {
      text-align: center;
    }
    h2 {
      margin: 10px 0;
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
