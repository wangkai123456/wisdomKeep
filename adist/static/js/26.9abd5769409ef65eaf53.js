webpackJsonp([26],{"5w1D":function(e,t){},pwbO:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Xxa5"),s=r.n(a),o=r("exGp"),n=r.n(o),i=r("/IwO"),l=r("gyMJ"),c={data:function(){return{map:null,address:"",ruleForm:{address:{city:"",detail:"",district:"",lat:"",lng:"",provice:""},imageUrls:[],isDelete:!1,name:"",phone:"",website:"",workDay:""},rules:{name:[{required:!0,message:"请输入校区名",trigger:"change"}],"address.detail":[{required:!0,message:"请输入地址",trigger:"change"}],website:[{required:!0,message:"请输入校区网址",trigger:"change"}],imageUrls:[{required:!0,type:"array",message:"请上传图片",trigger:"change"}]}}},created:function(){var e=this;return n()(s.a.mark(function t(){var r,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$route.query.id){t.next=5;break}return t.next=3,l.h.querySchoolDetail(e.$route.query.id);case 3:r=t.sent,e.ruleForm=r.data;case 5:return t.next=7,l.a.queryQnToken();case 7:a=t.sent,e.$store.commit("Account/QUERY_QTOKEN",a.data);case 9:case"end":return t.stop()}},t,e)}))()},mounted:function(){var e=this;return n()(s.a.mark(function t(){var r,a,o,n,l,c;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return c=function(e){a.setCity(e.poi.adcode),a.search(e.poi.name)},t.next=3,i.lazyAMapApiLoaderInstance.load();case 3:r=new AMap.Map("amap-main",{enableHighAccuracy:!0,timeout:1e4,zoomToAccuracy:!0,buttonPosition:"RB",buttonOffset:new AMap.Pixel(10,20)}),a=new AMap.PlaceSearch({map:r}),o=new AMap.Marker({map:r,bubble:!0}),r.on("click",function(t){var r=t.lnglat.getLng(),a=t.lnglat.getLat();e.ruleForm.address.lat=a,e.ruleForm.address.lng=r,o.setPosition(t.lnglat),AMap.service("AMap.Geocoder",function(){new AMap.Geocoder({}).getAddress([r,a],function(t,r){"complete"===t&&"OK"===r.info&&(e.ruleForm.address.city=r.regeocode.addressComponent.city,e.ruleForm.address.district=r.regeocode.addressComponent.district,e.ruleForm.address.provice=r.regeocode.addressComponent.provice,e.ruleForm.address.detail=r.regeocode.formattedAddress)})})}),n={input:"tipinput"},l=new AMap.Autocomplete(n),AMap.event.addListener(l,"select",c);case 10:case"end":return t.stop()}},t,e)}))()},methods:{createdSchool:function(){var e=this;return n()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$refs.ruleForm.validate();case 2:return t.next=4,l.h.createdSchool(e.ruleForm);case 4:e.$message.success("成功"),e.$router.push("schoolAdmin");case 6:case"end":return t.stop()}},t,e)}))()},successFile:function(e){this.ruleForm.imageUrls=[],this.ruleForm.imageUrls=[this.$store.state.Account.QnInfo.domainName+e.key]}}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"box"},[r("header-tit",{attrs:{img:"scT.png",tit:"校区管理",back:"1"}}),e._v(" "),r("div",{staticClass:"from_box"},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"新增校区",prop:"name"}},[r("el-input",{staticClass:"ipt",model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"地址",prop:"address.detail"}},[r("el-input",{staticClass:"ipt",attrs:{id:"tipinput",placeholder:"请输入地址"},model:{value:e.ruleForm.address.detail,callback:function(t){e.$set(e.ruleForm.address,"detail",t)},expression:"ruleForm.address.detail"}})],1),e._v(" "),r("el-form-item",[r("div",{attrs:{id:"amap-main"}})]),e._v(" "),r("el-form-item",{attrs:{label:"校区网址",prop:"website"}},[r("el-input",{staticClass:"ipt",attrs:{placeholder:"请输入校区网址"},model:{value:e.ruleForm.website,callback:function(t){e.$set(e.ruleForm,"website",t)},expression:"ruleForm.website"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"主页图片",prop:"imageUrls"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{data:{token:e.$store.state.Account.QnInfo.token},action:"http://up-z0.qiniu.com","show-file-list":!1,"on-success":e.successFile}},[e.ruleForm.imageUrls[0]?r("img",{staticClass:"avatar",attrs:{src:e.ruleForm.imageUrls[0]}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),e._v(" "),r("div",{staticClass:"mar",staticStyle:{"text-align":"center"}},[r("el-button",{staticStyle:{width:"182px"},attrs:{type:"primary"},on:{click:function(t){e.createdSchool()}}},[e._v("确认新增")])],1)],1)],1)},staticRenderFns:[]};var d=r("VU/8")(c,u,!1,function(e){r("5w1D")},"data-v-18271ff9",null);t.default=d.exports}});