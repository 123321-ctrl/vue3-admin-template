<template>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ drawerTitle }}</h4>
    </template>
    <template #default>
      <el-form :model="userParams" status-icon :rules="rules" ref="ruleFormRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            placeholder="请输入用户昵称"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
          <el-input
            type="password"
            placeholder="请输入用户密码"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

import { addOrUpdateUser } from '@/api/acl/user'
import { user } from '@/api/acl/user/type'

defineProps(['drawerTitle'])

const drawer = ref(false)

const ruleFormRef = ref<FormInstance>()
let userParams = reactive<user>({
  username: '',
  name: '',
  password: '',
})

const validateUsername = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('至少5位'))
  }
}

const validatePass = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('至少6位'))
  }
}

const rules = reactive<FormRules>({
  username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
  name: [{ required: true, validator: validateUsername, trigger: 'blur' }],
  password: [{ required: true, validator: validatePass, trigger: 'blur' }],
})

const init = () => {
  ruleFormRef.value?.resetFields()
  Object.assign(userParams, {
    id: '',
    username: '',
    name: '',
    password: '',
  })
}

const updateUser = async (row: user) => {
  Object.assign(userParams, row)
  ruleFormRef.value?.clearValidate()
}

function cancelClick() {
  drawer.value = false
}

async function confirmClick() {
  await ruleFormRef.value?.validate()

  ElMessageBox.confirm(`你确定保存吗？`).then(async () => {
    let res: any = await addOrUpdateUser(userParams)
    if (res.code == 200) {
      drawer.value = false
      ElMessage.success('保存成功')
      //   emit('update')
      window.location.reload()
    } else {
      ElMessage.error('保存失败')
    }
  })
}

defineExpose({ drawer, init, updateUser })
</script>

<style scoped lang="scss"></style>
