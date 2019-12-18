
import Vue from "vue"

const urlDict = {
  createdSchool: "/campus/create",
  updateSchool: "/campus/{id}/update",
  querySchoolDetail: "/campus/{id}/get",
  deleteSchool: "/campus/delete",
  querySchool: "/campuss/list"
}

export default {
  createdSchool (data) {
    return Vue.axios.post(urlDict.createdSchool, data)
  },

  updateSchool (data) {
    return Vue.axios.post(urlDict.updateSchool.replace("{id}", data.id), data)
  },

  querySchoolDetail (id) {
    return Vue.axios.get(urlDict.querySchoolDetail.replace("{id}", id))
  },

  deleteSchool (ids) {
    return Vue.axios.post(urlDict.deleteSchool, { ids })
  },

  querySchool (data) {
    return Vue.axios.get(urlDict.querySchool, {
      params: data
    })
  }
}
