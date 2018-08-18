<template>
    <div class="profile">
        <split></split>
        <div class="content">
            <div class="order-footer">
                <split></split>
                <md-button @click.native="onSearchDriverOrder">查询订单</md-button>
            </div>
        </div>
    </div>
</template>

<script>
  import { Button } from 'mand-mobile'
  import Split from '../Base/Split'

  export default {
    name: 'profile',
    components: {
      [Button.name]: Button,
      Split,
    },
    methods: {
      onSearchDriverOrder () {
        this.$router.push('/driver-order')
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .content {
        height 100%
    }
    .order-footer {
        margin: 16px*2 10px*2;
    }
</style>
