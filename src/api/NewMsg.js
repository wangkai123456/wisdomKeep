
import Vue from "vue"

const urlDict = {
  queryMsg: "/contents/list",
  queryMsgDetai: "/contents/{id}/get",
  createdMsg: "/contents/create",
  updateStatus: "/contents/update",
  deleteMsg: "/contents/delete"
}

export default {
  queryMsg (data) {
    return Vue.axios.get(urlDict.queryMsg, {
      params: data
    })
  },

  updateStatus (ids, status) {
    return Vue.axios.post(`${urlDict.updateStatus}?status=${status}`, { ids })
  },

  deleteMsg (ids) {
    return Vue.axios.post(urlDict.deleteMsg, { ids })
  },

  queryMsgDetai: id => Vue.axios.get(urlDict.queryMsgDetai.replace("{id}", id)),
  createdMsg: data => Vue.axios.post(urlDict.createdMsg, data)
}
