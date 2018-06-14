
<template>
  <div class="home">
    <md-button @click="call">叫车服务</md-button>
    <split></split>
    <md-button @click="join">司机加盟</md-button>
  </div>
</template>

<script>
  import {Button} from 'mand-mobile'
  import Split from './Base/Split'
  import {urlParse} from '@/common/js/utils'
  import {mapMutations} from 'vuex'

  export default {
    name: 'home',
    components: {
      [Button.name]: Button,
      Split
    },
    mounted () {
      this.$nextTick(() => {
        setTimeout(() => {
          this._getWxCode()
        }, 1000)
      })
    },
    methods: {
      ...mapMutations({
        setWxCode: 'SET_WXCODE'
      }),
      call () {
        this.$router.push('/user')
      },
      join () {
        this.$router.push('/driver/login')
      },
      _getWxCode () {
        const queryStr = urlParse(window)
        const wxcode = queryStr.code
        const state = queryStr.state
        this.setWxCode(wxcode)
        if (state === '1') {
          this.call()
        } else if (state === '2') {
          this.join()
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home
    padding 30px
</style>