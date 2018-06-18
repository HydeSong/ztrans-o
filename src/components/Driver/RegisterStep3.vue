<template>
    <div class="register-step3">
        <split></split>
        <split></split>
        <md-result-page
                img-url="//manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp"
                :text="text"
                :subtext="subtext">
        </md-result-page>
        <split></split>
        <split></split>
        <split></split>
        <split></split>
        <div class="login-btn">
            <md-button @click.native="next">去登录</md-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {ResultPage, Button, Toast} from 'mand-mobile'
  import Split from '../Base/Split'
  import {registDriver} from '@/api/register'
  import {mapGetters} from 'vuex'

  export default {
    name: 'register-step3',
    data () {
      return {
        text: '',
        subtext: ''
      }
    },
    components: {
      [ResultPage.name]: ResultPage,
      [Button.name]: Button,
      Split
    },
    computed: {
      ...mapGetters(['openId', 'step1Data', 'step2Data']),
    },
    created () {
      let params = Object.assign({}, this.step1Data, this.step2Data, {openId: this.openId})
      this._registDriver(params)
    },
    methods: {
      next () {
        this.$router.push('/driver/login')
      },
      _registDriver (params) {
        registDriver(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:
                Toast.succeed('注册成功')
                this.text = '账号注册成功'
                this.subtext = '我们准备了赚钱小技巧，请登录司机端查看'
                this.$emit('next', 3)
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
                Toast.succeed('注册失败')
                this.text = '账号注册失败'
                this.subtext = '请重新填写信息'
                break
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .register-step3
        .login-btn
            padding 0 20px
</style>
