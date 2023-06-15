<template>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配用户角色</h4>
    </template>
    <template #default>
      <el-form :model="roleParams">
        <el-form-item label="用户姓名">
          <el-input v-model="roleParams.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group v-model="userRole" @change="handleCheckedChange">
            <el-checkbox v-for="role in roles" :key="role.id" :label="role">
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button>取消</el-button>
        <el-button type="primary" @click="updateRole">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

import { reqUserRole, updateUserRole } from '@/api/acl/user/index'
import { userRoleRes, Role, user, updateRole } from '@/api/acl/user/type'

const emit = defineEmits(['getAllUser'])

const checkAll = ref(false)
const isIndeterminate = ref(true)
const userRole = ref<Role[]>([])
const roles = ref<Role[]>([])

const drawer = ref(false)
const roleParams = reactive<user>({})

const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? roles.value : []
  isIndeterminate.value = false
}
const handleCheckedChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === roles.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < roles.value.length
}

const getUserInfo = async (row: user) => {
  Object.assign(roleParams, row)
  let res: userRoleRes = await reqUserRole(row.id as number)
  if (res.code == 200) {
    roles.value = res.data.allRolesList
    userRole.value = res.data.assignRoles
  }
}

const updateRole = async () => {
  let data: updateRole = {
    userId: roleParams.id as number,
    roleIdList: userRole.value.map((item) => item.id) as number[],
  }
  let res = await updateUserRole(data)
  console.log('res', res)
  if (res.code == 200) {
    ElMessage.success('分配职务成功')
    drawer.value = false
    emit('getAllUser')
  }
}

defineExpose({ drawer, getUserInfo })
</script>

<style scoped lang="scss"></style>
