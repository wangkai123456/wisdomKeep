import Vue from "vue"
import Router from "vue-router"
// import nav from "@/assets/js/sideNavigationPath"
// import store from "@/store"

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: "/sign_in",
      name: "SignIn",
      component: () => import("@/pages/SignIn.vue")
    },
    {
      path: "/main",
      name: "Main",
      meta: { requiresAuth: true },
      component: () => import("@/pages/Main.vue"),
      redirect: { name: "home" },
      children: [].concat(
        require("./Home"),
        require("./BaseConfig"),
        require("./Course"),
        require("./Discount"),
        require("./NewMsg"),
        require("./Order"),
        require("./SchoolAdmin"),
        require("./Special"),
        require("./TeacherAdmin"),
        require("./User")

      )
    },
    {
      path: "*",
      redirect: { name: "SignIn" }
    }
  ]
})

let loses = ["order", "orderDetail"]

// router.beforeEach((to, from, next) => {
//   if (to.name == "SignIn") return next()
//   if (storage.get("state")) {
//     if (storage.get("state").Account.userInfo.right) {
//       if (loses.includes(to.name)) {
//         return next()
//       } else {
//         return next("/order")
//       }
//     } else {
//       return next()
//     }
//   } else {
//     return next("/sign_in")
//   }
// })

export default router
