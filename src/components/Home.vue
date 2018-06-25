
<template>
  <div class="home">
    跳转中
  </div>
</template>

<script>
  import {Button} from 'mand-mobile'
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
        setOpenId: 'SET_OPENID'
      }),
      call () {
        this.$router.push('/user')
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
                if (res.data.wetherRegister === 1) {
                  this.call()
                } else if (res.data.wetherRegister === 0) {
                  this.activate('user')
                }
                break
              case 401:
                console.log(code)
                break
              case 403:
                console.log(code)
                break
              case 404:
                console.log(code)
                break
              case -1:
                console.log(code)
                break
              default:
                console.log(code)
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
                break
              case 403:
                console.log(code)
                break
              case 404:
                console.log(code)
                break
              case -1:
                console.log(code)
                break
              default:
                console.log(code)
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