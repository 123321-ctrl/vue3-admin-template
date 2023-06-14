<template>
  <div>
    <el-card class="box-card">
      <el-button
        class="btn"
        type="primary"
        size="default"
        icon="Plus"
        @click="addTrademark"
      >
        添加品牌
      </el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="tmName" label="品牌名称" width="180" />
        <el-table-column label="品牌LOGO">
          <template v-slot="{ row }">
            <img
              :src="row.logoUrl"
              alt=""
              style="width: 150px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>
            <el-popconfirm
              :title="`你确定要删除${row.tmName}吗？`"
              width="250px"
              icon="Delete"
              @confirm="deleteTrademarks(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :background="background"
        :total="total"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :pageSizes="pageSizes"
        @handleSizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
      ></Pagination>
    </el-card>

    <el-dialog
      v-model="dialogFormVisible"
      :title="form.id ? '修改品牌' : '新增品牌'"
    >
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="tmName"
        >
          <el-input
            placeholder="请输入品牌名称"
            v-model="form.tmName"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <!-- action：图片上传路径的接口 -->
          <el-upload
            class="avatar-uploader"
            action="/a/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import Pagination from '@/components/Pagination/index.vue'
import { ElMessage } from 'element-plus'
import {
  reqTrademark,
  addOrUpdateTrademark,
  deleteTrademark,
} from '@/api/product/trademark/index'
import {
  Records,
  responseTrademark,
  trademark,
} from '@/api/product/trademark/type'
import type { UploadProps, FormRules } from 'element-plus'

let tableData = ref<Records>([])
let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let background = ref(true)
let total = ref<number>(0)
let pageSizes = [3, 5, 7, 9]

const dialogFormVisible = ref<boolean>(false)
const formLabelWidth = '95px'

const form = reactive<trademark>({
  tmName: '',
  logoUrl: '',
})

let formRef = ref()
const validateTmname = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('大于等于2位'))
  }
}
const validateLogourl = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('图片必须上传'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  tmName: [{ required: true, validator: validateTmname, trigger: 'blur' }],
  logoUrl: [{ required: true, validator: validateLogourl, trigger: 'blur' }],
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  _response,
  uploadFile,
) => {
  form.logoUrl = URL.createObjectURL(uploadFile.raw!)
  // 图片上传成功，清空提示信息
  formRef.value.clearValidate('logoUrl')
}

// 在 before-upload 钩子中限制用户上传文件的格式和大小。
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const handleSizeChange = (val: number) => {
  console.log('size', val)
  pageSize.value = val
  currentPage.value = 1
  getProductData()
}
const handleCurrentChange = (val: number) => {
  console.log('page', val)
  currentPage.value = val
  getProductData()
}

const getProductData = async () => {
  console.log(currentPage.value, pageSize.value)
  let res: responseTrademark = await reqTrademark(
    currentPage.value,
    pageSize.value,
  )
  if (res.code == 200) {
    total.value = res.data.total
    tableData.value = res.data.records
  }
}

const addTrademark = () => {
  dialogFormVisible.value = true
  form.id = 0
  form.tmName = ''
  form.logoUrl = ''
  // 清空提示信息
  // 注意，第一次点击按钮时还没有formRef实例
  // 或加上？：formRef.value?.clearValidate(['tmName','logoUrl'])
  nextTick(() => {
    formRef.value.clearValidate(['tmName', 'logoUrl'])
  })
}

const updateTrademark = async (row: trademark) => {
  dialogFormVisible.value = true
  // 合并对象
  Object.assign(form, row)
  nextTick(() => {
    formRef.value.clearValidate(['tmName', 'logoUrl'])
  })
}

const deleteTrademarks = async (id: number) => {
  let res: any = await deleteTrademark(id)
  if (res.code == 200) {
    ElMessage.success('删除品牌成功')
    getProductData()
  } else {
    ElMessage.error('删除品牌失败')
  }
}

const cancel = () => {
  dialogFormVisible.value = false
}

const submit = async () => {
  //  对整个表单进行校验
  // 如果校验通过才执行后面的
  await formRef.value.validate()

  let res: any = await addOrUpdateTrademark(form)
  if (res.code == 200) {
    ElMessage.success(form.id ? '修改品牌成功' : '添加品牌成功')
    getProductData()
  } else {
    ElMessage.error(form.id ? '修改品牌失败' : '添加品牌失败')
  }
  dialogFormVisible.value = false
}

onMounted(() => {
  getProductData()
})
</script>

<style scoped lang="scss">
.box-card {
  .btn {
    margin-bottom: 10px;
  }
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
