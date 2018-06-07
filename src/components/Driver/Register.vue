<template>
    <div class="register">
        <nav-bar>
            司机加盟
        </nav-bar>
        <div class="content">
            <split></split>
            <div class="stepsbar">
                <md-steps
                        :steps="steps"
                        :current="currentStep">
                </md-steps>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Steps} from 'mand-mobile'
  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'

  export default {
    name: 'register',
    components: {
      [Steps.name]: Steps,
      Split,
      NavBar
    },
    data() {
      return {
        steps: [
          {
            name: '填写信息',
          },
          {
            name: '上传照片',
          },
          {
            name: '查看结果',
          }
        ],
        currentStep: 0,
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .register
        .content
            .stepsbar
                padding: 40px 0 20px;
                background #fff
</style>
