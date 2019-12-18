module.exports = [
  {
    path: "/teacherAdmin",
    name: "teacherAdmin",
    component: () => import("@/pages/Main/TeacherAdmin/teacherAdmin.vue")
  },
  {
    path: "/teacherDetail",
    name: "teacherDetail",
    component: () => import("@/pages/Main/TeacherAdmin/teacherDetail.vue")
  }
]
