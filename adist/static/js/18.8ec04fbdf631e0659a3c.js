webpackJsonp([18],{oJ8B:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=e("Xxa5"),n=e.n(s),i=e("exGp"),l=e.n(i),r=e("gyMJ"),v={data:function(){return{detail:{},dialogVisible:!1,orderStatu:"",notes:"",orderStatus:[{value:"UNDO",name:"待上课"},{value:"DONE",name:"已上课"},{value:"REJECT",name:"拒上课"}]}},created:function(){this.querySchoolDetail()},methods:{querySchoolDetail:function(){var a=this;return l()(n.a.mark(function t(){var e,s;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.g.querySchoolDetail(a.$route.query.id);case 2:e=t.sent,s=e.data,a.detail=s,a.orderStatu=s.status;case 6:case"end":return t.stop()}},t,a)}))()},updateOrder:function(){var a=this;return l()(n.a.mark(function t(){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.g.updateSchool(a.detail.id,a.orderStatu,a.notes);case 2:a.$message.success("成功"),a.dialogVisible=!1,a.querySchoolDetail();case 5:case"end":return t.stop()}},t,a)}))()}}},_={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"box"},[e("header-tit",{attrs:{img:"orderT.png",tit:"订单管理",back:"1"}}),a._v(" "),e("div",{staticClass:"wrap"},[e("h2",[a._v("订单详情:")]),a._v(" "),a._l(a.detail.items,function(t,s){return e("div",{key:s,staticClass:"orderList"},[e("div",{staticClass:"pic"},[e("img",{attrs:{src:t.coverUrl,alt:""}})]),a._v(" "),e("div",{staticClass:"dataInfo"},[e("h5",{staticClass:"title"},[a._v(a._s(t.name))]),a._v(" "),e("p",[e("span",[a._v("课程简介：")]),a._v(" "),e("span",[a._v(a._s(t.ad))])]),a._v(" "),e("p",[e("span",[a._v("课      次： ")]),a._v(" "),e("span",[a._v(a._s(t.classQty))])]),a._v(" "),e("p",[e("span",[a._v("授课教师：")]),a._v(" "),e("span",[a._v(a._s(t.name))])])]),a._v(" "),e("div",{staticClass:"price"},[e("p",[a._v("￥"+a._s(t.price/100))])])])}),a._v(" "),e("div",{staticClass:"wrapper"},[e("ul",{staticClass:"orderInfo"},[e("li",[e("span",{staticClass:"name"},[a._v("订单号：")]),a._v(" "),e("span",[a._v(a._s(a.detail.id))])]),a._v(" "),e("li",[e("span",{staticClass:"name"},[a._v("学员姓名：")]),a._v(" "),e("span",[a._v(a._s(a.detail.header.userName))])]),a._v(" "),e("li",[e("span",{staticClass:"name"},[a._v("学员电话：")]),a._v(" "),e("span",[a._v(a._s(a.detail.header.mobile))])]),a._v(" "),e("li",[e("span",{staticClass:"name"},[a._v("授课校区：")]),a._v(" "),e("span",[a._v(a._s(a.detail.header.campusAddress))])])]),a._v(" "),e("div",{staticClass:"orderwrapper"},[e("ul",{staticClass:"orderInfo"},[e("li",[e("span",{staticClass:"name"},[a._v("课程原价：")]),a._v(" "),e("span",[a._v("￥"+a._s(a.detail.payment.originAmount/100))])]),a._v(" "),e("li",[e("span",{staticClass:"name"},[a._v("优惠支付金额：")]),a._v(" "),e("span",[a._v("￥"+a._s(a.detail.payment.actualAmount/100))])]),a._v(" "),e("li",[e("span",{staticClass:"name"},[a._v("优惠折扣：")]),a._v(" "),e("span",[a._v(a._s(a.detail.payment.percent/10)+"折")])]),a._v(" "),e("li",[e("span",{staticClass:"name"},[a._v("实付付款金额：")]),a._v(" "),e("span",[a._v("￥"+a._s(a.detail.payment.payAmount/100))])]),a._v(" "),e("li",[e("span",{staticClass:"name"},[a._v("支付方式：")]),a._v(" "),"WEB"==a.detail.payment.payType?e("span",[a._v("网页")]):a._e(),a._v(" "),"H5"==a.detail.payment.payType?e("span",[a._v("H5")]):a._e(),a._v(" "),"WECHAT_PUBLIC_NUMBER"==a.detail.payment.payType?e("span",[a._v("公众号")]):a._e(),a._v(" "),"MINI_APP "==a.detail.payment.payType?e("span",[a._v("微信小程序")]):a._e()])]),a._v(" "),e("ul",{staticClass:"orderInfo"},[e("li",[e("span",{staticClass:"name"},[a._v("建单时间：")]),a._v(" "),e("span",[a._v(a._s(a._f("formatDate")(a.detail.creationTime)))])]),a._v(" "),e("li",[e("span",{staticClass:"name"},[a._v("支付时间：")]),a._v(" "),e("span",[a._v(a._s(a._f("formatDate")(a.detail.payment.payTime)))])]),a._v(" "),e("li",[e("span",{staticClass:"name"},[a._v("支付信息 微信付款凭证：")]),a._v(" "),e("span",[a._v(a._s(a.detail.payment.voucher))])])])])]),a._v(" "),e("div",{staticClass:"tips"},[e("h2",{staticClass:"marginB-2"},[a._v("注明:")]),a._v(" "),e("div",{staticClass:"state"},[e("p",{staticClass:"marginB-1"},[e("span",[a._v("上课状态：")]),a._v(" "),e("button",{staticClass:"btn",on:{click:function(t){a.dialogVisible=!0}}},[a._v("修改状态")])]),a._v(" "),e("p",[e("span",[a._v("备注详情：")]),a._v(" "),e("span",[a._v(a._s(a.detail.notes))])])]),a._v(" "),e("div",{staticClass:"state"},[e("p",[e("span",[a._v("操作人：")]),a._v(" "),e("span",[a._v(a._s(a.detail.operates[0].name))])]),a._v(" "),e("p",[e("span",[a._v("操作时间：")]),a._v(" "),e("span",[a._v(a._s(a._f("formatDate")(a.detail.operates[0].creationTime)))])])])]),a._v(" "),e("div",{staticClass:"orderBtn"})],2),a._v(" "),e("el-dialog",{attrs:{title:"修改状态",visible:a.dialogVisible,width:"30%"},on:{"update:visible":function(t){a.dialogVisible=t}}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:a.orderStatu,callback:function(t){a.orderStatu=t},expression:"orderStatu"}},a._l(a.orderStatus,function(a){return e("el-option",{key:a.value,attrs:{label:a.name,value:a.value}})})),a._v(" "),e("el-form",["REJECT"==a.orderStatu?e("el-form-item",{attrs:{label:"拒绝上课原因"}},[e("el-input",{model:{value:a.notes,callback:function(t){a.notes=t},expression:"notes"}})],1):a._e()],1),a._v(" "),e("span",{staticClass:"dialog-footer mar",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){a.dialogVisible=!1}}},[a._v("取 消")]),a._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:function(t){a.updateOrder()}}},[a._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=e("VU/8")(v,_,!1,function(a){e("wvCc")},"data-v-534bf594",null);t.default=o.exports},wvCc:function(a,t){}});