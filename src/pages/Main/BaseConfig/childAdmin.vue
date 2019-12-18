<template>
  <div class="box">
    <header-tit img="chiT.png" tit="子管理员"/>
    <div class="top">
      <div class="add">
        <el-button type="primary" @click="showDiaLog()">新增</el-button>
      </div>
    </div>
    <el-table ref="multipleTable" :data="list" style="width: 100%">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="职位" prop="post"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="支持权限" prop="right"></el-table-column>
      <el-table-column label="注册时间" prop="date">
        <template slot-scope="scope">
          <div>{{scope.row.creationTime | formatDate}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDiaLog(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <div class="pat">
      <el-pagination v-if="count" background layout="prev, pager, next"  :page-size="filter.limit"  @current-change="currentPage"  :total="count"></el-pagination>
    </div>
    <el-dialog title="新增 自管理员" :visible.sync="diaLog">
      <el-form v-if="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名称" prop="name">
          <el-input placeholder="请输入用户名称" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input placeholder="请输入联系方式" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="人员职位" prop="post">
          <el-input placeholder="请输入人员职位" v-model="ruleForm.post"></el-input>
        </el-form-item>
        <el-form-item label="支持权限" prop="right">
          <el-input placeholder="请输入支持权限" v-model="ruleForm.right"></el-input>
        </el-form-item>
        <el-form-item label="关联校区" prop="campusId ">
          <el-select v-model="ruleForm.campusId" placeholder="请选择">
            <el-option
              v-for="(item, i) in this.$store.state.BaseConfig.schools"
              :key="i"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="roles">
          <el-radio v-model="ruleForm.roles " label="PLATFORM">平台工作者</el-radio>
          <el-radio v-model="ruleForm.roles " label="OTHER">其他</el-radio>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button class="btn" type="primary" @click="createdDiction()">确认新增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Account } from "api"

const RuleForm = function () {
  return {
    name: "",
    password: "",
    phone: "",
    post: "",
    right: "",
    roles: [],
    campusId: ""
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
        limit: 10
      },
      ruleForm: null,
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" }
        ],
        phone: [
          { required: true, message: "请输入联系方式", trigger: "change" }
        ],
        post: [
          { required: true, message: "请输入人员职位", trigger: "change" }
        ],
        right: [
          { required: true, message: "请输入支持权限", trigger: "change" }
        ],
        roles: [
          { required: true, message: "请选择平台角色", trigger: "change" }
        ],
        campusId: [
          { required: true, message: "请选择校区", trigger: "change" }
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
      let res = await Account.queryChilAccount(this.filter)
      this.list = res.data
      this.count = res.count
    },

    async createdDiction () {
      await this.$refs["ruleForm"].validate()
      this.ruleForm.roles = [this.ruleForm.roles]
      await Account.createdChilAccount(this.ruleForm)
      this.$message.success("创建成功")
      this.diaLog = false
      this.BaseConfig()
    },

    async showDiaLog (id) {
      if (id) {
        let res = await Account.queryChilAccountDetail(id)
        this.ruleForm = res.data
        this.ruleForm.roles = this.ruleForm.roles[0]
      } else {
        this.ruleForm = new RuleForm()
      }
      this.diaLog = true
    },

    currentPage (e) {
      this.filter.offset = e * this.filter.limit - 1
      this.BaseConfig()
    },

    async deleteDiction (id) {
      await this.$confirm("确认要执行此操作吗")
      await Account.deletechilAccount([id])
      this.BaseConfig()
    },

    pageChange (e) {
      this.filter.offset = this.filter.offset + this.filter.limit - 1
      this.BaseConfig()
    },

    pageChangePre (e) {
      this.filter.offset = this.filter.offset - this.filter.limit
      this.BaseConfig()
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
  margin-top: 20px;
  background: white;
}
.blue {
  color: blue;
}
.btn {
  width: 0.9rem;
}
</style>
