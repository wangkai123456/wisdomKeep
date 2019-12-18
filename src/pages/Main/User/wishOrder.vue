<template>
  <div class="box">
    <header-tit img="ueT.png" tit="用户管理" back="1"/>
    <div class="wrap">
      <h2>心愿单:</h2>
      <div class="orderList">
        <div class="item" v-for="(item, i) in tableData3" :key="i">
          <div class="pic">
            <img :src="item.coverUrl " alt>
          </div>
          <div class="dataInfo">
            <h5 class="title">{{item.name}}</h5>
            <p>
              <span>课程简介：</span>
              <span>{{item.desc}}</span>
            </p>
            <p>
              <span>课&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;次：&nbsp;</span>
              <span>{{item.classTime}}</span>
            </p>
            <p>
              <span>授课教师：</span>
              <span>{{item.teacherName}}</span>
            </p>
          </div>
          <div class="price">
            <p>￥{{item.price}}</p>
          </div>
          <el-row>
            <el-button class type="primary">{{item.status == "DONE" ? "已购买" : "未购买" }}</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <div class="pat">
      <el-pagination
        v-if="count"
        background
        layout="prev, pager, next"
        :current-page.sync="filter.offset"
        :page-size="filter.limit"
        @current-change="currentPage"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { Wish } from "api"

export default {
  data () {
    return {
      tableData3: [],
      filter: {
        offset: 0,
        limit: 10
      },
      ids: [],
      count: 0,
      grades: [],
      subjects: []
    }
  },

  watch: {
    filter: {
      handler () {
        this.querySchool()
      },
      deep: true
    }
  },

  async created () {
    this.filter.userId = this.$route.query.id
    this.querySchool()
  },

  methods: {
    async querySchool () {
      let res = await Wish.queryWish(this.filter)
      this.tableData3 = res.data
      this.count = res.count
    },

     currentPage (e) {
      this.filter.offset = e * this.filter.limit - 1
      this.querySchool()
    },
  }
}
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  background: #fff;
}
.marginB-1 {
  margin-bottom: 10px;
}
.marginB-2 {
  margin-bottom: 20px;
}
.marginT-2 {
  margin-top: 20px;
}
.wrap {
  width: 80%;
  margin: 0 auto;
  background: white;
}
.wrap h2 {
  line-height: 30px;
  font-size: 18px;
  color: #444;
  margin: 30px 0;
}
.orderList {
  width: 100%;
  margin: 20px 0;
}
.orderList .item {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.orderList .pic {
  width: 140px;
  height: 120px;
  overflow: hidden;
}
.orderList .pic img {
  width: 100%;
  height: 100%;
}
.price {
  width: 20%;
  text-align: center;
}
.dataInfo {
  width: 500px;
  flex: 1;
  padding-left: 20px;
  /*height:80px;*/
  line-height: 30px;
  font-size: 14px;
}
.dataInfo .title {
  color: #59a9de;
}
.orderInfo {
  font-size: 14px;
  list-style: none;
  line-height: 30px;
  color: #626262;
  margin-bottom: 20px;
}
.orderInfo span.name {
  width: 200px;
  display: inline-block;
}
</style>
