<template>
  <div class="box">
    <header-tit img="spT.png" tit="专题管理"/>
    <div class="top">
      <div class="add">
        <div>
          <el-button type="primary"  @click="$router.push('/createdSpecial')">新增</el-button>
        </div>
      </div>
    </div>
    <el-table :data="tableData3" style="width: 100%">
      <el-table-column prop="id" label="专题ID" width="180"></el-table-column>
      <el-table-column prop="name" label="专题名称"></el-table-column>
      <!-- <el-table-column label="专题封面">
        <template slot-scope="scope" >
          <img :src="scope.row.webUrl" class="img" alt="">
        </template>
      </el-table-column>-->
      <el-table-column prop="submitQty" label="表单数量/个"></el-table-column>
      <el-table-column prop="webUrl" label="地址"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <div>{{scope.row.creationTime | formatDate}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="ID" label="操作" width="350">
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push('/createdSpecial?id='+scope.row.id)">修改</el-button>
          <el-button size="mini" type="danger" @click="routerFrom(scope.row.id)">查看表单数据</el-button>
          <el-button size="mini" type="primary" class="upload">
            上传专题页
            <input type="file" name id="file" @change="upload(this, scope.row.id)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pat">
      <el-pagination
        v-if="count"
        background
        layout="prev, pager, next"
        :page-size="filter.limit"
        @current-change="currentPage" 
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { OnlyContent } from "api"
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
      let res = await OnlyContent.querySchool(this.filter)
      this.tableData3 = res.data
      this.count = res.count
    },

    async deleteSchool (id) {
      await this.$confirm("确认要执行此操作吗")
      await OnlyContent.deleteSchool(id ? [id] : this.ids)
      this.querySchool()
    },

    currentPage (e) {
      this.filter.offset = e * this.filter.limit - 1
      this.querySchool()
    },

    routerFrom (e) {
      // this.$store.commit("Account/SAVE_TITLE", e)
      this.$router.push("/specialDetail?id=" + e)
    },

    handleSelectionChange (e) {
      this.ids = e.map(item => item.id)
    },

    pageChange (e) {
      this.filter.offset = this.filter.offset + this.filter.limit - 1
      this.querySchool()
    },

    pageChangePre (e) {
      this.filter.offset = this.filter.offset - this.filter.limit
      this.querySchool()
    },

    async upload (e, id) {
      var f = document.getElementById("file").files
      console.log(f[0].name)
      if (f[0].name.includes(".rar") || f[0].name.includes(".zip")) {
        let file = f[0]
        let formData = new FormData()
        formData.append("file", file)
        await OnlyContent.upload(formData, f[0].name, id)
        this.$message.success("上传成功")
        this.querySchool()
      } else {
        return this.$message("请上传压缩包")
      }
    }
  }
}
</script>
<style lang="less" scoped>
#file {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.upload {
  position: relative;
}
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
.img {
  width: 100px;
  height: 100px;
}
</style>
