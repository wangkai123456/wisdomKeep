
import Vue from "vue"

const urlDict = {
  createdSchool: "/courses/create",
  updateSchool: "/courses/{id}/update",
  querySchoolDetail: "/courses/{id}/get",
  deleteSchool: "/courses/delete",
  querySchool: "/courses/list"
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
