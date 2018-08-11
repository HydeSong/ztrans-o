import Vue from 'vue'
import {Toast} from 'mand-mobile'
import axios from 'axios'

// 在这里对返回的数据进行处理
// 在这里添加你自己的逻辑
axios.interceptors.response.use(res => {
  let result = ''
  console.log(res)
  if (res.status === 200) {
    const code = res.data.code
    switch (code) {
      case 0:
        result = res.data
        break
      case 401:
        console.log(code)
        Toast.failed(`${code}:${res.data.message}`)
        break
      case 403:
        console.log(code)
        Toast.failed(`${code}:${res.data.message}`)
        break
      case 404:
        console.log(code)
        Toast.failed(`${code}:${res.data.message}`)
        break
      case -1:
        console.log(code)
        Toast.failed(`${code}:${res.data.message}`)
        break
      case -5001:
        console.log(code)
        Toast.failed(`${code}:${res.data.message}`)
        break
      case -5003:
        console.log(code)
        Toast.failed(`${code}:${res.data.message}`)
        break
      case -5004:
        console.log(code)
        Toast.failed(`${code}:${res.data.message}`)
        break
      case -5005:
        console.log(code)
        Toast.failed(`${code}:${res.data.message}`)
        break
      default:
        console.log(code)
        Toast.failed(`${code}:${res.data.message}`)
        break
    }
    return result
  }
}, err => {
  return Promise.reject(err)
})

Vue.prototype.$axios = axios
