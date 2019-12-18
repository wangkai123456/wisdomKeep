module.exports = [
  {
    path: "/course",
    name: "course",
    component: () => import("@/pages/Main/Course/course.vue")
  },
  {
    path: "/courseDetail",
    name: "courseDetail",
    component: () => import("@/pages/Main/Course/courseDetail.vue")
  }

]
