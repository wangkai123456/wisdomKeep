module.exports = [
  {
    path: "/childAdmin",
    name: "childAdmin",
    component: () => import("@/pages/Main/BaseConfig/childAdmin.vue")
  },
  {
    path: "/columConfig",
    name: "columConfig",
    component: () => import("@/pages/Main/BaseConfig/columConfig.vue")
  },
  {
    path: "/courseConfig",
    name: "courseConfig",
    component: () => import("@/pages/Main/BaseConfig/courseConfig.vue")
  },
  {
    path: "/gradeConfig",
    name: "gradeConfig",
    component: () => import("@/pages/Main/BaseConfig/gradeConfig.vue")
  },
  {
    path: "/semesterConfig",
    name: "semesterConfig",
    component: () => import("@/pages/Main/BaseConfig/semesterConfig.vue")
  },
  {
    path: "/subjectConfig",
    name: "subjectConfig",
    component: () => import("@/pages/Main/BaseConfig/subjectConfig.vue")
  },
  {
    path: "/swiperConfig",
    name: "swiperConfig",
    component: () => import("@/pages/Main/BaseConfig/swiperConfig.vue")
  }
]
