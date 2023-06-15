<template>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <el-tree
        ref="tree"
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="SelectLevel4"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqAllPermission, reqSetPermission } from '@/api/acl/role/index'
import { MenuList } from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'

const drawer = ref(false)
const tree = ref<any>()

const defaultProps = {
  children: 'children',
  label: 'name',
}
const data = ref<MenuList>([])
let SelectLevel4 = ref<number[]>([])
let RoleId = ref<number>(0)

const getAllPermission = async (roleId: number) => {
  RoleId.value = roleId
  let res = await reqAllPermission(roleId)
  if (res.code == 200) {
    data.value = res.data
    SelectLevel4.value = filterSelectArr(data.value, [])
  }
}

const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}

const cancel = () => {
  drawer.value = false
}

const submit = async () => {
  drawer.value = false
  let arr = tree.value.getCheckedKeys()
  let arr1 = tree.value.getHalfCheckedKeys()
  console.log(arr, arr1)
  let permissionId = arr.concat(arr1)
  let res = await reqSetPermission(RoleId.value, permissionId)
  if (res.code == 200) {
    drawer.value = false
    ElMessage.success('成功')
    window.location.reload()
  } else {
    ElMessage.error('失败')
  }
}

defineExpose({ drawer, getAllPermission })
</script>

<style scoped lang="scss"></style>
