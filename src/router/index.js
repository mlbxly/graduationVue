import Vue from 'vue'
import Router from 'vue-router'
//导入编写的组件
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Home',
      path:'/home',
      component:Home,
      meta: {
        requireAuth: true
      }
    }
  ]
})
