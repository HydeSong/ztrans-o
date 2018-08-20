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

export function alivedDriver () {
  const url = `${CONFIG.HOST}/alivedDriver`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

