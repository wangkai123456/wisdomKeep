
import Vue from "vue"

const urlDict = {
  updateSchool: "/users/{id}/update",
  querySchoolDetail: "/users/{id}/get",
  deleteSchool: "/teachers/delete",
  querySchool: "/users/list"
}

export default {

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
