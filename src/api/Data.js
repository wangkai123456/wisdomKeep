
import Vue from "vue"
import GetFile from "./GetFile"
const urlDict = {
  queryData: "/data/home/date",
  queryCount: "/data/home/trend",
  downLoad: "/data/home/export"

}

export default {
  queryCount (data) {
    return Vue.axios.get(urlDict.queryCount, {
      params: data
    })
  },

  queryData () {
    return Vue.axios.get(urlDict.queryData)
  },

  // 下载
  downLoad (data) {
    return GetFile(urlDict.downLoad, {
      params: data
    })
  }

}
