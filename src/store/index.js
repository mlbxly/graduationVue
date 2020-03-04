import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:  window.sessionStorage.getItem('user') == null ? '':window.sessionStorage.getItem('user'),
    token: window.sessionStorage.getItem('token') == null ? '':window.sessionStorage.getItem('token')
  },
  mutations: {
    //获取用户名
    GET_USER: (state,data) =>{
      //把用户名存起来
      state.user = data
      window.sessionStorage.setItem('user',data)
    },
    //获取用户token
    USER_TOKEN: (state,data) => {
      //把用户token存起来
      state.token = data
      window.sessionStorage.setItem('token',data)
    }
  }
})
