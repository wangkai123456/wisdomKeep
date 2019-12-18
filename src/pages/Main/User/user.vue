
<template>
  <div class="box">
    <header-tit img="ueT.png" tit="用户管理"/>
    <el-table :data="tableData3" class="table" style="width: 100%">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="ID" label="头像">
        <template slot-scope="scope">
          <img class="img" :src="scope.row.avatarUrl" />
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="ID" label="是否微信权限">

        <template slot-scope="scope" >
          <div>{{scope.row.unionId ? "是" : "否"}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="ID" label="心愿单">
        <template slot-scope="scope" >
          <div class="red" @click="$router.push('/wishOrder?id='+scope.row.id)">查看心愿单</div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间">
        <template slot-scope="scope">
          <div>{{scope.row.createTime | formatDate}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="ID" label="操作">
        <template slot-scope="scope">
          <div class="red" @click="$router.push('/userDetail?id='+scope.row.id)">查看用户详情</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pat">
      <el-pagination v-if="count" background layout="prev, pager, next"  @current-change="currentPage" :page-size="filter.limit"  :total="count"></el-pagination>
    </div>
  </div>
</template>
<script>
import { User } from "api"

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
    this.querySchool()
  },

  methods: {
    async querySchool () {
      let res = await User.querySchool(this.filter)
      this.tableData3 = res.data
      this.count = res.count
    },

    currentPage (e) {
      this.filter.offset = e * this.filter.limit - 1
      this.querySchool()
    }
  }
}
</script>

<style lang="less" scoped>
.table {
  margin-top: 50px;
}
.red {
  color: rgb(245, 90, 85);
}
.img {
  width: 100px;
  height: 100px;
}
</style>
