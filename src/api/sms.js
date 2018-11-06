import axios from 'axios'
import { paramsify, signify } from './utils'
import { CONFIG } from './config'

export function getMobileCode (params, sign) {
  const url = `${CONFIG.HOST}/getMobileCode`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getContactMobileCode (params, sign) {
  const url = `${CONFIG.HOST}/getContactMobileCode`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getSaleMobileCode (params, sign) {
  const url = `${CONFIG.HOST}/getSaleMobileCode`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}
