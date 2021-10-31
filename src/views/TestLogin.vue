<template>
  <div class="login" clearfix>
    <div class="login-wrap">
      <el-row type="flex" justify="center">

        <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
          <h3>测试登录</h3>
          <hr>
  
           <el-form-item id="userNum" prop="userNum" label="学号">
            <el-input v-model="user.userNum" placeholder="请输入学号" prefix-icon></el-input>
          </el-form-item>

          <span v-if="judge">
          <el-form-item id="password" prop="password" label="新的密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          </span>
           <span v-else>
             <el-form-item id="password" prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
           </span>

          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="doLogin()">登 录</el-button>
          </el-form-item>
           
           <span v-if="judge">
           <el-steps :active="active" finish-status="success">
           <el-step title="步骤 1"  description="身份验证"></el-step>
           <el-step title="步骤 2" description="重置密码"></el-step>
            <el-step title="步骤 3" description="尝试登录"></el-step>
           </el-steps>
           </span>
           <span v-else>
             <el-steps :active="active" finish-status="success">
           <el-step title="步骤 1"  description="身份绑定"></el-step>
           <el-step title="步骤 2"  description="信息填写"></el-step>
            <el-step title="步骤 3"  description="尝试登录"></el-step>
           </el-steps>
           </span>


        </el-form>
      </el-row>
    </div>
  </div>
</template>
 
<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      judge: this.$route.params.judge,
      user: {
        userNum: "",
        password: ""

      },
      active: 2
    };
  },
   rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],   
          password: [
            { required: true, message: '请选择密码', trigger: 'change' }
          ]
        },

  created() {},
  methods: {
    doLogin() {

      if (!this.user.userNum) {
        this.$message.error("请输入学号！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      } else {
        //校验用户名和密码是否正确;
        // this.$router.push({ path: "/personal" });
        axios
          .post("http://127.0.0.1:8088/index/login/", this.user)
          .then(res => {
             console.log("输出response.data.status", res.data.status);
          
              this.$router.push({ path: "/person" });
            
          });
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
  height: 400px;
  margin: 100px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 20px;
}
#password {
  margin-bottom: 5px;
}
h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}
a {
  text-decoration: none;
  color: #aaa;
  font-size: 15px;
}
a:hover {
  color: coral;
}
.el-button {
  width: 80%;
  margin-left: -50px;
}
</style>