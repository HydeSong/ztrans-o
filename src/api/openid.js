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

export function getSaleOpenIdByCode (params) {
  const url = `${CONFIG.HOST}/getSaleOpenIdByCode`
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

export function regainCodeByRefreshPage (state) {
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7b0e2306f65b18cc&redirect_uri=http%3A%2F%2Fss.mofter.com&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`
}