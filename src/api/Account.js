import Vue from "vue"

const urlDict = {
  // 登录
  login: "/account/login",
  // 获取七牛token
  queryQnToken: "/qiniu/uptoken",
  // 上传
  uploadImg: "/qiniu/upload",

  // 子账号列表
  queryChilAccount: "/accounts/list",

  // 创建
  createdChilAccount: "/account/create",

  // 删除
  deletechilAccount: "/accounts/delete",

  // 子账号详情
  queryChilAccountDetail: "/accounts/{id}/get",

  // 修改子账号
  updateChilAccount: "/accounts/{id}/update"

}

export default {
  login: (data) => Vue.axios.post(urlDict.login, data),
  queryQnToken: () => Vue.axios.get(urlDict.queryQnToken),
  uploadImg: (data) => Vue.axios.post(urlDict.uploadImg, data),

  queryChilAccount (data) {
    return Vue.axios.get(urlDict.queryChilAccount, {
      params: data
    })
  },

  createdChilAccount (data) {
    return Vue.axios.post(urlDict.createdChilAccount, data)
  },

  deletechilAccount (ids) {
    return Vue.axios.post(urlDict.deletechilAccount, { ids })
  },

  queryChilAccountDetail (id) {
    return Vue.axios.get(urlDict.queryChilAccountDetail.replace("{id}", id))
  },

  updateChilAccount (data) {
    return Vue.axios.post(urlDict.updateChilAccount.replace("{id}", data.id), data)
  }
}
