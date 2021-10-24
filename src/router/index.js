import Vue from 'vue'
import VueRouter from 'vue-router'
import Person from '../views/Person.vue'
import Resetpassword from '../views/Resetpassword.vue'
import login from '../views/login.vue'
import Register from '../views/Register.vue'
import Email from '../views/Email.vue'
import TestLogin from '../views/TestLogin.vue'
import Registercode from '../views/Registercode.vue'


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
    path: '/testlogin',
    name: 'testlogin',
    component: TestLogin
  },
  {
    path: '/email',
    name: 'Email',
    component: Email
  },
  {
    path: '/',
    name: 'login',
    component: login
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
]

const router = new VueRouter({
  routes
})

export default router
