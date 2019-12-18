<template>
  <div class="box">
    <header-tit img="orderT.png" tit="订单管理" back="1"/>
    <div class="wrap">
      <h2>订单详情:</h2>
      <div class="orderList" v-for="(item, i) in detail.items" :key="i">
        <!-- <div > -->
        <div class="pic">
          <img :src="item.coverUrl" alt>
        </div>
        <div class="dataInfo">
          <h5 class="title">{{item.name}}</h5>
          <p>
            <span>课程简介：</span>
            <span>{{item.ad}}</span>
          </p>
          <p>
            <span>课&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;次：&nbsp;</span>
            <span>{{item.classQty}}</span>
          </p>
          <p>
            <span>授课教师：</span>
            <span>{{item.name}}</span>
          </p>
        </div>
        <div class="price">
          <p>￥{{item.price/100}}</p>
        </div>
        <!-- </div> -->
      </div>
      <div class="wrapper">
        <ul class="orderInfo">
          <li>
            <span class="name">订单号：</span>
            <span>{{detail.id}}</span>
          </li>
          <li>
            <span class="name">学员姓名：</span>
            <span>{{detail.header.userName}}</span>
          </li>
          <li>
            <span class="name">学员电话：</span>
            <span>{{detail.header.mobile}}</span>
          </li>
          <li>
            <span class="name">授课校区：</span>
            <span>{{detail.header.campusAddress}}</span>
          </li>
        </ul>
        <div class="orderwrapper">
          <ul class="orderInfo">
            <li>
              <span class="name">课程原价：</span>
              <span>￥{{detail.payment.originAmount/100}}</span>
            </li>
            <li>
              <span class="name">优惠支付金额：</span>
              <span>￥{{detail.payment.actualAmount /100}}</span>
            </li>
            <li>
              <span class="name">优惠折扣：</span>
              <span>{{detail.payment.percent / 10}}折</span>
            </li>
            <li>
              <span class="name">实付付款金额：</span>
              <span>￥{{detail.payment.payAmount / 100}}</span>
            </li>
            <li>
              <span class="name">支付方式：</span>
              <span v-if="detail.payment.payType == 'WEB'">网页</span>
              <span v-if="detail.payment.payType == 'H5'">H5</span>
              <span v-if="detail.payment.payType == 'WECHAT_PUBLIC_NUMBER'">公众号</span>
              <span v-if="detail.payment.payType == 'MINI_APP '">微信小程序</span>
            </li>
          </ul>
          <ul class="orderInfo">
            <li>
              <span class="name">建单时间：</span>
              <span>{{detail.creationTime | formatDate}}</span>
            </li>
            <li>
              <span class="name">支付时间：</span>
              <span>{{ detail.payment.payTime | formatDate }}</span>
            </li>
            <li>
              <span class="name">支付信息 微信付款凭证：</span>
              <span>{{detail.payment.voucher }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="tips">
        <h2 class="marginB-2">注明:</h2>
        <div class="state">
          <p class="marginB-1">
            <span>上课状态：</span>
            <button class="btn" @click="dialogVisible = true">修改状态</button>
          </p>
          <p>
            <span>备注详情：</span>
            <span>{{detail.notes }}</span>
          </p>
        </div>
        <div class="state">
          <p>
            <span>操作人：</span>
            <span>{{detail.operates[0].name}}</span>
          </p>
          <p>
            <span>操作时间：</span>
            <span>{{detail.operates[0].creationTime | formatDate}}</span>
          </p>
        </div>
      </div>
      <div class="orderBtn">
        <!-- <button class="btn">确&nbsp;&nbsp;认</button> -->

      </div>
    </div>
    <el-dialog title="修改状态" :visible.sync="dialogVisible" width="30%">
      <el-select v-model="orderStatu" placeholder="请选择">
        <el-option
          v-for="item in orderStatus"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
			<el-form >
			<el-form-item label="拒绝上课原因" v-if="orderStatu == 'REJECT'">
				<el-input v-model="notes"></el-input>
			</el-form-item>
			</el-form>
      <span slot="footer" class="dialog-footer mar">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateOrder()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Order } from "api"
export default {
  data () {
    return {
      detail: {},
      dialogVisible: false,
      orderStatu: "",
      notes: "",
      orderStatus: [
        {value: "UNDO", name: "待上课"},
        {value: "DONE", name: "已上课"},
        {value: "REJECT", name: "拒上课"}
      ]
    }
  },

  created () {
    this.querySchoolDetail()
  },

  methods: {
    async querySchoolDetail () {
      let { data } = await Order.querySchoolDetail(this.$route.query.id)

      this.detail = data
      this.orderStatu = data.status
    },

    async updateOrder () {
      await Order.updateSchool(this.detail.id, this.orderStatu, this.notes)
      this.$message.success("成功")
      this.dialogVisible = false
      this.querySchoolDetail()
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
	background: #fff;
	overflow: hidden
}
.marginB-1 {
  margin-bottom: 10px;
}
.marginB-2 {
  margin-bottom: 20px;
}
.wrap {
  width: 80%;
  margin: 0 auto;
  background: white;
}
.wrap h2 {
  font-size: 18px;
  color: #8a8a8a;
  margin: 10px 0;
}
.orderList {
  width: 50%;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.orderList .pic {
  width: 100px;
  height: 100px;
  overflow: hidden;
}
.orderList .pic img {
  width: 100px;
  height: 100px;
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
.orderwrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.tips .state {
  font-size: 14px;
  color: #626262;
  line-height: 30px;
  margin: 20px 0;
}
.btn {
  border-radius: 5px;
  color: #fff;
  padding: 10px;
  border: none;
  background: #59a9de;
}
.orderBtn {
  width: 100%;
  margin-bottom: 100px;
  text-align: center;
}
.orderBtn button {
  font-size: 20px;
  width: 30%;
}
</style>
