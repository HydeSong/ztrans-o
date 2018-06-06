<template>
    <header class="nav-bar">
        <div class="navbar-left" role="button" @click="back">
            <md-icon name="arrow-left" size="lg"></md-icon>
        </div>
        <div class="navbar-title">
            <slot></slot>
        </div>
        <div class="navbar-right" role="button">

        </div>
    </header>
</template>

<script type="text/ecmascript-6">
  import {Icon} from 'mand-mobile'

  export default {
    name: 'nav-bar',
    components: {
      [Icon.name]: Icon,
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .nav-bar
        height 90px
        background #fff
        padding 0 30px
        display flex
        div
            flex 0 1 33.33%
        .navbar-left
            display flex
            align-items center
            justify-content flex-start
        .navbar-title
            position relative
            & > div
                width 33.33%
                left 33.33%
        .navbar-right
            display flex
            align-items center
            justify-content flex-end
</style>
