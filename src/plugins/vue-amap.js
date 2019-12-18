import Vue from "vue"
import AMap from "vue-amap"
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: "ee7757388cf83bdd9c488a954a0dcbce",
  plugin: ["AMap.Scale", "AMap.OverView", "AMap.ToolBar", "AMap.MapType"]
})
