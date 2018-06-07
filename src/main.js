import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import './assets/js/responsive'

if ('ontouchstart' in window) {
  FastClick.attach(document.body)
}

Vue.use(VueLazyLoad, {
  loading: require('./assets/images/default.png'),
  error: require('./assets/images/default.png')
})

Vue.config.productionTip = false
// const isProd = process.env.NODE_ENV === 'production'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
