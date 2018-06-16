
<template>
  <div class="home">
    <!--<md-button @click="call">叫车服务</md-button>-->
    <!--<split></split>-->
    <!--<md-button @click="join">司机加盟</md-button>-->
    跳转中
  </div>
</template>

<script>
  import {Button} from 'mand-mobile'
  import Split from './Base/Split'
  import {urlParse} from '@/common/js/utils'
  import {mapMutations} from 'vuex'
  import {getCustomerOpenIdByCode, getDriverOpenIdByCode} from '@/api/openid'

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
        this.$router.push('/driver/login')
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
                // this.setOpenId('oV8CKwoxrmesNacHdWyyiDyRr_tk')
                this.call()
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
                this.join()
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