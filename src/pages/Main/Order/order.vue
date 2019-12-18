<template>
  <div class="box">
    <header-tit img="orderT.png" tit="订单管理" />
    <el-form class="from">
    <el-radio style="margin-left:10px" v-model="filter.status" label="" >全部</el-radio>
    <el-radio  v-model="filter.status" label="PAYING" >待支付</el-radio>
    <el-radio v-model="filter.status" label="UNDO" >待上课</el-radio>
    <el-radio v-model="filter.status" label="DONE" >已上课</el-radio>
    <el-radio v-model="filter.status" label="REJECT" >拒绝上课</el-radio>
    <el-radio v-model="filter.status" label="CANCEL" >已取消</el-radio>
      <el-button class="btn" type="danger" @click="filter.offset = 0, querySchool()">确认</el-button>
      <el-form-item label="手机号搜索">
        <el-input class="fi" v-model="filter.mobile"></el-input>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input class="fi" v-model="filter.orderNo"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data="tableData3" style="width: 100%">
      <el-table-column prop="no" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="header.userName" label="姓名"></el-table-column>
      <el-table-column prop="header.mobile" label="联系方式"></el-table-column>
      <el-table-column prop="header.campusName" label="选择校区"></el-table-column>
      <el-table-column label="折扣价格">
        <template slot-scope="scope">
          <div>{{scope.row.payment.percent/10}}折</div>
        </template>
      </el-table-column>
      <el-table-column  label="实付金额">
        <template slot-scope="scope" >
          <div>{{scope.row.payment.payAmount/100}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="creationTime" label="建立时间">
        <template slot-scope="scope" >
          <div>{{scope.row.creationTime | formatDate}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="payTime" label="付款时间">
        <template slot-scope="scope" >
          <div>{{scope.row.payment.payTime | formatDate}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope" >
          <div v-if="scope.row.status == 'PAYING'">待支付</div>
          <div v-if="scope.row.status == 'UNDO'">待上课</div>
          <div v-if="scope.row.status == 'DONE'">以上课</div>
          <div v-if="scope.row.status == 'REJECT'">拒绝上课</div>
          <div v-if="scope.row.status == 'COMPLETED'">已完成</div>
          <div v-if="scope.row.status == 'CANCEL'">已取消</div>
        </template>
      </el-table-column>
      <el-table-column prop="ID" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push('orderDetail?id='+scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pat">
      <el-pagination v-if="count" background layout="prev, pager, next"  @current-change="currentPage" :page-size="filter.limit" :total="count"></el-pagination>
    </div>
  </div>
</template>
<script>
import { Order } from "api"

export default {
  data () {
    return {
      tableData3: [],
      filter: {
        offset: 0,
        limit: 10,
        status: "",
        orderNo: "",
        campusId: "",
        mobile: ""
      },
      ids: [],
      count: 0
    }
  },

  watch: {
    "filter.status" () {
      this.filter.offset = 0
      this.querySchool()
    }
  },

  created () {
    if (this.$store.state.Account.userInfo.right) {
      this.filter.campusId = this.$store.state.Account.userInfo.campusId
    }

    console.log(this.$store.state.Account.userInfo)
    this.querySchool()
  },

  methods: {
    async querySchool () {
      let res = await Order.querySchool(this.filter)
      this.tableData3 = res.data
      this.count = res.count
    },

    currentPage (e) {
      this.filter.offset = e * this.filter.limit - 1
      this.querySchool()
    },

    handleSelectionChange (e) {
      this.ids = e.map(item => item.id)
    },

    // pageChange (e) {
    //   this.filter.offset = this.filter.offset + this.filter.limit - 1
    //   this.querySchool()
    // },

    // pageChangePre (e) {
    //   this.filter.offset = this.filter.offset - this.filter.limit
    //   this.querySchool()
    // }
  }
}
</script>
<style lang="less" scoped>
.box {
  padding-bottom: 100px;
}
.from {
  overflow: hidden;
  margin-top: 30px;
  .el-form-item {
    width: 233px;
    float: right;
  }
  .fi {
    width: 150px;
  }
  .btn {
    width: 100px;
    height: 40px;
    margin-right: 20px;
    float: right;
  }
}
.top {
  margin: 20px 0;
  background: white;
  overflow: hidden;
  .add {
    color: #656565;
    font-size: 15px;
    float: right;
    margin-right: 20px;
    div {
      float: left;
      margin-left: 15px;
    }
    span {
      margin: 0 5px;
    }
  }
}
.pat {
  margin-top: 40px;
  text-align: center;
}
.el-radio.is-bordered+.el-radio.is-bordered {
  margin: 0;
}
.el-radio {
  margin-top: 16px;
}
</style>
