webpackJsonp([25],{YUaW:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Xxa5"),o=r.n(a),l=r("exGp"),s=r.n(l),n=r("gyMJ"),i=function(){return{name:"",password:"",phone:"",post:"",right:"",roles:[],campusId:""}},u={data:function(){return{list:[],count:0,diaLog:!1,radio:"1",filter:{offset:0,limit:10},ruleForm:null,rules:{name:[{required:!0,message:"请输入用户名称",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"}],phone:[{required:!0,message:"请输入联系方式",trigger:"change"}],post:[{required:!0,message:"请输入人员职位",trigger:"change"}],right:[{required:!0,message:"请输入支持权限",trigger:"change"}],roles:[{required:!0,message:"请选择平台角色",trigger:"change"}],campusId:[{required:!0,message:"请选择校区",trigger:"change"}]}}},watch:{diaLog:function(e){e||(this.ruleForm=null)}},created:function(){this.BaseConfig()},methods:{BaseConfig:function(){var e=this;return s()(o.a.mark(function t(){var r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.queryChilAccount(e.filter);case 2:r=t.sent,e.list=r.data,e.count=r.count;case 5:case"end":return t.stop()}},t,e)}))()},createdDiction:function(){var e=this;return s()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$refs.ruleForm.validate();case 2:return e.ruleForm.roles=[e.ruleForm.roles],t.next=5,n.a.createdChilAccount(e.ruleForm);case 5:e.$message.success("创建成功"),e.diaLog=!1,e.BaseConfig();case 8:case"end":return t.stop()}},t,e)}))()},showDiaLog:function(e){var t=this;return s()(o.a.mark(function r(){var a;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(!e){r.next=8;break}return r.next=3,n.a.queryChilAccountDetail(e);case 3:a=r.sent,t.ruleForm=a.data,t.ruleForm.roles=t.ruleForm.roles[0],r.next=9;break;case 8:t.ruleForm=new i;case 9:t.diaLog=!0;case 10:case"end":return r.stop()}},r,t)}))()},currentPage:function(e){this.filter.offset=e*this.filter.limit-1,this.BaseConfig()},deleteDiction:function(e){var t=this;return s()(o.a.mark(function r(){return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.$confirm("确认要执行此操作吗");case 2:return r.next=4,n.a.deletechilAccount([e]);case 4:t.BaseConfig();case 5:case"end":return r.stop()}},r,t)}))()},pageChange:function(e){this.filter.offset=this.filter.offset+this.filter.limit-1,this.BaseConfig()},pageChangePre:function(e){this.filter.offset=this.filter.offset-this.filter.limit,this.BaseConfig()}}},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"box"},[r("header-tit",{attrs:{img:"chiT.png",tit:"子管理员"}}),e._v(" "),r("div",{staticClass:"top"},[r("div",{staticClass:"add"},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.showDiaLog()}}},[e._v("新增")])],1)]),e._v(" "),r("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.list}},[r("el-table-column",{attrs:{label:"ID",prop:"id"}}),e._v(" "),r("el-table-column",{attrs:{label:"用户名",prop:"name"}}),e._v(" "),r("el-table-column",{attrs:{label:"职位",prop:"post"}}),e._v(" "),r("el-table-column",{attrs:{label:"手机号",prop:"phone"}}),e._v(" "),r("el-table-column",{attrs:{label:"密码",prop:"password"}}),e._v(" "),r("el-table-column",{attrs:{label:"支持权限",prop:"right"}}),e._v(" "),r("el-table-column",{attrs:{label:"注册时间",prop:"date"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",[e._v(e._s(e._f("formatDate")(t.row.creationTime)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini"},on:{click:function(r){e.showDiaLog(t.row.id)}}},[e._v("编辑")]),e._v(" "),r("el-button",{attrs:{size:"mini",type:"danger"}},[e._v("删除")])]}}])})],1),e._v(" "),r("div",{staticClass:"pat"},[e.count?r("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":e.filter.limit,total:e.count},on:{"current-change":e.currentPage}}):e._e()],1),e._v(" "),r("el-dialog",{attrs:{title:"新增 自管理员",visible:e.diaLog},on:{"update:visible":function(t){e.diaLog=t}}},[e.ruleForm?r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[r("el-form-item",{attrs:{label:"用户名称",prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入用户名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"联系方式",prop:"phone"}},[r("el-input",{attrs:{placeholder:"请输入联系方式"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"人员职位",prop:"post"}},[r("el-input",{attrs:{placeholder:"请输入人员职位"},model:{value:e.ruleForm.post,callback:function(t){e.$set(e.ruleForm,"post",t)},expression:"ruleForm.post"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"支持权限",prop:"right"}},[r("el-input",{attrs:{placeholder:"请输入支持权限"},model:{value:e.ruleForm.right,callback:function(t){e.$set(e.ruleForm,"right",t)},expression:"ruleForm.right"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"关联校区",prop:"campusId "}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.campusId,callback:function(t){e.$set(e.ruleForm,"campusId",t)},expression:"ruleForm.campusId"}},e._l(this.$store.state.BaseConfig.schools,function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{attrs:{placeholder:"请输入密码"},model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"roles"}},[r("el-radio",{attrs:{label:"PLATFORM"},model:{value:e.ruleForm.roles,callback:function(t){e.$set(e.ruleForm,"roles",t)},expression:"ruleForm.roles "}},[e._v("平台工作者")]),e._v(" "),r("el-radio",{attrs:{label:"OTHER"},model:{value:e.ruleForm.roles,callback:function(t){e.$set(e.ruleForm,"roles",t)},expression:"ruleForm.roles "}},[e._v("其他")])],1)],1):e._e(),e._v(" "),r("div",{staticStyle:{"text-align":"center"}},[r("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(t){e.createdDiction()}}},[e._v("确认新增")])],1)],1)],1)},staticRenderFns:[]};var m=r("VU/8")(u,c,!1,function(e){r("soNY")},"data-v-29c7f292",null);t.default=m.exports},soNY:function(e,t){}});