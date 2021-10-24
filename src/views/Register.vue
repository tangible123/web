<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" status-icon label-width="80px">
          <h3>注册账户</h3>
          <hr>


            <el-form-item prop="userNum" label="学号">
            <el-input v-model="user.userNum" placeholder="请输入学号"></el-input>
          </el-form-item>

          <el-form-item prop="username" label="用户名">
            <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item prop="phone" label="手机号">
            <el-input v-model="user.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>

          
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>

          <el-form-item prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon @click="register()">注册账号</el-button>
          </el-form-item>

        </el-form>
      </el-row>
    </div>
  </div>
</template>
 
<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      user: {
        userNum: "",
        username: "",
        phone: this.$route.params.phone,
        email: this.$route.params.email,
        password: ""
      },
    };
  },
  created() {
    // console.log($);
    // console.log("1111");
  },
  methods: {
   
    register() {
       if (!this.user.userNum) {
        this.$message.error("请输入学号！");
        return;
      } else if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.phone) {
        this.$message.error("请输入手机号！");
        return;
      } else if (!this.user.email) {
        this.$message.error("请输入邮箱！");
        return;
      } else if (this.user.email != null) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(this.user.email)) {
          this.$message.error("请输入有效的邮箱！");
        } else if (!this.user.password) {
          this.$message.error("请输入密码！");
          return;
        } else {
          // this.$router.push({ path: "/" }); //无需向后台提交数据，方便前台调试
          axios
            .post("http://127.0.0.1:8088/index/register", this.user)
            .then(res => {
              // console.log("输出response.data", res.data);
              // console.log("输出response.data.status", res.data.status);
              if (res.data.status === 200) {
                alert("您已成功注册账户,请尝试登录")
                this.$router.push({ path: "/login"});
              } else {
                alert("您输入的用户名已存在！");  // 改为动态查询
              }
            });
        }
      }
    }
  }
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 740px;
  background: url("../assets/1.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
}
.login-wrap {
  background: url("../assets/3.jpg") no-repeat;
  background-size: cover;
  width: 500px;
  height: 600px;
  margin: 100px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 20px;
}
 
h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}
 
.el-button {
  width: 80%;
  margin-left: -50px;
}
</style>