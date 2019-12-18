
import Vue from "vue"

const urlDict = {
  createdSchool: "/webs/create",
  updateSchool: "/webs/{id}/update",
  querySchoolDetail: "/webs/{id}/get",
  deleteSchool: "/webs/delete",
  querySchool: "/webs/list",
  upload: "upload",
  queryFormDetail: "/webs/form/list"
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
  },

  upload (file, dir, webId) {
    return Vue.axios.post(`${urlDict.upload}?dir=${dir}&webId=${webId}`, file)
  },

  queryFormDetail (data) {
    return Vue.axios.get(urlDict.queryFormDetail, {
      params: data
    })
  }

}
