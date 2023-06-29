<template>
  <el-table
    :data="tableData"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
  >
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="code" label="权限值" />
    <el-table-column prop="updateTime" label="修改时间" />
    <el-table-column prop="address" label="操作">
      <template v-slot="{ row }">
        <el-button
          type="primary"
          size="small"
          icon="User"
          :disabled="row.level == 4 ? true : false"
          @click="addPermission(row)"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="Edit"
          :disabled="row.level == 1 ? true : false"
          @click="updatePermission(row)"
        >
          编辑
        </el-button>
        <el-popconfirm
          :title="`你确定要删除${row.name}吗？`"
          width="250px"
          icon="Delete"
          @confirm="deletePermission(row.id)"
        >
          <template #reference>
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              :disabled="row.level == 1 ? true : false"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogFormVisible" title="Tips" width="40%">
    <el-form :model="form" label-width="60px">
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="权限值">
        <el-input v-model="form.code" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import {
  reqALLPermission,
  addOrUpdatePermission,
  delPermission,
} from '@/api/acl/permission/index'
import {
  PermissionList,
  MenuParams,
  PermissionData,
} from '@/api/acl/permission/type'

let tableData = ref<PermissionList>([])

const dialogFormVisible = ref(false)
const form = reactive<MenuParams>({
  id: 0,
  code: '',
  level: 0,
  name: '',
  pid: 0,
})

const addPermission = (row: PermissionData) => {
  Object.assign(form, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  dialogFormVisible.value = true
  form.level = row.level + 1
  form.pid = row.id
}

const updatePermission = (row: PermissionData) => {
  dialogFormVisible.value = true
  Object.assign(form, row)
}

const save = async () => {
  let res = await addOrUpdatePermission(form)
  if (res.code == 200) {
    ElMessage.success('保存成功')
    dialogFormVisible.value = false
    getAllPermission()
  } else {
    ElMessage.error('保存失败')
  }
}

const deletePermission = async (id: number) => {
  let res = await delPermission(id)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getAllPermission()
  } else {
    ElMessage.error('删除失败')
  }
}

const getAllPermission = async () => {
  let res = await reqALLPermission()
  if (res.code == 200) {
    tableData.value = res.data
  }
}

onMounted(() => {
  getAllPermission()
})
</script>

<style scoped lang="scss"></style>
