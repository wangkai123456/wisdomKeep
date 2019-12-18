<template>
  <div class="header">
    <div>
      <img :src="require(`../assets/img/${img}`)" alt="">
      <div>{{tit}}</div>
    </div>
    <div @click="$router.back(-1)">
      <img v-if="back" src="../assets/img/back.jpg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  props: ["img", "tit", "back"],
  name: "header-tit"
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 0.61rem;
  background: #59a9de;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  img {
    margin-left: 0.17rem;
    margin-right: 0.11rem;
    width: 38px;
    height: 27px;
  }
}
</style>
