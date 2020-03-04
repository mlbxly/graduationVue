// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
//创建axios实例
var instance = axios.create({timeout: 1000*12})
//设置post请求头
axios.defaults.baseURL = "http://127.0.0.1:8090/";

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
