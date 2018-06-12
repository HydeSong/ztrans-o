<template>
    <div class="register-step3">
        <split></split>
        <split></split>
        <md-result-page
                text="账号注册成功"
                subtext="我们准备了赚钱小技巧，请登录司机端查看">
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
  import {ResultPage, Picker, Button, Field, FieldItem, InputItem, Dialog} from 'mand-mobile'
  import Split from '../Base/Split'
  import simple from 'mand-mobile/components/picker/demo/data/simple'

  export default {
    name: 'register-step3',
    data () {
      return {
        isOrderCityShow: false,
        orderCity: '',
        name: '',
        ID: '',
        inviteMobile: '',
        isCarInfoShow: false,
        carInfo: '',
        license: '',
        pickerData0: simple
      }
    },
    components: {
      [ResultPage.name]: ResultPage,
      [Button.name]: Button,
      [Picker.name]: Picker,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [InputItem.name]: InputItem,
      Split
    },
    methods: {
      next () {
        this.$router.push('/driver/login')
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .register-step3
        .login-btn
            padding 0 20px
</style>
