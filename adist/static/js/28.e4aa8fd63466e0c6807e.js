webpackJsonp([28],{bcd6:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Xxa5"),s=r.n(a),n=r("exGp"),l=r.n(n),o=r("gyMJ"),i=function(){return{adUrl:"",desc:"",order:"",redirectUrl:"",status:""}},c={data:function(){return{tableData3:[],filter:{offset:0,limit:10,status:"ALL"},ruleForm:null,diaLog:!1,rules:{adUrl:[{required:!0,message:"请上传新广告图片",trigger:"change"}],desc:[{required:!0,message:"请输入显示描述",trigger:"change"}],redirectUrl:[{required:!0,message:"请输入访问url",trigger:"change"}],order:[{required:!0,message:"请输入显示顺序",trigger:"change"}],status:[{required:!0,message:"请选择是否启用",trigger:"change"}]},count:0}},created:function(){var e=this;return l()(s.a.mark(function t(){var r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.queryBanner(),t.next=3,o.a.queryQnToken();case 3:r=t.sent,e.$store.commit("Account/QUERY_QTOKEN",r.data);case 5:case"end":return t.stop()}},t,e)}))()},methods:{queryBanner:function(){var e=this;return l()(s.a.mark(function t(){var r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.b.queryBanner(e.filter);case 2:r=t.sent,e.tableData3=r.data,e.count=r.count;case 5:case"end":return t.stop()}},t,e)}))()},deleteSchool:function(e){var t=this;return l()(s.a.mark(function r(){return s.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.$confirm("确认要执行此操作吗");case 2:return r.next=4,o.b.deleteBanner(e?[e]:t.ids);case 4:t.queryBanner();case 5:case"end":return r.stop()}},r,t)}))()},createdBanner:function(){var e=this;return l()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$refs.ruleForm.validate();case 2:return t.next=4,o.b.createdBanner(e.ruleForm);case 4:e.$message.success("创建成功"),e.diaLog=!1,e.queryBanner();case 7:case"end":return t.stop()}},t,e)}))()},showDiaLog:function(e){var t=this;return l()(s.a.mark(function r(){var a,n;return s.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(!e){r.next=8;break}return r.next=3,o.b.queryBannerDetail(e);case 3:a=r.sent,n=a.data,t.ruleForm=n,r.next=9;break;case 8:t.ruleForm=new i;case 9:t.diaLog=!0;case 10:case"end":return r.stop()}},r,t)}))()},successFile:function(e){this.ruleForm.adUrl=this.$store.state.Account.QnInfo.domainName+e.key},currentPage:function(e){this.filter.offset=e*this.filter.limit-1,this.queryBanner()}}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"box"},[r("header-tit",{attrs:{img:"swiperT.png",tit:"首页轮播列表"}}),e._v(" "),r("div",{staticClass:"top"},[r("div",{staticClass:"add"},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.showDiaLog()}}},[e._v("新增")])],1)]),e._v(" "),r("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData3,"tooltip-effect":"dark"}},[r("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),r("el-table-column",{attrs:{label:"图片"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("img",{staticClass:"img",attrs:{src:e.row.adUrl,alt:""}})]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"描述",prop:"desc"}}),e._v(" "),r("el-table-column",{attrs:{label:"排序",prop:"order"}}),e._v(" "),r("el-table-column",{attrs:{label:"使用状态"},scopedSlots:e._u([{key:"default",fn:function(t){return["enable"==t.row.status?r("div",{staticClass:"blue"},[e._v("使用中")]):e._e(),e._v(" "),"disable"==t.row.status?r("div",{staticClass:"red"},[e._v("禁用")]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini"},on:{click:function(r){e.showDiaLog(t.row.id)}}},[e._v("编辑")]),e._v(" "),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){e.deleteSchool(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),r("el-dialog",{attrs:{title:"新增 首页广告轮播图",visible:e.diaLog},on:{"update:visible":function(t){e.diaLog=t}}},[e.ruleForm?r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[r("el-form-item",{attrs:{label:"新广告图片",prop:"adUrl"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{data:{token:e.$store.state.Account.QnInfo.token},action:"http://up-z0.qiniu.com","show-file-list":!1,"on-success":e.successFile}},[e.ruleForm.adUrl?r("img",{staticClass:"img",attrs:{src:e.ruleForm.adUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),r("div",{staticStyle:{color:"#F55D54"}},[e._v("\n          PNG，GIF\n          上传大小：1920*500\n        ")])],1),e._v(" "),e.ruleForm.id?r("el-form-item",{attrs:{label:"原广告图片"}},[r("img",{staticClass:"img",attrs:{src:e.ruleForm.adUrl,alt:""}})]):e._e(),e._v(" "),r("el-form-item",{attrs:{label:"显示描述",prop:"desc"}},[r("el-input",{attrs:{placeholder:"请输入描述"},model:{value:e.ruleForm.desc,callback:function(t){e.$set(e.ruleForm,"desc",t)},expression:"ruleForm.desc"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"访问url",prop:"redirectUrl"}},[r("el-input",{attrs:{placeholder:"请输入访问url"},model:{value:e.ruleForm.redirectUrl,callback:function(t){e.$set(e.ruleForm,"redirectUrl",t)},expression:"ruleForm.redirectUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"显示顺序",prop:"order"}},[r("el-input",{attrs:{placeholder:"请输入显示顺序"},model:{value:e.ruleForm.order,callback:function(t){e.$set(e.ruleForm,"order",t)},expression:"ruleForm.order"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否启用",prop:"status"}},[r("el-radio",{attrs:{label:"enable"},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},[e._v("启用")]),e._v(" "),r("el-radio",{attrs:{label:"disable"},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},[e._v("禁用")])],1)],1):e._e(),e._v(" "),r("div",{staticStyle:{"text-align":"center"}},[r("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(t){e.createdBanner()}}},[e._v("提交")])],1)],1),e._v(" "),r("div",{staticClass:"pat"},[e.count?r("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":e.filter.limit,total:e.count},on:{"current-change":e.currentPage}}):e._e()],1)],1)},staticRenderFns:[]};var d=r("VU/8")(c,u,!1,function(e){r("wIHD")},"data-v-09cbeca2",null);t.default=d.exports},wIHD:function(e,t){}});