webpackJsonp([13],{"B/WA":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Xxa5"),n=a.n(r),l=a("exGp"),o=a.n(l),s=a("gyMJ"),c={data:function(){return{tableData3:[],filter:{offset:0,limit:10},ids:[],count:0,grades:[],subjects:[]}},watch:{filter:{handler:function(){this.querySchool()},deep:!0}},created:function(){var t=this;return o()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.querySchool();case 1:case"end":return e.stop()}},e,t)}))()},methods:{querySchool:function(){var t=this;return o()(n.a.mark(function e(){var a;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.j.querySchool(t.filter);case 2:a=e.sent,t.tableData3=a.data,t.count=a.count;case 5:case"end":return e.stop()}},e,t)}))()},currentPage:function(t){this.filter.offset=t*this.filter.limit-1,this.querySchool()}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("header-tit",{attrs:{img:"ueT.png",tit:"用户管理"}}),t._v(" "),a("el-table",{staticClass:"table",staticStyle:{width:"100%"},attrs:{data:t.tableData3}},[a("el-table-column",{attrs:{prop:"id",label:"ID",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"用户名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"mobile",label:"手机号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ID",label:"头像"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"img",attrs:{src:t.row.avatarUrl}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"昵称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ID",label:"是否微信权限"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.unionId?"是":"否"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"ID",label:"心愿单"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"red",on:{click:function(a){t.$router.push("/wishOrder?id="+e.row.id)}}},[t._v("查看心愿单")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"注册时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(t._f("formatDate")(e.row.createTime)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"ID",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"red",on:{click:function(a){t.$router.push("/userDetail?id="+e.row.id)}}},[t._v("查看用户详情")])]}}])})],1),t._v(" "),a("div",{staticClass:"pat"},[t.count?a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":t.filter.limit,total:t.count},on:{"current-change":t.currentPage}}):t._e()],1)],1)},staticRenderFns:[]};var u=a("VU/8")(c,i,!1,function(t){a("t3gj")},"data-v-97f99a06",null);e.default=u.exports},t3gj:function(t,e){}});