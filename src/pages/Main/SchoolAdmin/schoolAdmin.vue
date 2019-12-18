<template>
  <div class="box">
    <header-tit img="scT.png" back="1" tit="校区管理" />
     <div class="top">
      <div class="add">
        <div >
           <el-button type="primary" @click="$router.push('/schoolDetail')">新增</el-button>
        </div>
        <div>
          
        <el-button type="danger" @click="deleteSchool()">删除</el-button>
        </div>
      </div>
    </div>
    <el-table  ref="multipleTable" :data="tableData3"  @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%" >
      <el-table-column  type="selection"  width="55"> </el-table-column>
      <el-table-column  label="ID" prop="id" > </el-table-column>
      <el-table-column  label="校区名称" prop="name"> </el-table-column>
      <el-table-column  label="经度" prop="address.lng"> </el-table-column>
      <el-table-column  label="维度" prop="address.lat"> </el-table-column>
      <!-- <el-table-column  label="区域" prop="name"> </el-table-column> -->
      <el-table-column  label="详细地址" prop="address.detail"> </el-table-column>
      <el-table-column  label="图片">
        <template slot-scope="scope">
          <img class="img" :src="scope.row.imageUrls[0]" alt="">
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="200">
        <template slot-scope="scope" >
          <el-button size="mini" @click="$router.push('schoolDetail?id='+scope.row.id)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteSchool(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pat">
      <el-pagination v-if="count" background layout="prev, pager, next" @current-change="currentPage" :page-size="filter.limit" :total="count"></el-pagination>
    </div>
  </div>
</template>
<script>
import { School } from "api"

export default {
  data () {
    return {
      tableData3: [],
      filter: {
        offset: 0,
        limit: 10,
        district: ""
      },
      ids: [],
      count: 0
    }
  },

  created () {
    this.querySchool()
  },

  methods: {
    async querySchool () {
      let res = await School.querySchool(this.filter)
      this.tableData3 = res.data
      this.count = res.count
    },

    async deleteSchool (id) {
      await this.$confirm("确认要执行此操作吗")
      await School.deleteSchool(id ? [id] : this.ids)
      this.querySchool()
    },

    currentPage (e) {
      this.filter.offset = e * this.filter.limit - 1
      this.querySchool()
    },

    handleSelectionChange (e) {
      this.ids = e.map(item => item.id)
    },

    pageChange (e) {
      this.filter.offset = this.filter.offset + this.filter.limit
      this.querySchool()
    },

    pageChangePre (e) {
      this.filter.offset = this.filter.offset - this.filter.limit
      this.querySchool()
    }
  }
}
</script>
<style lang="less" scoped>
.add {
  color: #656565;
  font-size: 15px;
  text-align: right;
  margin: 20px 0;
  margin-right: 20px;
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
.blue{
  color: blue;
}
.btn {
  width: 0.90rem;
}
.img {
  width: 100px;
  height: 100px;
}
</style>
