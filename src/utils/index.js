import store from "@/store"
/**
 * 滚动分页
 * @method  pageInation
 * @param  {number}  id  滚动的元素 id （也就是overflow属性为sroll 的id）
 * @param  {number}  pageIndex  页码
 * @param  {number}  pageSize 页数
 * @param  {number}  totalCount  分页总共的页码
 * @return {promise}  返回一个携带分页参数的promise
 */

export const pageInation = (elemId, pageIndex, pageSize, totalCount) => {
  return new Promise((resolve, reject) => {
    let clientHeight = document.getElementById(elemId).clientHeight // 可见区域高度
    let scrollTop2 = document.getElementById(elemId).scrollTop // 滚动条到顶部的距离
    let scrollHeight = document.getElementById(elemId).scrollHeight // 整个页面高度
    if (
      scrollTop2 + clientHeight === scrollHeight &&
      parseInt(pageIndex) * parseInt(pageSize) < parseInt(totalCount)
    ) {
      resolve(++pageIndex)
    }
    // 如果分页到底
    // if (parseInt(pageIndex) * parseInt(pageSize) >= parseInt(totalCount)) {
    //   resolve(false)
    // }
  })
}
/**
 * 深拷贝
 * @method depthCopy
 * @param {object} obj 需要深拷贝的对象
 * @return {object}   返回一个深拷贝对象
 */

export const depthCopy = obj => {
  if (typeof obj !== "object") return
  let newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? depthCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}
export const uploadInit = ({ token, domain }) => editor => {
  // 获取相关 DOM 节点的 ID
  var btnId = editor.imgMenuId
  var containerId = editor.toolbarElemId
  var textElemId = editor.textElemId
  // 创建上传对象
  // api.upload().then(res => {
  var uploader = window.Qiniu.uploader({
    runtimes: "html5,flash,html4", // 上传模式,依次退化
    browse_button: btnId, // 上传选择的点选按钮，**必需**
    uptoken: token,
    unique_names: true,
    domain: domain, // bucket 域名，下载资源时用到，**必需**
    container: containerId, // 上传区域DOM ID，默认是browser_button的父元素，
    max_file_size: "100mb", // 最大文件体积限制
    filters: {
      mime_types: [
        // 只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
        { title: "图片文件", extensions: "jpg,gif,png,bmp" }
      ]
    },
    max_retries: 3, // 上传失败最大重试次数
    dragdrop: true, // 开启可拖曳上传
    drop_element: textElemId, // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
    chunk_size: "4mb", // 分块上传时，每片的体积
    auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
    init: {
      FileUploaded: function (up, file, info) {
        var domain = up.getOption("domain")
        var res = JSON.parse(info.response)
        var sourceLink = domain + "/" + res.key // 获取上传成功后的文件的Url
        // 插入图片到editor
        editor.cmd.do(
          "insertHtml",
          "<img src=\"" + sourceLink + "\" style=\"max-width:100%;\"/>"
        )
      }
    }
  })
  // })
}
