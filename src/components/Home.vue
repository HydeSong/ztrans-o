
<template>
  <div class="home">
    跳转中
  </div>
</template>

<script>
  import {Button, Toast} from 'mand-mobile'
  import Split from './Base/Split'
  import {urlParse} from '@/common/js/utils'
  import {mapMutations} from 'vuex'
  import {getCustomerOpenIdByCode, getDriverOpenIdByCode} from '@/api/openid'
  import {setCookie} from '@/common/js/cache'

  export default {
    name: 'home',
    components: {
      [Button.name]: Button,
      Split
    },
    data () {
      return {
        wxcode: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        setTimeout(() => {
          const queryStr = urlParse(window)
          this._getWxCode(queryStr)
          this._goto(queryStr)
        }, 1000)
      })
    },
    methods: {
      ...mapMutations({
        setWxCode: 'SET_WXCODE',
        setOpenId: 'SET_OPENID',
        setCustomerInfo: 'SET_CUSTOMERINFO'
      }),
      call () {
        this.$router.push('/user/order')
      },
      simpleOrder () {
        this.$router.push('/user/simple-order')
      },
      join () {
        this.$router.push('/driver/driver-order')
      },
      activate (from) {
        this.$router.push(`/activate?from=${from}`)
      },
      _goto (queryStr) {
        const state = queryStr.state
        if (state === '1') {
          this._getCustomerOpenIdByCode({code: this.wxcode, grantType: "authorization_code"})
        } else if (state === '2') {
          this._getDriverOpenIdByCode({code: this.wxcode, grantType: "authorization_code"})
        }
      },
      _getWxCode (queryStr) {
        const wxcode = queryStr.code
        this.wxcode = wxcode
        this.setWxCode(wxcode)
      },
      _getCustomerOpenIdByCode (params) {
        getCustomerOpenIdByCode(params).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.setOpenId(res.openId)
            setCookie('__user__openid', res.openId)
            // 保存contactName， customerMasterId， mobilePhone 供简易下单使用
            this.setCustomerInfo(res)
            setCookie('__user__customerinfo', JSON.stringify(res))
            if (res.wetherRegister === 1) {
              // if (res.wetherSpecialCustomer === 0) {
              //   this.simpleOrder()
              // } else {
              //   this.call()
              // }
              this.call()
            } else if (res.wetherRegister === 0) {
              this.activate('user')
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getDriverOpenIdByCode (params) {
        getDriverOpenIdByCode(params).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.setOpenId(res.openId)
            setCookie('__user__openid', res.openId)
            if (res.wetherRegister === 1) {
              this.join()
            } else if (res.wetherRegister === 0) {
              this.activate('driver')
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home
    text-align center
    padding 30px
</style>
