<template>
  <div class="editor">
    <div ref="editor"></div>
  </div>
</template>

<script>
import Editor from "wangeditor"
import api from "@/request/api"

export default {
  name: "editor",
  props: {
    editorContent: { // 富文本内容
      type: String,
      default: ""
    }
  },
  data () {
    return {
      uptoken: null
    }
  },
  mounted () {
    var editor = new Editor(this.$refs.editor)
    // onchange事件
    editor.customConfig.onchange = (html) => {
      console.log("onchange", html)
      this.$emit("changeContent", html)
    }
    // 自定义菜单配置
    editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "video", // 插入视频
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ]
    // 自定义字体
    editor.customConfig.fontNames = [
      "宋体",
      "微软雅黑",
      "Arial",
      "Tahoma",
      "Verdana"
    ]
    // 使用 base64 保存图片
    editor.customConfig.uploadImgShowBase64 = false

    // 隐藏“网络图片”tab
    editor.customConfig.showLinkImg = false

    // 允许上传到七牛云存储
    editor.customConfig.qiniu = true

    editor.create()

    // 编辑富文本
    if (this.editorContent) {
      editor.txt.html(this.editorContent)
    }
    // 初始化
    this.uploadInit(editor)
  },
  methods: {

  }
}
</script>

<style lang="less">
.w-e-toolbar {
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>

<style lang="less" scoped>
.editor {
  width: 100%;
  height: 100vh;
  /* table 样式 */
  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }
  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }
  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }
  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }
  pre code {
    display: block;
  }
  /* ul ol 样式 */
  ul, ol {
    margin: 10px 0 10px 20px;
  }
}
</style>
