import axios from 'axios'
import { paramsify, signify } from './utils'
import { CONFIG } from './config'

export function createOrder (params) {
  const url = `${CONFIG.HOST}/createOrder`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

