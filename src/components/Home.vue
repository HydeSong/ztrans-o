
<template>
  <div class="navigation">
    <md-button @click="call">叫车服务</md-button>
    <split></split>
    <md-button @click="join">司机加盟</md-button>
  </div>
</template>

<script>
  import {Button} from 'mand-mobile'
  import Split from './Base/Split'

  export default {
    name: 'App',
    components: {
      [Button.name]: Button,
      Split
    },
    methods: {
      call () {
        this.$router.push('/user')
      },
      join () {
        this.$router.push('/driver')
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>