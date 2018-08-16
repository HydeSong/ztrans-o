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

export function getCustomerOrder (params) {
  const url = `${CONFIG.HOST}/getCustomerOrder`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getDriverOrder (params) {
  const url = `${CONFIG.HOST}/getDriverOrder`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}
