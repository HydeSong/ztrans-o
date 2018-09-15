<template>
    <div class="activate">
        <nav-bar>
            账号激活
        </nav-bar>
        <div class="content">
            <div class="banner">
                <md-swiper
                        @before-change="beforeChange"
                        @after-change="afterChange"
                        :autoplay="5000"
                        transition="fade"
                        ref="swiper">
                    <md-swiper-item :key="index" v-for="(item, index) in banners">
                        <a href="javascript:void(0)"
                           class="banner-item"
                        ><img :src="item.img" alt=""></a>
                    </md-swiper-item>
                </md-swiper>
            </div>
            <div class="login-form">
                <md-field :style="{position: 'relative'}">
                    <md-input-item
                            ref="phone"
                            type="phone"
                            v-model="phone"
                            placeholder="请输入手机号码"
                    ></md-input-item>
                    <md-input-item
                            ref="code"
                            type="digit"
                            v-model="code"
                            maxlength="6"
                            placeholder="请输入验证码"
                    ></md-input-item>
                    <md-button type="ghost" class="getverify" @click.native="getVerify" :disabled="disabledVerify">{{btnTxt}}</md-button>
                </md-field>
                <split></split>
                <split></split>
                <split></split>
                <div class="login-btn">
                    <md-button @click="activate" :disabled="disabled">激活</md-button>
                </div>
                <split></split>
                <p class="discription">账号在系统中未激活，请点击“激活”</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Toast, Button, Field, FieldItem, InputItem, Swiper, SwiperItem, Codebox} from 'mand-mobile'
  import Split from './Base/Split'
  import NavBar from './Base/NavBar'
  import {getMobileCode, getContactMobileCode} from '@/api/sms'
  import {registContact, alivedDriver} from '@/api/activate'
  import {getCookie} from '@/common/js/cache'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'activate',
    components: {
      [Codebox.name]: Codebox,
      [Button.name]: Button,
      [Swiper.name]: Swiper,
      [SwiperItem.name]: SwiperItem,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [InputItem.name]: InputItem,
      Split,
      NavBar
    },
    data() {
      return {
        code: '',
        phone: '',
        mobileCode: '',
        timeout: 60,
        timer: null,
        disabledVerify: false,
        btnTxt: '获取验证码',
        banners: [{
          img: require('../assets/images/index_banner1.png')
        }, {
          img: require('../assets/images/index_banner2.png')
        }, {
          img: require('../assets/images/index_banner3.png')
        }]
      }
    },
    computed: {
      ...mapGetters(['openId']),
      disabled () {
        return !(this.code && this.phone)
      }
    },
    mounted () {
      window.triggerSwiper3 = () => {
        this.goto()
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    methods: {
      ...mapMutations({
        setCustomerInfo: 'SET_CUSTOMERINFO',
        setDriverMobilePhone: 'SET_DRIVERMOBILEPHONE'
      }),
      _alivedDriver (params) {
        alivedDriver(params).then(res => {
          if (res.code === 0) {
            // 保存contactName， customerMasterId， mobilePhone 供简易下单使用
            // this.setCustomerInfo(res)
            Toast.succeed('激活成功')
            if (res.wetherRegister === 'Y') {
              this.$router.push('/driver/driver-order')
            } else if (res.wetherRegister === 'N') {
              this.$router.push('/driver/register-step')
              this.setDriverMobilePhone(this.phone)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _registContact (params) {
        // console.log(params)
        registContact(params).then(res => {
          if (res.code === 0) {
            // 保存contactName， customerMasterId， mobilePhone 供简易下单使用
            // this.setCustomerInfo(res)
            Toast.succeed('激活成功')
            let from = this.$route.query.from
            this.$router.replace(from)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getVerify () {
        if (!this.phone) {
          Toast.failed('请输入手机号！')
          return
        }
        this.timer = setInterval(() => {
          if (this.timeout > 0) {
            this.disabledVerify = true
            this.btnTxt = `${this.timeout}s后重新获取`
            this.timeout--
            console.log(this.timeout)
          } else {
            clearInterval(this.timer)
            this.disabledVerify = false
            this.btnTxt = `获取验证码`
            this.timeout = 60
          }
        }, 1000)

        let from = this.$route.query.from
        if (from === 'driver') {
          getMobileCode({mobilePhone: this.phone}).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.mobileCode = res.mobileCode
            }
          }).catch(err => {
            console.log(err)
          })
        } else if (from === 'user') {
          getContactMobileCode({mobilePhone: this.phone}).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.mobileCode = res.mobileCode
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      setValue(id, value) {
        document.querySelector(id) && (document.querySelector(id).innerHTML = value)
      },
      beforeChange(from, to) {
        this.setValue('#valueSwiper10', from)
        this.setValue('#valueSwiper11', to)
      },
      afterChange(from, to) {
        this.setValue('#valueSwiper12', from)
        this.setValue('#valueSwiper13', to)
      },
      goto() {
        this.$refs.swiper.goto(2)
      },
      activate() {
        let from = this.$route.query.from
        if (from === 'driver') {
          this._alivedDriver({mobileCode: this.code, mobilePhone: this.phone, openId: this.openId || getCookie('__user__openid')})
        } else if (from === 'user') {
          this._registContact({mobileCode: this.code, mobilePhone: this.phone, openId: this.openId || getCookie('__user__openid')})
        }
      },
      login() {
        console.log('login')
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .activate
        text-align center
    .banner
        height 350px
        .banner-item
            float left
            width 100%
            height 100%
            line-height 250px
            text-align center
            font-size 28px
            color #FFF
            box-align center
            align-items center
            box-pack center
            justify-content center
            text-decoration-line none
            img
                width 100%
    .login-form
        padding 40px 0
        background-color #fff
        .discription
            font-size 24px
        .getverify
            position absolute
            bottom 20px
            right 32px
            width 1.8rem
        .login-btn
            padding 0 20px
</style>
