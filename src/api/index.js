import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
import router from "@/router"
import store from "@/store"
// import baseUrl from "utils"
import { Message, Loading } from "element-ui"
import Qs from "qs"
Vue.use(VueAxios, axios)

// axios.defaults.baseURL = "/oui" // 本地
axios.defaults.baseURL = "http://api.jrybh.com" // line

let loadStatus = null

axios.defaults.paramsSerializer = params => {
  return Qs.stringify(params, { indices: false })
}

Vue.axios.interceptors.response.use(response => {
  // console.log(loadStatus)
  loadStatus.close()
  if (response.data.code == 0) {
    if (response.data.code == 401) {
      router.push({ name: "login" })
    } else {
      return response.data
    }
  } else {
    Message.error(response.data.msg)
    return Promise.reject(new Error(response.data.msg))
  }
}, err => {
  // console.log(loadStatus)
  Message.error("服务器开小差啦")

  // loadStatus.close()
  return Promise.reject(err)
})

axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // if (config.url) {
  // config.url = `${config.url}${config.url.includes("?") ? "&" : "?"}token=829ac38346e7432da488f652a48430a8`
  config.url = `${config.url}${config.url.includes("?") ? "&" : "?"}token=${store ? store.state.Account.userInfo.token : ""}`
  // axios.defaults.params = { token: store ? store.state.Account.userInfo.token : "" }
  // }

  // console.log()
  loadStatus = Loading.service({
    lock: true,
    text: "Loading",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)"
  })
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export { default as Account } from "./Account"
export { default as NewMsg } from "./NewMsg"
export { default as BaseConfig } from "./BaseConfig"
export { default as School } from "./School"
export { default as Teacher } from "./Teacher"
export { default as Course } from "./Course"
export { default as Order } from "./Order"
export { default as User } from "./User"
export { default as Wish } from "./Wish"
export { default as OnlyContent } from "./OnlyContent"
export { default as Data } from "./Data"
