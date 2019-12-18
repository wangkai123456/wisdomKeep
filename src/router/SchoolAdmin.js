module.exports = [
  {
    path: "/schoolAdmin",
    name: "schoolAdmin",
    component: () => import("@/pages/Main/SchoolAdmin/schoolAdmin.vue")
  },
  {
    path: "/schoolDetail",
    name: "schoolDetail",
    component: () => import("@/pages/Main/SchoolAdmin/schoolDetail.vue")
  }
]
