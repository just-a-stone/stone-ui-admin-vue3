import request from '@/config/axios'

export interface ProductInterestVO {
  id: number
  productId: number
  amountStart: number
  amountEnd: number
  interestRate: number
}

// 查询产品认购金额收益列表
export const getProductInterestPage = async (params) => {
  return await request.get({ url: `/yi/product-interest/page`, params })
}

// 查询产品认购金额收益详情
export const getProductInterest = async (id: number) => {
  return await request.get({ url: `/yi/product-interest/get?id=` + id })
}

// 新增产品认购金额收益
export const createProductInterest = async (data: ProductInterestVO) => {
  return await request.post({ url: `/yi/product-interest/create`, data })
}

// 修改产品认购金额收益
export const updateProductInterest = async (data: ProductInterestVO) => {
  return await request.put({ url: `/yi/product-interest/update`, data })
}

// 删除产品认购金额收益
export const deleteProductInterest = async (id: number) => {
  return await request.delete({ url: `/yi/product-interest/delete?id=` + id })
}

// 导出产品认购金额收益 Excel
export const exportProductInterest = async (params) => {
  return await request.download({ url: `/yi/product-interest/export-excel`, params })
}
