import * as types from './mutation-types'
import storage from 'good-storage'

const mutations = {
  [types.SET_CITYIDS] (state, cityIds) {
    state.cityIds = cityIds
    storage.set('__ztrans__state', state)
  },
  [types.SET_OPENID] (state, openId) {
    state.openId = openId
    storage.set('__ztrans__state', state)
  },
  [types.SET_SHIPPING] (state, shipping) {
    state.shipping = shipping
    storage.set('__ztrans__state', state)
  },
  [types.SET_RECEIVER] (state, receiver) {
    state.receiver = receiver
    storage.set('__ztrans__state', state)
  },
  [types.SET_WXCODE] (state, wxcode) {
    state.wxcode = wxcode
    storage.set('__ztrans__state', state)
  },
  [types.SET_STEP1DATA] (state, data) {
    state.step1Data = data
    storage.set('__ztrans__state', state)
  },
  [types.SET_STEP2DATA] (state, data) {
    state.step2Data = data
    storage.set('__ztrans__state', state)
  },
  [types.SET_CUSTOMERINFO] (state, data) {
    state.customerInfo = data
    storage.set('__ztrans__state', state)
  },
  [types.SET_CUSTOMERORDERS] (state, data) {
    state.customerOrders = data
    storage.set('__ztrans__state', state)
  },
  [types.SET_DRIVERORDERS] (state, data) {
    state.driverOrders = data
    storage.set('__ztrans__state', state)
  },
  [types.SET_SHIPPINGDISTRICTDETAIL] (state, data) {
    state.shippingDistrictDetail = data
    storage.set('__ztrans__state', state)
  },
  [types.SET_RECEIVEDISTRICTDETAIL] (state, data) {
    state.receiveDistrictDetail = data
    storage.set('__ztrans__state', state)
  },
  [types.SET_DRIVERMOBILEPHONE] (state, data) {
    state.mobilePhone = data
    storage.set('__ztrans__state', state)
  },
  [types.SET_QRCODEIMG] (state, data) {
    state.qrcodeImg = data
    storage.set('__ztrans__state', state)
  },
  [types.SET_ORDERDETAIL] (state, data) {
    state.orderDetail = data
    storage.set('__ztrans__state', state)
  }
}

export default mutations
