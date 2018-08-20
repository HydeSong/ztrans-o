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
            <step1 v-if="currentStep === 0" @next="next"></step1>
            <step2 v-if="currentStep === 1" @next="next"></step2>
            <step3 v-if="currentStep >= 2" @next="next"></step3>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Steps} from 'mand-mobile'
  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'
  import Step1 from '@/components/Driver/RegisterStep1'
  import Step2 from '@/components/Driver/RegisterStep2'
  import Step3 from '@/components/Driver/RegisterStep3'

  export default {
    name: 'register',
    components: {
      [Steps.name]: Steps,
      Split,
      NavBar,
      Step1,
      Step2,
      Step3
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
        currentStep: 0
      }
    },
    methods: {
      next (step) {
        this.currentStep = step
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .register
        .content
            .stepsbar
                padding: 40px 0 20px;
                background #fff
</style>