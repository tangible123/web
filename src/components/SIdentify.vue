<template>
  <div>
 
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
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isOk: true,
      msg: '',
      text: '向右滑动->',
      outerVisible: false,
      // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      accuracy: 5,
    }
  },
  methods: {
    onSuccess() {
      this.$emit("sendEventToParent",this.isOk)
      
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
  },
}
</script>

