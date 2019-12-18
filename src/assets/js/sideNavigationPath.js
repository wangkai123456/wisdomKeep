export default [
  {
    navigationName: "首页",
    path: "home",
    role_type: "",
    icon: require("../img/hoO.png"),
    selectIcon: require("../img/hoS.png")
  },
  {
    navigationName: "基础配置",
    path: "",
    role_type: "",
    icon: require("../img/baO.png"),
    selectIcon: require("../img/baS.png"),
    children: [
      {
        navigationName: "轮播配置",
        path: "swiperConfig"
      },
      {
        navigationName: "年级配置",
        path: "gradeConfig"
      },
      {
        navigationName: "学科配置",
        path: "subjectConfig"
      },
      {
        navigationName: "授课模式配置",
        path: "courseConfig"
      },
      {
        navigationName: "学期配置",
        path: "semesterConfig"
      },
      {
        navigationName: "栏目配置",
        path: "columConfig"
      },
      {
        navigationName: "子管理员",
        path: "childAdmin"
      }
    ]
  },
  {
    navigationName: "校区管理",
    path: "schoolAdmin",
    role_type: "",
    icon: require("../img/scO.png"),
    selectIcon: require("../img/scS.png")
  },
  {
    navigationName: "教师天地",
    path: "teacherAdmin",
    role_type: "",
    icon: require("../img/teO.png"),
    selectIcon: require("../img/teS.png")
  },
  {
    navigationName: "资讯管理",
    path: "newMsg",
    role_type: "",
    icon: require("../img/newO.png"),
    selectIcon: require("../img/newS.png")
  },
  {
    navigationName: "选课中心",
    path: "course",
    role_type: "",
    icon: require("../img/coO.png"),
    selectIcon: require("../img/coS.png")
  },
  {
    navigationName: "折扣管理",
    path: "discount",
    role_type: "",
    icon: require("../img/diO.png"),
    selectIcon: require("../img/diS.png")
  },
  {
    navigationName: "订单管理",
    path: "order",
    role_type: 1,
    icon: require("../img/orO.png"),
    selectIcon: require("../img/orS.png")
  },
  {
    navigationName: "用户管理",
    path: "user",
    role_type: "",
    icon: require("../img/ueO.png"),
    selectIcon: require("../img/usS.png")
  },
  {
    navigationName: "专题管理",
    path: "special",
    role_type: "",
    icon: require("../img/tiO.png"),
    selectIcon: require("../img/tiS.png")
  }
]
