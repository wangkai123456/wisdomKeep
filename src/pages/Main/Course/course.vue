<template>
  <div class="box">
    <header-tit img="courT.png" tit="选课中心"/>
    <div class="from">
      <el-form label-width="180">
        <el-form-item label="商品名称" >
          <el-input class="fi" v-model="filter.name"></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="filter.gradeId" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="(item, i) in $store.state.BaseConfig.grades"
              :key="i"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科">
          <el-select v-model="filter.subjectId" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="(item, i) in $store.state.BaseConfig.subjects"
              :key="i"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学期">
          <el-select v-model="filter.termId" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="(item, i) in $store.state.BaseConfig.terms"
              :key="i"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button class="btn" type="danger">确认</el-button>
      </el-form>
    </div>
    <div class="top">
      <div class="add">
        <div >
          <el-button type="primary" @click="$router.push('/courseDetail')">新增</el-button>
        </div>
        <div>
          <el-button type="danger" @click="deleteSchool()">删除</el-button>
        </div>
      </div>
    </div>
    <el-table tooltip-effect="dark" @selection-change="handleSelectionChange"  :data="tableData3" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="课程名称"></el-table-column>
      <el-table-column prop="gradeName" label="年级"></el-table-column>
      <el-table-column prop="subjectName" label="学科"></el-table-column>
      <el-table-column prop="termName" label="学期"></el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          <div>
            {{scope.row.price/100}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="缩略图">
        <template slot-scope="scope">
          <img class="img" :src="scope.row.coverUrl" alt>
        </template>
      </el-table-column>
      <el-table-column prop="ID" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push('/courseDetail?id=' + scope.row.id)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteSchool(scope.row.id)">删除</el-button>
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
import { Course } from "api"

export default {
  data () {
    return {
      tableData3: [],
      filter: {
        offset: 0,
        limit: 10,
        name: "",
        subjectId: "",
        gradeId: "",
        termId: ""
      },
      ids: [],
      count: 0
    }
  },

  watch: {
    "filter.name" () {
      this.filter.offset = 0
      this.querySchool()
    },
    "filter.subjectId" () {
      this.filter.offset = 0
      this.querySchool()
    },
    "filter.gradeId" () {
      this.filter.offset = 0
      this.querySchool()
    },
    "filter.termId" () {
      this.filter.offset = 0
      this.querySchool()
    },
  },

  async created () {
    this.querySchool()
  },

  methods: {
    async querySchool () {
      let res = await Course.querySchool(this.filter)
      this.tableData3 = res.data
      this.count = res.count
    },

    currentPage (e) {
      this.filter.offset = e * this.filter.limit - 1
      this.querySchool()
    },

    async deleteSchool (id) {
      await this.$confirm("确认要执行此操作吗")
      await Course.deleteSchool(id ? [id] : this.ids)
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
      this.querySchool();
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
  .el-form {
    float: right;
    .el-form-item {
      width: 270px;
      float: left;
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
