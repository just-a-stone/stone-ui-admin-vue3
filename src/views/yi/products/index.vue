<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <!-- <el-form-item label="发行机构ID" prop="orgId">
        <el-input
          v-model="queryParams.orgId"
          placeholder="请输入发行机构ID"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item> -->
      <el-form-item label="机构名称" prop="orgName">
        <el-input
          v-model="queryParams.orgName"
          placeholder="请输入机构名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="产品类型" prop="productType">
        <el-select
          v-model="queryParams.productType"
          placeholder="请选择产品类型"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.PRODUCT_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称" prop="productName">
        <el-input
          v-model="queryParams.productName"
          placeholder="请输入产品名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="产品期限(月)" prop="productTermMonth">
        <el-input
          v-model="queryParams.productTermMonth"
          placeholder="请输入产品期限(月)"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="投资领域" prop="investmentArea">
        <el-select
          v-model="queryParams.investmentArea"
          placeholder="请选择投资领域"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.INVESTMENT_AREA)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="大小配比" prop="dxpb">
        <el-select
          v-model="queryParams.dxpb"
          placeholder="请选择大小配比"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.DXPB)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="安全评级" prop="securityRate">
        <el-input
          v-model="queryParams.securityRate"
          placeholder="请输入安全评级"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="在售状态" prop="saleStatus">
        <el-select
          v-model="queryParams.saleStatus"
          placeholder="请选择在售状态"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.SALE_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="付息方式" prop="interestPaymentMethod">
        <el-select
          v-model="queryParams.interestPaymentMethod"
          placeholder="请选择付息方式"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.INTEREST_PAYMENT_METHOD)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="投资区域-省" prop="investRegionProvince">
        <el-input
          v-model="queryParams.investRegionProvince"
          placeholder="请输入投资区域-省"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="投资区域-市" prop="investRegionCity">
        <el-input
          v-model="queryParams.investRegionCity"
          placeholder="请输入投资区域-市"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item> -->
      <el-form-item label="收益类型" prop="incomeTye">
        <el-select
          v-model="queryParams.incomeTye"
          placeholder="请选择收益类型"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.INCOME_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button type="primary" @click="openForm('create')" v-hasPermi="['yi:products:create']">
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['yi:products:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="id" align="center" prop="id" />
      <!-- <el-table-column label="发行机构ID" align="center" prop="orgId" /> -->
      <el-table-column label="机构名称" align="center" prop="orgName" />
      <!-- <el-table-column label="机构图标链接" align="center" prop="orgIconUrl" /> -->
      <el-table-column label="产品类型" align="center" prop="productType">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.PRODUCT_TYPE" :value="scope.row.productType" />
        </template>
      </el-table-column>
      <el-table-column label="产品名称" align="center" prop="productName" />
      <el-table-column label="产品期限(月)" align="center" prop="productTermMonth" />
      <el-table-column label="投资领域" align="center" prop="investmentArea">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.INVESTMENT_AREA" :value="scope.row.investmentArea" />
        </template>
      </el-table-column>
      <el-table-column label="大小配比" align="center" prop="dxpb">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.DXPB" :value="scope.row.dxpb" />
        </template>
      </el-table-column>
      <el-table-column label="安全评级" align="center" prop="securityRate" />
      <el-table-column label="发行进度" align="center" prop="releaseStatus">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.RELEASE_STATUS" :value="scope.row.releaseStatus" />
        </template>
      </el-table-column>
      <el-table-column
        label="发行进度更新日期"
        align="center"
        prop="releaseStatusUpdateAt"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="在售状态" align="center" prop="saleStatus">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.SALE_STATUS" :value="scope.row.saleStatus" />
        </template>
      </el-table-column>
      <el-table-column label="募集规模" align="center" prop="fundraisingSize" />
      <el-table-column label="付息方式" align="center" prop="interestPaymentMethod">
        <template #default="scope">
          <dict-tag
            :type="DICT_TYPE.INTEREST_PAYMENT_METHOD"
            :value="scope.row.interestPaymentMethod"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column label="投资区域-省" align="center" prop="investRegionProvince" />
      <el-table-column label="投资区域-市" align="center" prop="investRegionCity" /> -->
      <el-table-column
        label="起售日期"
        align="center"
        prop="saleStartAt"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="收益类型" align="center" prop="incomeTye">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.INCOME_TYPE" :value="scope.row.incomeTye" />
        </template>
      </el-table-column>
      <el-table-column label="抵/质押率" align="center" prop="mortgagePledgeRate" />
      <el-table-column label="补充说明" align="center" prop="supplementaryNotes" />
      <el-table-column label="融资方" align="center" prop="financialInstitution" />
      <el-table-column label="资金用途" align="center" prop="howToUse" />
      <el-table-column label="还款来源" align="center" prop="repaymentSource" />
      <el-table-column label="风控措施" align="center" prop="riskControlMeasures" />
      <el-table-column label="项目亮点" align="center" prop="projectHighlights" />
      <el-table-column label="募集账号-名称" align="center" prop="raiseAccountName" />
      <el-table-column label="募集账号-开户行" align="center" prop="raiseAccountBankName" />
      <el-table-column label="募集账号-账号" align="center" prop="raiseAccountNo" />
      <el-table-column label="募集账号-备注" align="center" prop="raiseAccountRemark" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['yi:products:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['yi:products:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <ProductsForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { DICT_TYPE, getStrDictOptions } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import * as ProductsApi from '@/api/yi/products'
import ProductsForm from './ProductsForm.vue'

defineOptions({ name: 'Products' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  orgId: null,
  orgName: null,
  productType: null,
  productName: null,
  productTermMonth: [],
  investmentArea: null,
  dxpb: null,
  securityRate: [],
  saleStatus: null,
  interestPaymentMethod: null,
  investRegionProvince: null,
  investRegionCity: null,
  incomeTye: null,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await ProductsApi.getProductsPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await ProductsApi.deleteProducts(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await ProductsApi.exportProducts(queryParams)
    download.excel(data, '产品.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
