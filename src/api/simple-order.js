import axios from 'axios'
import { paramsify, signify } from './utils'
import { CONFIG } from './config'

export function getRouterAliaByCustomerMasterId (params) {
  const url = `${CONFIG.HOST}/getRouterAliaByCustomerMasterId`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getPriceAndCarByCustomerIdAndRouterSeries (params) {
  const url = `${CONFIG.HOST}/getPriceAndCarByCustomerIdAndRouterSeries`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function createSpecialCustomerOrder (params) {
  const url = `${CONFIG.HOST}/createSpecialCustomerOrder`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}