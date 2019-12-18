import Vue from "vue"

const components = {
  SideNavigationBar: () => import("./SideNavigationBar"),
  HeaderTit: () => import("./HeaderTit"),
  UploadImg: () => import("./UploadImg")
  // editor: () => import("./editor")

  //   BannerEditor: () => import('./BannerEditor'),
  //   Tinymce: () => import('./Tinymce'),
  //   CoursePicker: () => import('./CoursePicker'),
  //   CommentViewer: () => import('./CommentViewer')
}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})
