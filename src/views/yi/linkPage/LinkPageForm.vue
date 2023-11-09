<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="主题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入主题" />
      </el-form-item>
      <el-form-item label="图片链接">
        <UploadImg v-model="formData.picUrl" />
      </el-form-item>
      <el-form-item label="网页链接" prop="linkUrl">
        <el-input v-model="formData.linkUrl" placeholder="请输入网页链接" />
      </el-form-item>
      <el-form-item label="链接分类" prop="category">
        <el-select v-model="formData.category" placeholder="请选择链接分类">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.LINK_PAGE_CATEGORY)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
        <!-- <el-input v-model="formData.category" placeholder="请输入链接分类" /> -->
      </el-form-item>
      <el-form-item label="展示顺序" prop="sort">
        <el-input v-model="formData.sort" placeholder="请输入展示顺序" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as LinkPageApi from '@/api/yi/linkPage'
import { DICT_TYPE, getStrDictOptions } from '@/utils/dict'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  title: undefined,
  picUrl: undefined,
  linkUrl: undefined,
  category: undefined,
  sort: undefined
})
const formRules = reactive({
  title: [{ required: true, message: '主题不能为空', trigger: 'blur' }],
  picUrl: [{ required: true, message: '图片链接不能为空', trigger: 'blur' }],
  category: [{ required: true, message: '链接分类不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await LinkPageApi.getLinkPage(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  if (!formRef) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as LinkPageApi.LinkPageVO
    if (formType.value === 'create') {
      await LinkPageApi.createLinkPage(data)
      message.success(t('common.createSuccess'))
    } else {
      await LinkPageApi.updateLinkPage(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    title: undefined,
    picUrl: undefined,
    linkUrl: undefined,
    category: undefined,
    sort: undefined
  }
  formRef.value?.resetFields()
}
</script>
