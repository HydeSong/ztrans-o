import * as types from './mutation-types'

const mutations = {
  [types.SET_CREDITLIST] (state, list) {
    state.creditList = list
  },
  [types.SET_LOAN] (state, loan) {
    state.loan = loan
  }
}

export default mutations
