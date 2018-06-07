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
  [types.SET_RECEIVER] (state, reveiver) {
    state.reveiver = reveiver
  }
}

export default mutations
