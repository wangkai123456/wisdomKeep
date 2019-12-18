<template>
  <div class="main">
    <header class="header">
      <div>
        <img class="logo" src="../assets/img/logo_g.png" alt>
        <div class="tit">网站管理系统登陆</div>
      </div>
      <div class="opear">
        <div @click="$router.push('/home')">
          <img src="../assets/img/home.png" alt>
          <span>系统首页</span>
        </div>
        <div>
          <img class="avator" src="../assets/img/18674363999088217.jpg" alt>
          <span>{{$store.state.Account.userInfo.name}}老师登陆</span>
        </div>
        <div @click="$router.push('/sign_in')">
          <img src="../assets/img/loginOut.png" alt>
          <span>退出系统</span>
        </div>
      </div>
    </header>
    <div class="content">
      <div class="nav" style="width:160px">
        <side-navigation-bar/>
      </div>
      <div class="router_view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.commit("BaseConfig/QUERY_BASE")
  }
}
</script>

<style lang="less" scoped>
.main {
  background: #f3f3f3;
}

.header {
  background: #0067b1;
  width: 100%;
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    color: white;
    font-size: 12px;
    img {
      width: 12px;
      height: 10px;
    }
    .avator {
      width: 40px;
      height: 40px;
      border-radius: 40px;
    }
  }
  .logo {
    width: 1.42rem;
    height: 0.35rem;
  }
}
.opear {
  margin-right: 0.3rem;
  div {
    margin-left: 0.1rem;
    span {
      padding-left: 5px;
    }
  }
}
.nav {
  float: left;
  height: 100vh;
}
.content {
  overflow: hidden;
  .router_view {
    padding: 5px 20px;
    padding-left: 0;
    overflow: scroll;
    height: 100vh;
    overflow-x:hidden;
  }
}
.tit {
  color: white;
  font-size: 28px !important;
  border-left: 1px solid white;
  padding-left: 10px;

}
</style>
