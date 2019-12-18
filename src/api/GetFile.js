import axios from "axios"
import { Message } from "element-ui"
import store from "../store"
// 创建一个新的axios实例

let tempLink = null
const downFileApi = axios.create({
  baseURL: "http://api.jrybh.com",
  responseType: "arraybuffer"
})
downFileApi.interceptors.request.use(
  config => {
    config.url = `${config.url}${config.url.includes("?") ? "&" : "?"}token=${store ? store.state.Account.userInfo.token : ""}`
    config.headers["Content-Type"] = "application/vnd.ms-excel;charset=UTF-8"
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

downFileApi.interceptors.response.use(
  res => {
    // let filename = res.headers["content-disposition"].split("=")[1]
    downFile(res.data, "运营数据")
  },
  error => {
    Message.error("服务器开小差了")
    return Promise.reject(error)
  })

const downFile = function (data, fromName) { // 下载文件
  let blob = new Blob([data], { type: "application/vnd.ms-excel;charset=UTF-8" })
  var blobURL = window.URL.createObjectURL(blob)
  var tempLink = document.createElement("a")
  tempLink.style.display = "none"
  tempLink.href = blobURL
  tempLink.setAttribute("download", fromName)
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank")
  }
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
  window.URL.revokeObjectURL(blobURL)
}

export default downFileApi
