import storage from 'good-storage'

const state = storage.get('__ztrans__state') || {
  cityIds: {},
  openId: '',
  wxcode: '',
  customerInfo: {},
  shipping: {},
  receiver: {},
  step1Data: {},
  step2Data: {},
  mobilePhone: '',
  customerOrders: [],
  driverOrders: [],
  shippingDistrictDetail: '',
  receiveDistrictDetail: '',
  qrcodeImg: '',
  orderDetail: {}
}

export default state
