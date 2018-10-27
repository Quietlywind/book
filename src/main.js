// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import NProgress from 'nprogress'
import Highcharts from 'highcharts';
import VueHighcharts from 'vue-highcharts';
import "babel-polyfill";


import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'
import '@/assets/styles/main.scss'
import 'nprogress/nprogress.css' //这个样式必须引入进度条样式

Vue.config.productionTip = false
Vue.prototype.axios=axios
Vue.use(ElementUI)
Vue.use(VueHighcharts,{Highcharts})

NProgress.inc(0.2)
NProgress.configure({easing:'ease',speed:1000,showSpinner:false})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach( ()=> {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
