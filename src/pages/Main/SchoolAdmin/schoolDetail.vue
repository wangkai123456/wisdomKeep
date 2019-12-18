<template>
  <div class="box">
    <header-tit img="scT.png" tit="校区管理" back="1"/>
    <div class="from_box">
      <el-form   :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="新增校区" prop="name">
          <el-input class="ipt" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address.detail">
          <el-input class="ipt" id="tipinput" v-model="ruleForm.address.detail" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item>
          <div id="amap-main"></div>
        </el-form-item>
        <el-form-item label="校区网址" prop="website">
          <el-input class="ipt" v-model="ruleForm.website" placeholder="请输入校区网址"></el-input>
        </el-form-item>
        <el-form-item label="主页图片" prop="imageUrls">
          <el-upload
            class="avatar-uploader"
            :data="{ token: $store.state.Account.QnInfo.token }"
            action="http://up-z0.qiniu.com"
            :show-file-list="false"
            :on-success="successFile"
          >
            <img v-if="ruleForm.imageUrls[0]" :src="ruleForm.imageUrls[0]" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div style="text-align:center" class="mar">
        <el-button style="width: 182px" @click="createdSchool()" type="primary">确认新增</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { lazyAMapApiLoaderInstance } from "vue-amap"
import { School, Account } from "api"

export default {
  data () {
    return {
      map: null,
      address: "",
      ruleForm: {
        address: {
          city: "",
          detail: "",
          district: "",
          lat: "",
          lng: "",
          provice: ""
        },
        imageUrls: [],
        isDelete: false,
        name: "",
        phone: "",
        website: "",
        workDay: ""
      },
      rules: {
        name: [{ required: true, message: "请输入校区名", trigger: "change" }],
        "address.detail": [
          { required: true, message: "请输入地址", trigger: "change" }
        ],
        website: [
          { required: true, message: "请输入校区网址", trigger: "change" }
        ],
        imageUrls: [
          {
            required: true,
            type: "array",
            message: "请上传图片",
            trigger: "change"
          }
        ]
      }
    }
  },

  async created () {
    if (this.$route.query.id) {
      let res = await School.querySchoolDetail(this.$route.query.id)
      this.ruleForm = res.data
    }
     let res = await Account.queryQnToken()
      this.$store.commit("Account/QUERY_QTOKEN", res.data)
  },

  async mounted () {
    await lazyAMapApiLoaderInstance.load()
    let map = new AMap.Map("amap-main", {
      // center: new AMap.LngLat(121.59996, 31.197646)
      enableHighAccuracy: true,
      // 设置定位超时时间，默认：无穷大
      timeout: 10000,
      zoomToAccuracy: true,
      //  定位按钮的排放位置,  RB表示右下
      buttonPosition: "RB",
      buttonOffset: new AMap.Pixel(10, 20)
    })
    let placeSearch = new AMap.PlaceSearch({ map }) // 构造地点查询类
    let marker = new AMap.Marker({
      map: map,
      bubble: true
    })
    map.on("click", e => {
      let lng = e.lnglat.getLng() // 经度
      let lat = e.lnglat.getLat() // 纬度
      this.ruleForm.address.lat = lat
      this.ruleForm.address.lng = lng
      marker.setPosition(e.lnglat)
      AMap.service("AMap.Geocoder", () => {
        // 回调函数
        var geocoder = ""
        geocoder = new AMap.Geocoder({})
        geocoder.getAddress([lng, lat], (status, result) => {
          if (status === "complete" && result.info === "OK") {
            console.log(result)
            // 获得了有效的地址信息:
            this.ruleForm.address.city = result.regeocode.addressComponent.city
            this.ruleForm.address.district = result.regeocode.addressComponent.district
            this.ruleForm.address.provice = result.regeocode.addressComponent.provice
            this.ruleForm.address.detail = result.regeocode.formattedAddress
          } else {
            // 获取地址失败
          }
        })
      })
    })
    // 输入提示
    let autoOptions = { input: "tipinput" }
    let auto = new AMap.Autocomplete(autoOptions)

    AMap.event.addListener(auto, "select", select) // 注册监听，当选中某条记录时会触发
    function select (e) {
      console.log(e)
      placeSearch.setCity(e.poi.adcode)
      placeSearch.search(e.poi.name) // 关键字查询查询
    }
  },

  methods: {
    async createdSchool () {
      await this.$refs["ruleForm"].validate()
      await School.createdSchool(this.ruleForm)
      this.$message.success("成功")
      this.$router.push("schoolAdmin")
    },

    successFile (e) {
      this.ruleForm.imageUrls = []
      this.ruleForm.imageUrls = [
        this.$store.state.Account.QnInfo.domainName + e.key
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.from_box {
  padding: 50px 150px;
}
.ipt {
  width: 80%;
}
#amap-main {
  width: 100%;
  height: 300px;
}
.img_box {
  width: 1.64rem;
  height: 1.23rem;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(191, 191, 191, 1);
  position: relative;
  margin: auto;
}
.img_box > div {
  text-align: center;
  .tit_font {
    text-align: center;
    width: 100%;
  }
  input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>
