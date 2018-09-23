import axios from 'axios'
import { paramsify, signify } from './utils'
import { CONFIG } from './config'

export function getAllRouterByCity (params) {
  const url = `${CONFIG.HOST}/getAllRouterByCity`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getRouterByCityAreaTown (params) {
  const url = `${CONFIG.HOST}/getRouterByCityAreaTown`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getRouterPriceByCarTypeAndRouterDetailSeries (params) {
  const url = `${CONFIG.HOST}/getRouterPriceByCarTypeAndRouterDetailSeries`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getCarTypeByAllRouter (params) {
  const url = `${CONFIG.HOST}/getCarTypeByAllRouter`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getCityByOpenId (params) {
  const url = `${CONFIG.HOST}/getCityByOpenId`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}

export function getCustomerRouterDetail (params) {
  const url = `${CONFIG.HOST}/getCustomerRouterDetail`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}