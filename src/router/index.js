import Vue from 'vue'
import VueRouter from 'vue-router'
import Person from '../views/Person.vue'
import Resetpassword from '../views/Resetpassword.vue'
import login from '../views/login.vue'
import Register from '../views/Register.vue'
import Findpassword from '../views/Findpassword.vue'
import Registercode from '../views/Registercode.vue'
import test from '../views/test.vue'
import TestLogin from '../views/TestLogin.vue'


Vue.use(VueRouter)

const routes = [
 
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/registercode',
    name: 'Registercode',
    component: Registercode
  },
  {
    path: '/findpassword',
    name: 'Findpassword',
    component: Findpassword
  },
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/testlogin',
    name: 'TestLogin',
    component: TestLogin
  },
  {
    path: '/resetpassword',
    name: 'Resetpassword',
    component: Resetpassword
  },
  {
    path: '/person',
    name: 'Person',
    component: Person
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  
]

const router = new VueRouter({
  routes
})

export default router
