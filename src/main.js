import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import './assets/js/responsive'

// 开发环境的手机调试面板
import vConsole from 'vconsole'
const debug = process.env.NODE_ENV !== 'production'
if (debug) {
  new vConsole()
}

if ('ontouchstart' in window) {
  FastClick.attach(document.body)
}

Vue.use(VueLazyLoad, {
  loading: require('./assets/images/default.png'),
  error: require('./assets/images/default.png')
})

Vue.config.productionTip = false
// const isProd = process.env.NODE_ENV === 'production'

// 异步请求库
import '@/plugin/axios'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
