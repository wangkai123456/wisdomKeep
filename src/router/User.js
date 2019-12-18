module.exports = [
  {
    path: "/user",
    name: "user",
    component: () => import("@/pages/Main/User/user.vue")
  },
  {
    path: "/wishOrder",
    name: "wishOrder",
    component: () => import("@/pages/Main/User/wishOrder.vue")
  },
  {
    path: "/userDetail",
    name: "userDetail",
    component: () => import("@/pages/Main/User/userDetail.vue")
  }
]
