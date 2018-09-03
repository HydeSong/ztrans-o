import Vue from 'vue'
import {Toast} from 'mand-mobile'
import axios from 'axios'

// 在这里对返回的数据进行处理
// 在这里添加你自己的逻辑
axios.interceptors.response.use(res => {
  let result = ''
  // console.log(res)
  if (res.status === 200) {
    const code = res.data.code
    switch (code) {
      case 0:
        result = res.data
        break
      default:
        // console.log(code)
        Toast.failed(`${code}:${res.data.message}`)
        break
    }
    return result
  }
}, err => {
  return Promise.reject(err)
})

Vue.prototype.$axios = axios
