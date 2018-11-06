import * as types from './mutation-types'

const mutations = {
  [types.SET_CITYIDS] (state, cityIds) {
    state.cityIds = cityIds
  },
  [types.SET_OPENID] (state, openId) {
    state.openId = openId
  },
  [types.SET_SHIPPING] (state, shipping) {
    state.shipping = shipping
  },
  [types.SET_RECEIVER] (state, receiver) {
    state.receiver = receiver
  },
  [types.SET_WXCODE] (state, wxcode) {
    state.wxcode = wxcode
  },
  [types.SET_STEP1DATA] (state, data) {
    state.step1Data = data
  },
  [types.SET_STEP2DATA] (state, data) {
    state.step2Data = data
  },
  [types.SET_CUSTOMERINFO] (state, data) {
    state.customerInfo = data
  },
  [types.SET_CUSTOMERORDERS] (state, data) {
    state.customerOrders = data
  },
  [types.SET_DRIVERORDERS] (state, data) {
    state.driverOrders = data
  },
  [types.SET_SHIPPINGDISTRICTDETAIL] (state, data) {
    state.shippingDistrictDetail = data
  },
  [types.SET_RECEIVEDISTRICTDETAIL] (state, data) {
    state.receiveDistrictDetail = data
  },
  [types.SET_DRIVERMOBILEPHONE] (state, data) {
    state.mobilePhone = data
  },
  [types.SET_QRCODEIMG] (state, data) {
    state.qrcodeImg = data
  }
}

export default mutations
