
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
        this.$router.push('/user')
      },
      simpleOrder () {
        this.$router.push('/simple-order')
      },
      join () {
        this.$router.push('/driver')
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
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:
                this.setOpenId(res.data.openId)
                setCookie('__user__openid', res.data.openId)
                // 保存contactName， customerMasterId， mobilePhone 供简易下单使用
                this.setCustomerInfo(res.data)
                setCookie('__user__customerinfo', JSON.stringify(res.data))
                if (res.data.wetherRegister === 1) {
                  if (res.data.wetherSpecialCustomer === 0) {
                    this.simpleOrder()
                  } else {
                    this.call()
                  }
                } else if (res.data.wetherRegister === 0) {
                  this.activate('user')
                }
                break
              case 401:
                console.log(code)
                Toast.failed(`${code}:${res.data.message}`)
                break
              case 403:
                console.log(code)
                Toast.failed(`${code}:${res.data.message}`)
                break
              case 404:
                console.log(code)
                Toast.failed(`${code}:${res.data.message}`)
                break
              case -1:
                console.log(code)
                Toast.failed(`${code}:${res.data.message}`)
                break
              default:
                console.log(code)
                Toast.failed(`${code}:${res.data.message}`)
                break
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getDriverOpenIdByCode (params) {
        getDriverOpenIdByCode(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:
                this.setOpenId(res.data.openId)
                setCookie('__user__openid', res.data.openId)
                if (res.data.wetherRegister === 1) {
                  this.join()
                } else if (res.data.wetherRegister === 0) {
                  this.activate('driver')
                }
                break
              case 401:
                console.log(code)
                Toast.failed(`${code}:${res.data.message}`)
                break
              case 403:
                console.log(code)
                Toast.failed(`${code}:${res.data.message}`)
                break
              case 404:
                console.log(code)
                Toast.failed(`${code}:${res.data.message}`)
                break
              case -1:
                console.log(code)
                Toast.failed(`${code}:${res.data.message}`)
                break
              default:
                console.log(code)
                Toast.failed(`${code}:${res.data.message}`)
                break
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