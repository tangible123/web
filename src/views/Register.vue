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

           <el-steps :active="active" finish-status="success">
           <el-step title="步骤 1"  description="身份绑定"></el-step>
           <el-step title="步骤 2"  description="信息填写"></el-step>
            <el-step title="步骤 3"  description="尝试登录"></el-step>
           </el-steps>

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
       active: 1,
        judge: false,
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
      const _this = this
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
              if (res.data.status === 10000) {

                 this.$message({
                message: '您已成功注册账户,请尝试登录',
                 type: 'success'
                   });

                if (this.active++ > 2) this.active = 0;

                 _this.$router.push({ 
                       path:'/testlogin',
                       name:'TestLogin', 
                         //params传参 需要使用 name 否则取不到；对应路由配置的 name
                      params: {
                      judge:_this.user.judge,
                     }})

                this.$router.push({ path: "/testlogin" });

              } else {
                this.$message.error("您输入的用户名已存在！");  // 改为动态查询
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