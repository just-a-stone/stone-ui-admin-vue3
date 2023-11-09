import request from '@/config/axios'

export interface LinkPageVO {
  id: number
  title: string
  picUrl: string
  linkUrl: string
  category: string
  sort: number
}

// 查询外链网页列表
export const getLinkPagePage = async (params) => {
  return await request.get({ url: `/yi/link-page/page`, params })
}

// 查询外链网页详情
export const getLinkPage = async (id: number) => {
  return await request.get({ url: `/yi/link-page/get?id=` + id })
}

// 新增外链网页
export const createLinkPage = async (data: LinkPageVO) => {
  return await request.post({ url: `/yi/link-page/create`, data })
}

// 修改外链网页
export const updateLinkPage = async (data: LinkPageVO) => {
  return await request.put({ url: `/yi/link-page/update`, data })
}

// 删除外链网页
export const deleteLinkPage = async (id: number) => {
  return await request.delete({ url: `/yi/link-page/delete?id=` + id })
}

// 导出外链网页 Excel
export const exportLinkPage = async (params) => {
  return await request.download({ url: `/yi/link-page/export-excel`, params })
}
