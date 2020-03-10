import Vue from 'vue'
import Router from 'vue-router'
//导入编写的组件
import Login from '@/components/Login'
import Home from '@/components/Home'
import Member from '@/member/Member'
import QuitProperty from '@/member/QuitProperty'

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
      path: '/home',
      component: Home,
      redirect: '/member',
      children: [
        {
          path: '/member',
          name: 'Member',
          component: Member,
          meta:{
            requireAuth: true
          }
        },
        {
          path:'/quitList',
          name:'QuitProperty',
          component:QuitProperty,
          meta:{
            requireAuth: true
          }
        }
      ]
    }
  ]
})
