import axios from 'axios'
import { paramsify, signify } from './utils'
import { CONFIG } from './config'

export function uploadPicture (params) {
  const url = `${CONFIG.HOST}/uploadPicture`
  const data = {
    params: paramsify(params),
    multipartFile: params.multipartFile,
    customerNumId: params.customerNumId,
    pictureCode: params.pictureCode,
    sign: signify(params)
  }
  return axios.post(url, data)
}

export function getPicture (params) {
  const url = `${CONFIG.HOST}/getPicture`
  const data = {
    params: paramsify(params),
    sign: signify(params)
  }
  return axios.get(url, {params: data})
}