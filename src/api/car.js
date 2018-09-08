import axios from 'axios'
import { paramsify, signify } from './utils'
import { CONFIG } from './config'

export function getCarBandList (params) {
  const url = `${CONFIG.HOST}/getCarBandList`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getCarColourList (params) {
  const url = `${CONFIG.HOST}/getCarColourList`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getCarTypeList (params) {
  const url = `${CONFIG.HOST}/getCarTypeList`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getCarSizeList (params) {
  const url = `${CONFIG.HOST}/getCarSizeList`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}


export function getCarWeightList (params) {
  const url = `${CONFIG.HOST}/getCarWeightList`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}
