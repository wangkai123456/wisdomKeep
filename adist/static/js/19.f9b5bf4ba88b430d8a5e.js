webpackJsonp([19],{c2Ey:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),l=a.n(n),r=a("exGp"),i=a.n(r),o=a("gyMJ"),s={data:function(){return{tableData3:[],filter:{offset:0,limit:10,district:""},ids:[],count:0}},created:function(){this.querySchool()},methods:{querySchool:function(){var t=this;return i()(l.a.mark(function e(){var a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.h.querySchool(t.filter);case 2:a=e.sent,t.tableData3=a.data,t.count=a.count;case 5:case"end":return e.stop()}},e,t)}))()},deleteSchool:function(t){var e=this;return i()(l.a.mark(function a(){return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$confirm("确认要执行此操作吗");case 2:return a.next=4,o.h.deleteSchool(t?[t]:e.ids);case 4:e.querySchool();case 5:case"end":return a.stop()}},a,e)}))()},currentPage:function(t){this.filter.offset=t*this.filter.limit-1,this.querySchool()},handleSelectionChange:function(t){this.ids=t.map(function(t){return t.id})},pageChange:function(t){this.filter.offset=this.filter.offset+this.filter.limit,this.querySchool()},pageChangePre:function(t){this.filter.offset=this.filter.offset-this.filter.limit,this.querySchool()}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("header-tit",{attrs:{img:"scT.png",back:"1",tit:"校区管理"}}),t._v(" "),a("div",{staticClass:"top"},[a("div",{staticClass:"add"},[a("div",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.$router.push("/schoolDetail")}}},[t._v("新增")])],1),t._v(" "),a("div",[a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.deleteSchool()}}},[t._v("删除")])],1)])]),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData3,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{label:"ID",prop:"id"}}),t._v(" "),a("el-table-column",{attrs:{label:"校区名称",prop:"name"}}),t._v(" "),a("el-table-column",{attrs:{label:"经度",prop:"address.lng"}}),t._v(" "),a("el-table-column",{attrs:{label:"维度",prop:"address.lat"}}),t._v(" "),a("el-table-column",{attrs:{label:"详细地址",prop:"address.detail"}}),t._v(" "),a("el-table-column",{attrs:{label:"图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"img",attrs:{src:t.row.imageUrls[0],alt:""}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.$router.push("schoolDetail?id="+e.row.id)}}},[t._v("修改")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.deleteSchool(e.row.id)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"pat"},[t.count?a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":t.filter.limit,total:t.count},on:{"current-change":t.currentPage}}):t._e()],1)],1)},staticRenderFns:[]};var u=a("VU/8")(s,c,!1,function(t){a("jqIt")},"data-v-4de1b1f5",null);e.default=u.exports},jqIt:function(t,e){}});