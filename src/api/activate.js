import axios from 'axios'
import { paramsify, signify } from './utils'
import { CONFIG } from './config'

export function registContact (params) {
  const url = `${CONFIG.HOST}/registContact`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function alivedDriver (params) {
  const url = `${CONFIG.HOST}/alivedDriver`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function registSale (params) {
  const url = `${CONFIG.HOST}/registSale`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

