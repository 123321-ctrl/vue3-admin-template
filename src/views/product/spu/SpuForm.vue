<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input
          placeholder="请输入SPU名称"
          v-model="SPUParams.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU名称">
        <el-select v-model="SPUParams.tmId">
          <el-option
            v-for="item in allTrademark"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请输入SPU描述"
          v-model="SPUParams.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          v-model:file-list="imgList"
          action="/a/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
            style="width: 100%; height: 100%"
          />
        </el-dialog>
      </el-form-item>

      <el-form-item label="SPU销售属性">
        <el-select>
          <el-option label="华为"></el-option>
        </el-select>
        <el-button type="primary" size="default" icon="Plus">
          添加销售属性
        </el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="SPUParams.spuSaleAttrList"
        >
          <el-table-ccolumn
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-ccolumn>
          <el-table-ccolumn
            prop="saleAttrName"
            label="销售属性名"
            width="100"
          ></el-table-ccolumn>
          <el-table-ccolumn label="销售属性值">
            <!-- <template v-slot="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.spuSaleAttrValueList"
                :key="item.id"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
            </template> -->
          </el-table-ccolumn>
          <el-table-ccolumn label="操作" width="80"></el-table-ccolumn>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
const emit = defineEmits(['changeScreen'])

import {
  reqAllTrademark,
  reqSpuImageList,
  reqSpuSaleAttr,
  reqAllSaleAttr,
} from '@/api/product/spu/index'
import type {
  TradeMark,
  SpuData,
  AllTradeMark,
  SpuHasImage,
  SaleAttrRes,
  HasSaleAttrRes,
  HasSaleAttr,
} from '@/api/product/spu/type'

let SPUParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuSaleAttrList: [],
  spuImageList: [],
})

let allTrademark = ref<TradeMark[]>([])
let imgList = ref<UploadUserFile[]>([])
// let attrDataList = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

// 点击预览触发的钩子
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log('uploadFile', uploadFile)
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const cancel = () => {
  emit('changeScreen')
}

const initHasSpuData = async (row: SpuData) => {
  SPUParams.value = row
  let res: AllTradeMark = await reqAllTrademark()
  let res1: SpuHasImage = await reqSpuImageList(row.id as number)
  let res2: SaleAttrRes = await reqSpuSaleAttr(row.id as number)
  let res3: HasSaleAttrRes = await reqAllSaleAttr()
  allTrademark.value = res.data
  imgList.value = res1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  SPUParams.value.spuSaleAttrList = res2.data
  allSaleAttr.value = res3.data
}
defineExpose({ initHasSpuData })
</script>

<style scoped lang="scss"></style>
