<template>
  <div class="login_box">
    <div class="header">
      <img src="../assets/img/logo.png" alt>
      <div class="tit">网站管理系统登陆</div>
    </div>
    <div class="login" :style="bg">
      <div class="login_t">
        <img src="../assets/img/u.png" alt>
        <div class="login_content">
          <div class="userLogin">账号登陆</div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="phone" >
              <el-input placeholder="请输入账号" v-model="ruleForm.phone" type="input"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="请输入密码" v-model="ruleForm.password " type="password"></el-input>
            </el-form-item>
            <el-form-item prop="userPassword">
              <div class="code_bx">
                <el-input v-model="inpCode" @keyup.native.enter="login()" class="code_inpu" placeholder="请输入验证码" ></el-input>
                <canvas  id="myCanvas" @click="createCode()" width="70px" height="27px" style="float: right; border:1px solid #d3d3d3;"></canvas>
              </div>
            </el-form-item>
          </el-form>
          <div class="remb">
            <el-checkbox v-model="isRember">记住密码</el-checkbox>
          </div>
          <div class="login_btn" @click="login">
            <span>登陆</span>
            <img src="../assets/img/login_btn.png" alt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Account } from "api"
export default {
  data () {
    return {
      bg: "background-image: url(static/loginBg.png)",
      isRember: false,
      ruleForm: {
        phone: "",
        password: ""
      },
      code: "1",
      inpCode: "",
      rules: {
        phone: [
          { required: true, message: "请输入账号", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" }
        ]
      }
    }
  },

  created () {
    storage.clear()
    let { phone, password } = this.$store.state.Account.account
    this.ruleForm = { phone, password }
  },

  mounted () {
    this.createCode()
  },

  methods: {
    async login () {
      await this.$refs["ruleForm"].validate()
      console.log()
      if (this.inpCode != this.code) return this.$message("验证码不正确")
      let { data } = await Account.login(this.ruleForm)
      this.$store.commit("Account/SAVE_USERNAME", this.isRember ? this.ruleForm : {})
      this.$store.commit("Account/SAVE_USERINFO", data)

      let res = await Account.queryQnToken()
      this.$store.commit("Account/QUERY_QTOKEN", res.data)

      this.$store.commit("Account/SEKECT_MENU", data.right ? "order" : "home")
      this.$router.push(data.right ? "/order" : "/home")
    },
    createCode () {
      this.code = ""
      var codeLength = 4// 验证码的长度，可变
      var canvas = document.getElementById("myCanvas")// 获取画布
      var selectChar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]// 所有候选组成验证码的字符
      for (var i = 0; i < codeLength; i++) {
        let charIndex = Math.floor(Math.random() * 36)
        this.code += selectChar[charIndex]
      }
      if (canvas) {
        var ctx = canvas.getContext("2d")
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, 170, 127)
        ctx.font = "20px arial"
        // 创建渐变
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop("0", "magenta")
        gradient.addColorStop("0.5", "blue")
        gradient.addColorStop("1.0", "red")
        // 用渐变填色
        ctx.strokeStyle = gradient
        ctx.strokeText(this.code, 5, 20)// 画布上添加验证码
      }
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  overflow: hidden;
}
.login_box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.login {
  width: 100%;
  height: 3.69rem;
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tit {
  color: #4b9ee3;
  font-size: 0.23rem;
}
.header {
  // width:
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.11rem;
  img {
    width: 1.42rem;
    height: 0.35rem;
  }
}
.login_content {
  width: 2.41rem;
  background: #eff9fe;
  box-shadow: 1px 1px 3px 0px rgba(1, 44, 90, 0.31);
  border-radius: 10px 10px 10px 10px;
  padding: 19px;
  margin-left: 36px;
}
.login_t {
  display: flex;
  align-items: center;
}
.userLogin {
  color: #333333;
  font-size: 13px;
  margin-bottom: 20px;
}
.code_inpu {
  width: 1.32rem;
}
.code_img {
  width: 0.63rem;
  height: 0.27rem;
}
.code_bx {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.remb {
  margin: 0.12rem 0;
}
.login_btn {
  width: 2.14rem;
  height: 0.31rem;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    position: absolute;
    left: 50%;
    top: 44%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 0.15rem;
  }
  position: relative;
  margin: 0.13rem auto;
}
</style>
