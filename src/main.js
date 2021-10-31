import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import SlideVerify from 'vue-monoplasty-slide-verify';
import 'normalize.css/normalize.css'

Vue.config.productionTip = false
Vue.use(VueAxios,axios)
Vue.use(ElementUI)

Vue.use(SlideVerify);

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
