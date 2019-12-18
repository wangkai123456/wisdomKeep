<template>
  <div class="box">
    <header-tit img="teT.png" tit="教师管理"/>
    <el-form class="from">
      <el-form-item label="授课年级">
        <el-select v-model="filter.gradeId" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="(item, i) in this.$store.state.BaseConfig.grades"
            :key="i"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科">
       <el-select v-model="filter.subjectId" placeholder="请选择">
         <el-option label="全部" value=""></el-option>
          <el-option
            v-for="(item, i) in this.$store.state.BaseConfig.subjects"
            :key="i"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input class="fi" v-model="filter.name"></el-input>
      </el-form-item>
    </el-form>
    <div class="top">
      <div class="add">
        <div >
           <el-button type="primary" @click="$router.push('/teacherDetail')">新增</el-button>
        </div>
        <div>
          <el-button type="danger" @click="deleteSchool()">删除</el-button>
        </div>
      </div>
    </div>
    <el-table tooltip-effect="dark" :data="tableData3" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column label="形象照片">
        <template slot-scope="scope">
          <img class="img" :src="scope.row.photoUrl" alt>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="教师姓名"></el-table-column>
      <el-table-column prop="graduateSchool" label="毕业学校"></el-table-column>
      <el-table-column prop="diploma" label="学历"></el-table-column>
      <el-table-column prop="subjectName" label="教授学科">

      </el-table-column>
      <el-table-column prop="grades" label="授课年级">
        <template slot-scope="scope">
          <div>
            <span v-for="(item, i) in scope.row.grades" :key="i"> {{ item.name }} </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push('/teacherDetail?id=' + scope.row.id)">修改</el-button>
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
import { Teacher } from "api"

export default {
  data () {
    return {
      tableData3: [],
      filter: {
        offset: 0,
        limit: 10,
        name: "",
        subjectId: "",
        gradeId: ""
      },
      ids: [],
      count: 0,
      grades: [],
      subjects: []
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
  },

  async created () {
    this.querySchool()
  },

  methods: {
    async querySchool () {
      let res = await Teacher.querySchool(this.filter)
      this.tableData3 = res.data
      this.count = res.count
    },

    currentPage (e) {
      this.filter.offset = e * this.filter.limit - 1
      this.querySchool()
    },

    async deleteSchool (id) {
      await this.$confirm("确认要执行此操作吗")
      await Teacher.deleteSchool(id ? [id] : this.ids)
      this.querySchool()
    },

    handleSelectionChange (e) {
      this.ids = e.map(item => item.id)
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
    width: 300px;
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
