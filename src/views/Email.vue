<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">

        <el-form ref="loginForm" :model="user" status-icon label-width="80px">

         <el-button  type="text" @click="isPhone=!isPhone">切换验证方式</el-button>  

          <hr>
          <span v-if="isPhone">

           <el-form-item prop="phone" label="手机">
            <el-input v-model="user.phone" placeholder="请输入手机号"></el-input>
            <el-row>
            <el-button round @click="sendPhoneVerifycode()">发送手机验证码</el-button>
            </el-row>
          </el-form-item>
           <el-form-item prop="code" label="验证码">
            <el-input v-model="user.code" placeholder="请输入手机验证码"></el-input>
          </el-form-item>
  
          </span>

          <span v-else>

            <el-form-item prop="email" label="邮箱">
            <el-input v-model="user.email" placeholder="请输入任意邮箱"></el-input>
            <el-row>
            <el-button round @click="sendEmailVerifycode()">发送邮箱验证码</el-button>
            </el-row>
          </el-form-item>
           <el-form-item prop="code" label="验证码">
            <el-input v-model="user.code" placeholder="请输入邮箱验证码"></el-input>
          </el-form-item>

          </span>
          
           
          

           <el-steps :active="active" finish-status="success">
           <el-step title="步骤 1"></el-step>
           <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
           </el-steps>
          
          
          <el-button style="margin-top: 12px;" @click="Verifycode" size="medium">确认</el-button>
       
        

        </el-form>
      </el-row>
    </div>
  </div>
</template>
 
<script>
import axios from "axios";
export default {
  name: "email",
  data() {
    return {
      isPhone: true,
      user: {
        newpassword: "",
        email: "",
        password: "",
        code:"",
        phone:""
      },
       active: 0
    };
  },
  created() {
    // console.log($);
    // console.log("1111");
  },
  methods: {
   
    sendEmailVerifycode() {
       
      if(!this.user.email||this.user.email=="") {
       this.$methods.error("请输入邮箱账户! ");
        return ;
      } else if (this.user.email != null) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(this.user.email)) {
          this.$message.error("请输入有效的邮箱！");
        }}
      else {
        axios.post("http://127.0.0.1:8088/password/verified/",{
            email: this.user.email
        })
          .then(res=>{
             alert("验证码已发送至您的邮箱！");
          })
      }
    },

   sendPhoneVerifycode() {
       if(!this.user.phone||this.user.phone=="") {
       this.$methods.error("请输入手机号! ");
        return ;
      }
      else {
        axios.post("http://127.0.0.1:8088/login/sendMs/",{
            phone: this.user.phone
        })
          .then(res=>{
             alert("验证码已发送至您的手机！");
          })
      }
   },

   Verifycode() {
        const _this = this
      if(!this.user.code||this.user.code=="") {
        Vue.prototype.$methods.error("请输入验证码! ");
        return ;
      }
      else {
        axios.get("http://127.0.0.1:8088/password/verifiedcode")
          .then(res=>{
            if(this.user.code==res.data.data) {
                 if (this.active++ > 2) this.active = 0;

                     _this.$router.push({ 
                       path:'/resetpassword',
                       name:'Resetpassword', 
                         //params传参 需要使用 name 否则取不到；对应路由配置的 name
                      params: {
                      email:_this.user.email,
                      phone:_this.user.phone
                     }})

                    this.$router.push({ path: "/resetpassword" });
            }
            else {
                alert("验证码错误!")
                 Vue.prototype.$methods.error("验证码错误! ");
            }
          })
      }
   }
}
}
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