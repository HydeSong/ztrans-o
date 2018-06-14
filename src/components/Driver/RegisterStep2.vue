<template>
    <div class="register-step2">
        <split></split>
        <md-field title="资质上传">
            <div class="upload-qualification">
                <div class="upload-qualification-item">
                    <input type="file" />
                    <span class="btn-upload-identity-card">点击上传身份证</span>
                </div>
                <div class="upload-qualification-item">
                    <input type="file" />
                    <span class="btn-upload-driving-licence1">点击上传行驶证</span>
                </div>
                <div class="upload-qualification-item">
                    <input type="file" />
                    <span class="btn-upload-driving-licence2">点击上传驾驶证</span>
                </div>
                <div class="upload-qualification-item">
                    <input type="file" />
                    <span class="btn-upload-group-photo">点击上传人车合照</span>
                </div>
            </div>
            <split></split>
            <split></split>
        </md-field>
        <split></split>
        <split></split>
        <div class="login-btn">
            <md-button @click.native="next">提交认证</md-button>
            <split></split>
            <ol class="register-step2-tips">
                <li>1. 您所提供的所有信息仅用于核实您的身份，不会向任何第三方泄露，请放心上传</li>
                <li>2. 完善真实有效的信息才可认证通过</li>
                <li>3. 遇到问题，请拨打客服电话400-400-2088</li>
            </ol>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Icon, ImageReader, Picker, Button, Field, FieldItem, InputItem, Dialog} from 'mand-mobile'
  import Split from '../Base/Split'

  export default {
    name: 'register-step1',
    data () {
      return {
        imageList: {
          reader0: [
            '//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
          ],
          reader1: [],
        }
      }
    },
    components: {
      [Icon.name]: Icon,
      [ImageReader.name]: ImageReader,
      [Button.name]: Button,
      [Picker.name]: Picker,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [InputItem.name]: InputItem,
      Split
    },
    methods: {
      next () {
        this.$router.push('/driver/register/3')
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .register-step2
        .login-btn
            padding 0 20px
        .image-reader-list
            float left
            width 100%
            .image-reader-item
                position relative
                float left
                width 23.5%
                padding-bottom 23.5%
                margin-bottom 2%
                margin-right 2%
                background color-bg-base
                box-sizing border-box
                list-style none
                border-radius radius-normal
                hairline(all, color-border-base)
                background-size cover
                &:nth-of-type(4n)
                    margin-right 0
                &.add
                    .md-icon
                        position absolute
                        top 40%
                        left 50%
                        transform translate(-50%, -50%)
                        opacity .5
                    p
                        position absolute
                        top 50%
                        left 0
                        width 100%
                        margin-top 15px
                        font-size font-minor-normal
                        color color-text-disabled
                        text-align center
                .image-reader-item-del
                    position absolute
                    top 5px
                    right 5px
                    z-index 3
                    background #EEE
                    border-radius radius-circle
    .upload-qualification
        display -ms-flexbox
        display flex
        -ms-flex-align center
        align-items center
        -ms-flex-pack center
        justify-content center
        -ms-flex-wrap wrap
        flex-wrap wrap
    .upload-qualification-item
        width 50%
        padding 16px*2 0
        border-bottom 1px solid #ececec
        -webkit-box-sizing border-box
        box-sizing border-box
    .upload-qualification-item:nth-child(2n)
        border-left 1px solid #ececec
    .upload-qualification-item:nth-child(3),.upload-qualification-item:nth-child(4)
        border-bottom 0
    .upload-qualification-item input
        display none
    .upload-qualification-item span
        display block
        width 100%
        padding-top 60px*2
        text-align center
        color #363636
    .btn-upload-identity-card
        background url('../../assets/images/icon-user.png') no-repeat center 10px*2
    .btn-upload-driving-licence1
        background url('../../assets/images/icon-car.png') no-repeat center 10px*2
    .btn-upload-driving-licence2
        background url('../../assets/images/icon-steering-wheel.png') no-repeat center 10px*2
    .btn-upload-group-photo
        background url('../../assets/images/icon-photo.png') no-repeat center 10px*2

    .register-step2-tips
        list-style decimal
        text-align left
        margin 12px 0 0
        padding-left 20px
        font-size .875em
        line-height 1.5em
        color #a1a1a1
</style>
