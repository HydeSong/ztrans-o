import axios from 'axios'
import { paramsify, signify } from './utils'
import { CONFIG } from './config'

export function getCustomerOpenIdByCode (params) {
  const url = `${CONFIG.HOST}/getCustomerOpenIdByCode`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getDriverOpenIdByCode (params) {
  const url = `${CONFIG.HOST}/getDriverOpenIdByCode`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function refreshToken (params) {
  const url = `${CONFIG.HOST}/refreshToken`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}