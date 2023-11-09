import request from '@/config/axios'

export interface OrgsVO {
  id: number
  orgName: string
  iconUrl: string
}

export interface OrgsPageVo extends OrgsVO, PageParam {}

export interface SupportData {
  searchOrgs: OrgsPageVo
  dataOrgs: {
    list: []
  }
}

// 查询机构列表
export const getOrgsPage = async (params) => {
  return await request.get({ url: `/yi/orgs/page`, params })
}

// 查询机构详情
export const getOrgs = async (id: number) => {
  return await request.get({ url: `/yi/orgs/get?id=` + id })
}

// 新增机构
export const createOrgs = async (data: OrgsVO) => {
  return await request.post({ url: `/yi/orgs/create`, data })
}

// 修改机构
export const updateOrgs = async (data: OrgsVO) => {
  return await request.put({ url: `/yi/orgs/update`, data })
}

// 删除机构
export const deleteOrgs = async (id: number) => {
  return await request.delete({ url: `/yi/orgs/delete?id=` + id })
}

// 导出机构 Excel
export const exportOrgs = async (params) => {
  return await request.download({ url: `/yi/orgs/export-excel`, params })
}
