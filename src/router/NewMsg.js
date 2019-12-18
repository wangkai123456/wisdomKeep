module.exports = [
  {
    path: "/newMsg",
    name: "newMsg",
    component: () => import("@/pages/Main/NewMsg/newMsg.vue")
  },
  {
    path: "/newMsgDetail",
    name: "newMsgDetail",
    component: () => import("@/pages/Main/NewMsg/newMsgDetail.vue")
  }

]
