<template>
    <div class="error-nosure">
        <md-result-page
                class="customized"
                img-url="//manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp"
                text="不太确定自己错在了哪里..."
                subtext="要不然刷新试试？">
        </md-result-page>
    </div>
</template>

<script>
  import {ResultPage} from 'mand-mobile'

  export default {
    name: 'error-nosure',
    components: {
      [ResultPage.name]: ResultPage,
    },
  }

</script>

<style lang="stylus">
    .error-nosure
        display flex
        height 100%
        justify-content center
        align-items center
        img
            width auto
            height 131px
</style>