module.exports = [
  {
    path: "/special",
    name: "special",
    component: () => import("@/pages/Main/Special/special.vue")
  },
  {
    path: "/createdSpecial",
    name: "createdSpecial",
    component: () => import("@/pages/Main/Special/createdSpecial.vue")
  },
  {
    path: "/specialDetail",
    name: "specialDetail",
    component: () => import("@/pages/Main/Special/specialDetail.vue")
  }

]
