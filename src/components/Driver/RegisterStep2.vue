<template>
    <div class="register-step2">
        <split></split>
        <md-field title="资质上传">
            <ul class="image-reader-list">
                <li
                    class="image-reader-item"
                    v-for="(img, index) in imageList['reader0']"
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
                            color="#666"
                            @click.native="onDeleteImage('reader0', index)">
                    </md-icon>
                </li>
                <li class="image-reader-item add">
                    <md-image-reader
                            name="reader0"
                            @select="onReaderSelect"
                            @complete="onReaderComplete"
                            @error="onReaderError"
                            is-multiple
                    ></md-image-reader>
                    <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
                    <p>上传身份证</p>
                </li>
            </ul>
            <ul class="image-reader-list">
                <li
                        class="image-reader-item"
                        v-for="(img, index) in imageList['reader0']"
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
                            color="#666"
                            @click.native="onDeleteImage('reader0', index)">
                    </md-icon>
                </li>
                <li class="image-reader-item add">
                    <md-image-reader
                            name="reader0"
                            @select="onReaderSelect"
                            @complete="onReaderComplete"
                            @error="onReaderError"
                            is-multiple
                    ></md-image-reader>
                    <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
                    <p>上传行驶证</p>
                </li>
            </ul>
            <ul class="image-reader-list">
                <li
                        class="image-reader-item"
                        v-for="(img, index) in imageList['reader0']"
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
                            color="#666"
                            @click.native="onDeleteImage('reader0', index)">
                    </md-icon>
                </li>
                <li class="image-reader-item add">
                    <md-image-reader
                            name="reader0"
                            @select="onReaderSelect"
                            @complete="onReaderComplete"
                            @error="onReaderError"
                            is-multiple
                    ></md-image-reader>
                    <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
                    <p>上传驾驶证</p>
                </li>
            </ul>
            <ul class="image-reader-list">
                <li
                        class="image-reader-item"
                        v-for="(img, index) in imageList['reader0']"
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
                            color="#666"
                            @click.native="onDeleteImage('reader0', index)">
                    </md-icon>
                </li>
                <li class="image-reader-item add">
                    <md-image-reader
                            name="reader0"
                            @select="onReaderSelect"
                            @complete="onReaderComplete"
                            @error="onReaderError"
                            is-multiple
                    ></md-image-reader>
                    <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
                    <p>上传人车合照</p>
                </li>
            </ul>
        </md-field>
        <split></split>
        <split></split>
        <div class="login-btn">
            <md-button @click.native="next">下一步</md-button>
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
</style>
