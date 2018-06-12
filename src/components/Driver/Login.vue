<template>
    <div class="login">
        <nav-bar>
            司机加盟
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
                    <md-button @click="register" :disabled="disabled">去注册</md-button>
                </div>
                <split></split>
                <p class="discription">点击“去注册”即代表同意《司机协议》</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Toast, Button, Field, FieldItem, InputItem, Switch, Swiper, SwiperItem, Codebox} from 'mand-mobile'
  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'
  import {getMobileCode} from '@/api/sms'

  export default {
    name: 'login',
    components: {
      [Codebox.name]: Codebox,
      [Button.name]: Button,
      [Swiper.name]: Swiper,
      [SwiperItem.name]: SwiperItem,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [InputItem.name]: InputItem,
      [Switch.name]: Switch,
      Split,
      NavBar
    },
    data() {
      return {
        code: '',
        phone: '',
        timeout: 60,
        timer: null,
        disabledVerify: false,
        btnTxt: '获取验证码',
        banners: [{
          img: require('../../assets/images/index_banner.png')
        }, {
          img: require('../../assets/images/index_banner.png')
        }]
      }
    },
    computed: {
      disabled () {
        return !(this.code && this.phone)
      }
    },
    mounted() {
      window.triggerSwiper3 = () => {
        this.goto()
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    methods: {
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
        getMobileCode({mobilePhone: this.phone}).then(res => {
          console.log(res)
        })
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
      register() {
        this.$router.push('/driver/register/1')
      },
      login() {
        console.log('login')
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
        .login-btn
            padding 0 20px
</style>
