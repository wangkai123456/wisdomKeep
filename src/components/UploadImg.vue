<template>
  <div class="img_box">
    <div>
      <div>点击选择上传图片</div>
      <img src="../assets/img/errimg.jpg" alt="">
      <input type="file"  @change="selectedFile" id="fileid" >
    </div>
  </div>
</template>

<script>

import { Account } from "api"

export default {
  name: "upload-img",

  methods: {
    async selectedFile (e) {
      console.log(e.target.files[0])
      let res = await Account.uploadImg()
      this.$emit("getImgUrl", res)
    }
  }
}
</script>

<style lang="less" scoped>
.img_box {
  width: 303px;
  height: 177px;
  border: 1px dotted #BFBFBF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #C5CCCC;
  text-align: center;
  font-size: 16px;
  position: relative;
  input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>
