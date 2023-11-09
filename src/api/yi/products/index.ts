import request from '@/config/axios'

export interface ProductsVO {
  id: number
  orgId: number
  orgName: string
  orgIconUrl: string
  productType: string
  productName: string
  productTermMonth: number
  investmentArea: string
  dxpb: string
  securityRate: number
  releaseStatus: string
  releaseStatusUpdateAt: Date
  saleStatus: string
  fundraisingSize: string
  interestPaymentMethod: string
  investRegionProvince: string
  investRegionCity: string
  saleStartAt: Date
  incomeTye: string
  mortgagePledgeRate: number
  supplementaryNotes: string
  financialInstitution: string
  howToUse: string
  repaymentSource: string
  riskControlMeasures: string
  projectHighlights: string
  raiseAccountName: string
  raiseAccountBankName: string
  raiseAccountNo: string
  raiseAccountRemark: string
}

// 查询产品列表
export const getProductsPage = async (params) => {
  return await request.get({ url: `/yi/products/page`, params })
}

// 查询产品详情
export const getProducts = async (id: number) => {
  return await request.get({ url: `/yi/products/get?id=` + id })
}

// 新增产品
export const createProducts = async (data: ProductsVO) => {
  return await request.post({ url: `/yi/products/create`, data })
}

// 修改产品
export const updateProducts = async (data: ProductsVO) => {
  return await request.put({ url: `/yi/products/update`, data })
}

// 删除产品
export const deleteProducts = async (id: number) => {
  return await request.delete({ url: `/yi/products/delete?id=` + id })
}

// 导出产品 Excel
export const exportProducts = async (params) => {
  return await request.download({ url: `/yi/products/export-excel`, params })
}
