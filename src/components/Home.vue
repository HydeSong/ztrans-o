
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
  import {getWxCode} from '../api/openid'
  import {mapMutations} from 'vuex'

  export default {
    name: 'home',
    components: {
      [Button.name]: Button,
      Split
    },
    created () {
      this._getWxCode()
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
        const wxcode = getWxCode()
        this.setWxCode(wxcode)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home
    padding 30px
</style>