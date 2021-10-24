<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" status-icon label-width="80px">
          <h3>重设密码</h3>
          <hr>
         
          <el-form-item prop="newPassWord" label="新的密码">
            <el-input v-model="user.newPassWord" placeholder="请输入新的密码"></el-input>
          </el-form-item>
         
          <el-form-item prop="confirmPassword" label="确认密码">
            <el-input v-model="user.confirmPassword" placeholder="请确认新的密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon @click="changePassword">重置密码</el-button>
          </el-form-item>
         
           <el-steps :active="active" finish-status="success">
           <el-step title="步骤 1"></el-step>
           <el-step title="步骤 2"></el-step>
           <el-step title="步骤 3"></el-step>
           </el-steps>


        </el-form>
      </el-row>
    </div>
  </div>
</template>
 
 <!--
 找回密码：  判断两次密码前后一致后，通过提交 密码 到后台 然后修改对应账户的密码
 -->
<script>
import axios from "axios";
export default {
  name: "resetpassword",
  data() {
    return {
      user: {
        email: this.$route.params.email,
        phone: this.$route.params.phone,
        newPassWord: "",
        confirmPassword:"",
      },
      active: 1
    };
  },
  methods: {
  changePassword() {
     const _this = this
     if(!this.user.newPassWord) {
         Vue.prototype.$methods.error("请输入新的密码! ");
         return ;
     }else if(!this.user.confirmPassword) {
        Vue.prototype.$methods.error("请再次确认密码! ");
        return ;
     }else if(this.user.newPassWord!=this.user.confirmPassword){
        alert("请确认两次密码相同! ");
        return ;
     }else {
        axios.post("http://127.0.0.1:8088/password/modified",this.user)
        .then(res=>{
            alert("密码更改成功，请尝试下一步登录");
              if (this.active++ > 2) this.active = 0;
              this.$router.push({ path: "/testlogin" });
        })
     }
  },
  created() {
    // console.log($);
    // console.log("1111");
  },
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
  height: 500px;
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