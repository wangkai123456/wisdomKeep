
import Vue from "vue"

const urlDict = {
  joinWish: "/wish/courses/{id}/create",
  canceWish: "/wish/courses/{id}/delete",
  queryWish: "/wishes/list"
}

export default {

  joinWish (id) {
    return Vue.axios.post(urlDict.joinWish.replace("{id}"))
  },

  canceWish (id) {
    return Vue.axios.get(urlDict.canceWish.replace("{id}", id))
  },

  queryWish (data) {
    return Vue.axios.get(urlDict.queryWish, {
      params: data
    })
  }
}
