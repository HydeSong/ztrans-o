<template>
    <div class="register-step2">
        <split></split>
        <md-field title="资质上传">
            <div class="upload-qualification">
                <div class="upload-qualification-item">
                    <div
                        class="image-reader-item"
                        v-for="(img, index) in imageList['identityCard']"
                        @click="showViewer(0, $event)"
                        :key="index"
                        :style="{
                          'backgroundImage': `url(${img})`,
                          'backgroundPosition': 'center center',
                          'backgroundRepeat': 'no-repeat',
                          'backgroundSize': 'cover'
                        }">
                        <md-icon
                                class="image-reader-item-del"
                                name="circle-cross"
                                color="#fc9153"
                                @click.native.stop="onDeleteImage('identityCard', index)">
                        </md-icon>
                    </div>
                    <div v-show="imageList['identityCard'].length === 0">
                        <md-image-reader
                                name="identityCard"
                                @select="onReaderSelect"
                                @complete="onReaderComplete"
                                @error="onReaderError"
                        ></md-image-reader>
                        <span class="btn-upload-identity-card">点击上传身份证</span>
                    </div>
                </div>
                <div class="upload-qualification-item">
                    <div
                        class="image-reader-item"
                        v-for="(img, index) in imageList['drivingLicense']"
                        @click="showViewer(1, $event)"
                        :key="index"
                        :style="{
                          'backgroundImage': `url(${img})`,
                          'backgroundPosition': 'center center',
                          'backgroundRepeat': 'no-repeat',
                          'backgroundSize': 'cover'
                        }">
                        <md-icon
                                class="image-reader-item-del"
                                name="circle-cross"
                                color="#fc9153"
                                @click.native.stop="onDeleteImage('drivingLicense', index)">
                        </md-icon>
                    </div>
                    <div v-show="imageList['drivingLicense'].length === 0">
                        <md-image-reader
                                name="drivingLicense"
                                @select="onReaderSelect"
                                @complete="onReaderComplete"
                                @error="onReaderError"
                        ></md-image-reader>
                        <span class="btn-upload-driving-licence1">点击上传行驶证</span>
                    </div>
                </div>
                <div class="upload-qualification-item">
                    <div
                        class="image-reader-item"
                        v-for="(img, index) in imageList['drivingPicture']"
                        @click="showViewer(2, $event)"
                        :key="index"
                        :style="{
                          'backgroundImage': `url(${img})`,
                          'backgroundPosition': 'center center',
                          'backgroundRepeat': 'no-repeat',
                          'backgroundSize': 'cover'
                        }">
                        <md-icon
                                class="image-reader-item-del"
                                name="circle-cross"
                                color="#fc9153"
                                @click.native.stop="onDeleteImage('drivingPicture', index)">
                        </md-icon>
                    </div>
                    <div v-show="imageList['drivingPicture'].length === 0">
                        <md-image-reader
                                name="drivingPicture"
                                @select="onReaderSelect"
                                @complete="onReaderComplete"
                                @error="onReaderError"
                        ></md-image-reader>
                        <span class="btn-upload-driving-licence2">点击上传驾驶证</span>
                    </div>
                </div>
                <div class="upload-qualification-item">
                    <div
                        class="image-reader-item"
                        v-for="(img, index) in imageList['persomCarPicture']"
                        @click="showViewer(3, $event)"
                        :key="index"
                        :style="{
                          'backgroundImage': `url(${img})`,
                          'backgroundPosition': 'center center',
                          'backgroundRepeat': 'no-repeat',
                          'backgroundSize': 'cover'
                        }">
                        <md-icon
                                class="image-reader-item-del"
                                name="circle-cross"
                                color="#fc9153"
                                @click.native.stop="onDeleteImage('persomCarPicture', index)">
                        </md-icon>
                    </div>
                    <div v-show="imageList['persomCarPicture'].length === 0">
                        <md-image-reader
                                name="persomCarPicture"
                                @select="onReaderSelect"
                                @complete="onReaderComplete"
                                @error="onReaderError"
                        ></md-image-reader>
                        <span class="btn-upload-group-photo">点击上传人车合照</span>
                    </div>
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
        <md-image-viewer
                v-model="isViewerShow"
                :list="imageView"
                :has-dots="true"
                :initial-index="viewerIndex">
        </md-image-viewer>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Icon, ImageReader, ImageViewer, Picker, Button, Field, FieldItem, InputItem, Toast} from 'mand-mobile'
  import Split from '../Base/Split'
  import {uploadPicture} from '@/api/picture'

  export default {
    name: 'register-step1',
    data () {
      return {
        isViewerShow: false,
        viewerIndex: 0,
        imageList: {
          identityCard: [],
          drivingLicense: [],
          drivingPicture: [],
          persomCarPicture: [],
        },
      }
    },
    components: {
      [ImageViewer.name]: ImageViewer,
      [Icon.name]: Icon,
      [ImageReader.name]: ImageReader,
      [Button.name]: Button,
      [Picker.name]: Picker,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [InputItem.name]: InputItem,
      Split
    },
    computed: {
      imageView () {
        let imageView = []
        const identityCard = this.imageList.identityCard[0]
        const drivingLicense = this.imageList.drivingLicense[0]
        const drivingPicture = this.imageList.drivingPicture[0]
        const persomCarPicture = this.imageList.persomCarPicture[0]

        identityCard && imageView.push(identityCard)
        drivingLicense && imageView.push(drivingLicense)
        drivingPicture && imageView.push(drivingPicture)
        persomCarPicture && imageView.push(persomCarPicture)
        return imageView
      }
    },
    methods: {
      showViewer(index) {
        this.viewerIndex = index
        this.isViewerShow = true
      },
      next () {
        this.$emit('next', 2)
      },
      onReaderSelect() {
        Toast.loading('图片读取中...')
      },
      onReaderComplete(name, {dataUrl, blob, file}) {
        const demoImageList = this.imageList[name] || []

        console.log('[Mand Mobile] ImageReader Complete:', 'File Name ' + file.name)
        this._uploadPicture({file, customerNumId: '1', pictureCode: '3'})
        demoImageList.push(dataUrl)
        this.$set(this.imageList, name, demoImageList)

        Toast.hide()
      },
      onReaderError(name, {msg}) {
        Toast.failed(msg)
      },
      onDeleteImage(name, index) {
        const demoImageList = this.imageList[name] || []
        demoImageList.splice(index, 1)
        this.$set(this.imageList, name, demoImageList)
      },
      _uploadPicture (params) {
        uploadPicture(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:

                break
              case 201:
                console.log(code)
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
              case -1006:
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
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .register-step2
        .login-btn
            padding 0 20px
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
        height 224px
        border-bottom 1px solid #ececec
        -webkit-box-sizing border-box
        box-sizing border-box
        position relative
        display flex
        justify-content center
        align-items center
        .md-image-reader
            width 100%
            height 100%
            position absolute
            top 0
            left 0
            display flex
            justify-content center
            align-items center
        .image-reader-item
            width 100%
            height 100%
            display flex
            justify-content flex-end
            align-items flex-start
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
