<template>
  <div class="box">
    <header-tit img="subT.png" tit="学科配置" />
    <div class="top">
      <div class="add" >
        <el-button type="primary" @click="showDiaLog()">新增</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="list"
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="学科配置" prop="name"></el-table-column>
      <el-table-column label="创建时间" prop="creationTime">
        <template slot-scope="scope">
          <div>{{scope.row.creationTime | formatDate}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDiaLog(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteDiction(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增学科配置"  :visible.sync="diaLog">
      <el-form v-if="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="学科配置" >
          <el-input v-model="ruleForm.name" placeholder="请输入学科配置"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaLog = false">取 消</el-button>
        <el-button type="primary" @click="createdDiction()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="pat">
      <el-pagination v-if="count" background layout="prev, pager, next"  :page-size="filter.limit" @current-change="currentPage":total="count"></el-pagination>
    </div>
  </div>
</template>
<script>
import { BaseConfig } from "api"

const RuleForm = function () {
  return {
    isDelete: true,
    name: "",
    typeCode: "SUBJECT"
  }
}

export default {
  data () {
    return {
      list: [],
      count: 0,
      diaLog: false,
      radio: "1",
      filter: {
        offset: 0,
        limit: 10,
        typeCode: "SUBJECT"
      },
      ruleForm: null,
      rules: {
        name: [
          { required: true, message: "请输入学科配置", trigger: "change" }
        ]
      }
    }
  },

  watch: {
    diaLog (n) {
      if (!n) {
        this.ruleForm = null
      }
    }
  },

  created () {
    this.BaseConfig()
  },

  methods: {
    async BaseConfig () {
      let res = await BaseConfig.queryDiction(this.filter)
      this.list = res.data
      this.count = res.count
    },

    async createdDiction () {
      await this.$refs["ruleForm"].validate()
      await BaseConfig.createdDiction(this.ruleForm)
      this.$message.success("创建成功")
      this.diaLog = false
      this.BaseConfig()
    },

    showDiaLog (item) {
      if (item) {
        this.ruleForm = new RuleForm()
        this.ruleForm.name = item.name
        this.ruleForm.id = item.id
      } else {
        this.ruleForm = new RuleForm()
      }
      this.diaLog = true
    },

    async deleteDiction (id) {
      await this.$confirm("确认要执行此操作吗")
      let a = {}
      a.typeCode = "SUBJECT "
      a.ids = [id]
      await BaseConfig.deleteDiction(a)
      this.BaseConfig()
    },

    currentPage (e) {
      this.filter.offset = e * this.filter.limit - 1
      this.BaseConfig()
    },
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
  margin-top: 20px;
  background: white;
}
.blue {
  color: rgb(90, 170, 220);
}
.red {
  color: rgb(245, 90, 85);
}
.btn {
  width: 0.9rem;
}
.el-dialog {
  background: #f5f8fd;
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
