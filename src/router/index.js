import Vue from 'vue'
import Router from 'vue-router'
//导入编写的组件
import Login from '@/components/Login'
import Home from '@/components/Home'
import Member from '@/member/Member'
import QuitProperty from '@/member/QuitProperty'
import HouseHold from  '@/member/HouseHold'
import House from '@/member/House'
import HomePage from '@/member/HomePage'

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
      redirect: '/homePage',
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
        },
        {
          path:'/houseHold',
          name:'HouseHold',
          component:HouseHold,
          meta:{
            requireAuth: true
          }
        },
        {
          path:'/house',
          name: 'House',
          component: House,
          meta:{
            requireAuth: true
          }
        },
        {
          path:'/homePage',
          name:'HomePage',
          component: HomePage,
          meta:{
            requireAuth:true
          }
        }
      ]
    }
  ]
})
