
import Vue from "vue"

const urlDict = {
  createdSchool: "/orders/create",
  updateSchool: "/orders/{id}/status/modify",
  querySchoolDetail: "/orders/{id}/get",
  querySchool: "/orders/list"
}

export default {
  createdSchool (data) {
    return Vue.axios.post(urlDict.createdSchool, data)
  },

  updateSchool (id, status, notes) {
    return Vue.axios.post(`${urlDict.updateSchool.replace("{id}", id)}`, {status, notes})
  },

  querySchoolDetail (id) {
    return Vue.axios.get(urlDict.querySchoolDetail.replace("{id}", id))
  },

  querySchool (data) {
    return Vue.axios.get(urlDict.querySchool, {
      params: data
    })
  }
}
