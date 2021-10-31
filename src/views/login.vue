<template>
  <div class="login" clearfix>
    <div class="login-wrap">
      <el-row type="flex" justify="center">

        <el-form ref="user" :model="user" :rules="rules" status-icon label-width="80px">
          <h3>登录</h3>
          <hr>
  
           <el-form-item  prop="userNum" label="学号">
            <el-input v-model="user.userNum" placeholder="请输入学号" prefix-icon></el-input>
          </el-form-item>


          <el-form-item  prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
    
          <div @click="refreshCode" style="margin-top: 20px">
         <!--验证码组件-->
          <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
       

          <!--放置30天免登录-->
          <el-radio v-model="radio" label="1">30天免登录</el-radio>
          
          <br>
          <router-link to="/email">找回密码</router-link>
          <router-link to="/registercode">注册账号</router-link>

          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="doLogin()">登 录</el-button>
          </el-form-item>

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
  name: "login",
  data() {
    return {
       msg: '',
      text: '向右滑动->',
      outerVisible: false,
      // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      accuracy: 5,
      radio: '0',
      user: {
        userNum: "",
        password: ""
      }  
    };
  },
   rules: {
           userNum: [
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
      } 
     this.outerVisible = true // 弹出 滑动框

        //校验用户名和密码是否正确;
        // this.$router.push({ path: "/personal" });
    },
     onSuccess() {
       axios
          .post("http://127.0.0.1:8088/index/login/", this.user)
          .then(res => {
             console.log("输出response.data.status", res.data.status);
          
              this.$router.push({ path: "/person" });
            
          });
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