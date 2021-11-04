<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
          

        <el-form ref="ruleForm" :model="user" status-icon label-width="80px">
          <h3>找回密码</h3>
          <hr>
          <el-tabs v-model="activeName" @tab-click="handleClick">

          <el-tab-pane label="手机验证" name="first">
          
           <el-form-item prop="phone" label="手机">
            <el-input v-model="user.phone" placeholder="请输入手机号"></el-input>
            <el-row>
            <el-button round @click="sendPhoneVerifycode()" :disabled="isDisabled">{{buttonName}}</el-button>
            </el-row>
          </el-form-item>
           <el-form-item prop="code" label="验证码">
            <el-input v-model="user.code" placeholder="请输入手机验证码"></el-input>
          </el-form-item>
  
          </el-tab-pane>

    <el-tab-pane label="邮箱验证" name="second">
 
         <el-form-item prop="email" label="邮箱">
            <el-input v-model="user.email" placeholder="请输入任意邮箱"></el-input>
            <el-row>
            <el-button round @click="sendEmailVerifycode()" :disabled="isDisabled">{{buttonName}}</el-button>
            </el-row>

          </el-form-item>
           <el-form-item prop="code" label="验证码">
            <el-input v-model="user.code" placeholder="请输入邮箱验证码"></el-input>
          </el-form-item>

    </el-tab-pane>
        

    </el-tabs>
        
           <el-steps :active="active" align-center=true finish-status="success">
           <el-step title="步骤 1"  description="身份验证"></el-step>
           <el-step title="步骤 2" description="重置密码"></el-step>
            <el-step title="步骤 3" description="尝试登录"></el-step>
           </el-steps>
          
          
          <el-button style="margin-top: 12px;" @click="Verifycode" size="medium">确认</el-button>
       

        </el-form>
      </el-row>
      
            <el-dialog :visible.sync="outerVisible">
      <slide-verify
        ref="slideblock"
        @again="onAgain"
        @fulfilled="onFulfilled"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        :slider-text="text"
        :accuracy="accuracy"
      ></slide-verify>
      <el-button type="primary" @click="handleClick" size="medium">刷新</el-button>
    </el-dialog>

    </div>
  </div>
</template>
 
<script>
import axios from "axios";
export default {
  name: "email",
  


  data() {
    return {
      
      
      msg: '',
      text: '向右滑动->',
      outerVisible: false,
      // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      accuracy: 5,
      isEmail: false,
      isPhone: false,

      activeName: 'first',
      time: 30,
      buttonName: "获取验证码",
      isDisabled: false, //验证码再次发送
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
  
  methods: {
    
     timer() {
                if (this.time > 0) {
                    this.isDisabled=true;
                     this.time--;
                     this.buttonName=this.time+"秒后可用";
                     setTimeout(this.timer, 1000);
                } else{
                     this.time=0;
                     this.buttonName="发送验证码";
                     this.isDisabled=false;
                }
            },

    sendEmailVerifycode() {
      
      if(!this.user.email) {
       this.$message.error("请输入邮箱账户! ");
        return ;
      }
      else if (this.user.email != null) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(this.user.email)) {
          this.$message.error("请检查邮箱填写是否正确！");
          return ;
       }}
         this.outerVisible = true // 弹出 滑动框
         this.isEmail = true  // 滑动验证后 发送的是 email
      },
    

   sendPhoneVerifycode() {

       if(!this.user.phone||this.user.phone=="") {
       this.$message.error("请输入手机号! ");
        return ;
      } else if (this.user.phone != null) {
        var reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
        if (!reg.test(this.user.phone)) {
          this.$message.error("请检查手机号填写是否正确！");
          return ;
        } 
        } 
     
          this.isPhone = true  // 滑动验证后 发送的是 phone
          this.outerVisible = true // 弹出 滑动框
      
   },

   Verifycode() {
        const _this = this
      if(!this.user.code||this.user.code=="") {
       
        this.$message.error("请输入验证码!")
        return ;
      }

      else {   // 先发送邮箱过去 在 后台从redis获取验证码
        axios.post("http://127.0.0.1:8088/password/verifiedcode",{
          email: this.user.email,
          phone: this.user.phone,
          code: this.user.code
        })
          .then(res=>{
            if(res.data.status==10010) { // 验证码过期
              this.$message.error("验证码过期了！")
              return ;
            }
            if(res.data.status==10011) {  // 验证码错误
              this.$message.error("输入验证码错误!")
              return ;
            }
           if(res.data.status==10000) { // 验证码 相等
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
          })
      }
   },

    onSuccess() {

        const _this = this
        if(_this.isEmail==true) {
        _this.isEmail = false
        this.time=30;
        this.timer();
        axios.post("http://127.0.0.1:8088/password/verified/",{
            email: this.user.email
        })
          .then(res=>{
            if(res.data.status==10000) {
             this.$message({
          message: '验证码已经发送至您的邮箱',
          type: 'success'
        });
          }else {
               this.$message.error("系统繁忙请重试")
             }

          })
        }
         if(_this.isPhone==true) {
          _this.isPhone = false
          this.time=30;
          this.timer();
        axios.post("http://127.0.0.1:8088/login/sendMs/",{
            phone: this.user.phone
        })
          .then(res=>{
             this.$message({
          message: '验证码已发送至您的手机！',
          type: 'success'
          });
          })
        }  

      console.log('验证通过')
      this.msg = 'login success'
      //滑动验证成功之后关闭弹出的窗口
      this.outerVisible = false
      this.$refs.slideblock.reset() 
    },
    onFail() {
      console.log('验证不通过')
      this.msg = ''
    },
    onRefresh() {
      console.log('点击了刷新小图标')
      this.msg = ''
    },
    onFulfilled() {
      console.log('刷新成功啦！')
    },
    onAgain() {
      console.log('检测到非人为操作的哦！')
      this.msg = 'try again'
      // 刷新
      this.$refs.slideblock.reset()
    },
    handleClick() {
      this.$refs.slideblock.reset()
    },
}
}
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
  height: 500px;
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