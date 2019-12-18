import Vue from "vue"

const urlDict = {
  createdDiction: "/dictionaries/create",
  deleteDiction: "/dictionaries/delete",

  createdCount: "/dictionaries/percent/create",

  queryDiction: "/dictionaries/list",
  queryDictionDetail: "/dictionaries/{id}/get",
  updateDiction: "/dictionaries/{id}/update",
  queryBanner: "/bannars/list",
  createdBanner: "/bannars/create",
  deleteBanner: "/bannars/delete",
  queryBannerDetail: "/bannars/{id}/get",
  updateBanner: "/bannars/{id}/update"
}

export default {
  queryDiction (data) {
    return Vue.axios.get(urlDict.queryDiction, {
      params: data
    })
  },

  createdCount (data) {
    return Vue.axios.post(urlDict.createdCount, data)
  },

  deleteDiction (data) {
    return Vue.axios.post(urlDict.deleteDiction, data)
  },

  createdDiction (data) {
    return Vue.axios.post(urlDict.createdDiction, data)
  },

  queryDictionDetail (data) {
    return Vue.axios.get(urlDict.queryDictionDetail.replace("{id}", data.id), {
      params: data.typeCode
    })
  },

  updateDiction (data) {
    return Vue.axios.get(urlDict.updateDiction.replace("{id}", data.id), data)
  },

  queryBanner (data) {
    return Vue.axios.get(urlDict.queryBanner, {
      params: data
    })
  },

  createdBanner (data) {
    return Vue.axios.post(urlDict.createdBanner, data)
  },

  deleteBanner (ids) {
    return Vue.axios.post(urlDict.deleteBanner, { ids })
  },

  queryBannerDetail (id) {
    return Vue.axios.get(urlDict.queryBannerDetail.replace("{id}", id))
  },

  updateBanner (data) {
    return Vue.axios.post(urlDict.queryBannerDetail.replace("{id}", data.id), data)
  }
}
