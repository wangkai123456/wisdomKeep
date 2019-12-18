<template>
  <div class="box">
    <header-tit img="newT.png" tit="新闻资讯"/>
    <div class="top">
      <div>
        <el-button type="primary" @click="$router.push('/newMsgDetail')">添加文章</el-button>
        <el-button type="primary" @click="updateStatus('ON')">签发</el-button>
        <el-button type="primary" @click="updateStatus('OFF')">撤稿</el-button>
        <el-button type="danger" @click="deleteSchool()">删除</el-button>
      </div>
    </div>
    <el-table  :data="tableData3" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope" >
          {{scope.row.status == "OFF" ? "撤稿" : "签发"}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="columnName" label="文章栏目"></el-table-column>
      <el-table-column label="录入时间">
        <template slot-scope="scope">
          <div>{{scope.row.creationTime | formatDate}}</div>
        </template>
      </el-table-column>
      <el-table-column label="修改时间">
        <template slot-scope="scope">
          <div>{{scope.row.modifiedTime | formatDate}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="ID" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push('/newMsgDetail?id='+scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pat">
      <el-pagination
        v-if="count"
        background
        layout="prev, pager, next"
        :page-size="filter.limit"
        @next-click="pageChange"
        @prev-click="pageChangePre"
        :total="count"
        @current-change="currentPage" 
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { NewMsg } from "api"

export default {
  data () {
    return {
      tableData3: [],
      filter: {
        offset: 0,
        limit: 10,
        columId: ""
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
        this.queryMsg()
      },
      deep: true
    }
  },

  async created () {
    this.queryMsg()
  },

  methods: {
    async queryMsg () {
      let res = await NewMsg.queryMsg(this.filter)
      this.tableData3 = res.data
      this.count = res.count
    },

    async updateStatus (status) {
      if (!this.ids.length) return this.$message("请选择您要签发/撤稿/删除的文章")
      await NewMsg.updateStatus(this.ids, status)
      this.queryMsg()
      this.$message.success("成功")
      this.queryMsg()
    },

    currentPage (e) {
      this.filter.offset = e * this.filter.limit - 1
      this.queryMsg()
    },

    async deleteSchool (id) {
      if (!this.ids.length) return this.$message("请选择您要签发/撤稿/删除的文章")
      await this.$confirm("确认要执行此操作吗")
      await NewMsg.deleteMsg(id ? [id] : this.ids)
      this.queryMsg()
    },

    handleSelectionChange (e) {
      this.ids = e.map(item => item.id)
    },

    pageChange (e) {
      this.filter.offset = this.filter.offset + this.filter.limit
      // this.querySchool();
    },

    pageChangePre (e) {
      this.filter.offset = this.filter.offset - this.filter.limit
      // this.querySchool();
    }
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
    width: 250px;
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
  overflow: hidden;
  margin: 20px 0;
}
.top > div {
  float: right;
  margin-right: 30px;
}

</style>
