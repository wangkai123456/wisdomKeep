<template>
  <div class="left">
    <el-menu @select="selectMenu" :default-active="selectNav" class="el-menu-vertical-demo sco" router>
      <div v-for="(item, i) in navigation" :key="i" :class="$store.state.Account.selectMenu == item.path ? 'seleMenu' : ''">
        <div :class="i == navigation.length-1 ? 'bot' : ''">
           <el-submenu v-if="item.children" :index="item.path">
          <template slot="title">
            <!-- <img :src="require(item.icon)" alt=""> -->
            <img class="icon" :src="item.icon" alt="">
            <span class="name">{{item.navigationName}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(items, index) in item.children" :key="index" :index="items.path">{{items.navigationName}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.path" v-else>
          <div class="nav_i">
            <img class="icon" :src="$store.state.Account.selectMenu == item.path ? item.selectIcon : item.icon" alt="">
            <span class="name">{{item.navigationName}}</span>
          </div>
        </el-menu-item>
        </div>

      </div>
    </el-menu>
  </div>
</template>
<script>
/**
 * 左侧导航栏
 */
import navigation from "@/assets/js/sideNavigationPath"
export default {
  name: "side-navigation-bar",
  data () {
    return {
      navigation,
      selectNav: ""
    }
  },

  created () {
    if (this.$store.state.Account.userInfo.right) {
      this.navigation = this.navigation.filter(item => item.role_type != "")
    }
  },

  methods: {
    selectMenu (e) {
      this.$store.commit("Account/SEKECT_MENU", e)
    }
  }
}
</script>
<style lang='less' scoped>
.el-submenu .el-menu-item {
  min-width: 0;
}
.el-menu-vertical-demo {
  width: 160px;
  // padding-top: 40px;
}
.left {
      height: 100%;
    background: white;
  &::-webkit-scrollbar {
    opacity: 0;
  }
  ul {
    height: 100%;
  }
}
.icn {
  width: 20px;
  height: 20px;
}
.menu_box {
  display: flex;
  align-items: center;
}
.icon {
  width: 12px;
  height: 12px;
  margin-right: 3px;
}
.nav_i {
  display: flex;
  align-items: center;
}
.el-submenu .el-menu-item {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #98A5A6;
}
.name {
  color: #646464;
}
.seleMenu {
  background: rgb(255, 77, 75) !important;
  z-index: 9999;
  .name {
    color: white !important;
  }
  .el-menu-item {
    background: rgb(255, 77, 75) !important;
  }
}
.el-menu-item:hover {
 background: rgb(255, 77, 75);
 .name {
    color: white !important;
  }
}
.sco {
  overflow: scroll;
    height: 100vh;
    overflow-x: hidden;
}
.bot {
  margin-bottom: 150px;
}
</style>
