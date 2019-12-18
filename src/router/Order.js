module.exports = [
  {
    path: "/order",
    name: "order",
    component: () => import("@/pages/Main/Order/order.vue")
  },
  {
    path: "/orderDetail",
    name: "orderDetail",
    component: () => import("@/pages/Main/Order/orderDetail.vue")
  }
]
