<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="user" :model="user" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
          <h3>注册账户</h3>
          <hr>
          
            <el-form-item prop="userNum" label="学号">
            <el-input v-model="user.userNum" placeholder="请输入学号"></el-input>
          </el-form-item>

          <el-form-item prop="username" label="用户名">
            <el-input v-model="user.username" placeholder="请输入用户名" @blur="checkname"></el-input>
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

           <el-steps :active="active" align-center=true finish-status="success">
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
    const checkPhone = (rule,value,cb) => {
      const regPhone = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
      if(regPhone.test(value)) {
        return cb()
      }
      cb(new Error('请检查手机号填写是否正确！'))
    }
    const checkEmail = (rule,value,cb) => {
      const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请检查邮箱填写是否正确！'))
    }


    return {
      errorMsg2: "",
       active: 1,
        judge: false,
      user: {
        userNum: "",
        username: "",
        phone: this.$route.params.phone,
        email: this.$route.params.email,
        password: ""
      },
       rules: {
          userNum: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
           phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ],
           email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]

           
         
        }


      };
    },
  
  methods: {
  
    register() {
      const _this = this

        if(this.user.userNum) {
        axios.post("http://127.0.0.1:8088/registed/userNum/",this.user.userNum)
          .then(res=>{
            if(res.data.status==10013) {
               this.$message.error("学号已被注册")
               return ;
            }
          })
      }
     
      else if(!this.user.userNum&&!this.user.username){
           axios.post("http://127.0.0.1:8088/registed/username/",this.user.username)
          .then(res=>{
            if(res.data.status==10012) {
               this.$message.error("用户名已被注册")
               return ;
            }
          })
      }
        else if(!this.user.phone&&this.user.phone != null) {
              axios.post("http://127.0.0.1:8088/registed/phone/",this.user.phone)
          .then(res=>{
            if(res.data.status==10015) {   
               this.$message.error("手机号已被注册")
               return ;
            }
          })
        }  
        else if(!this.user.email&&this.user.email != null) {
           axios.post("http://127.0.0.1:8088/registed/email/",this.user.email)
          .then(res=>{
            if(res.data.status==10014) {   
               this.$message.error("邮箱已被注册")
               return ;
            }
          })
        }
        else {
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
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 740px;
  background: url("../assets/bg4.jpg") no-repeat;
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
   opacity: 0.9;
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