<template>
    <div class="error-404">
        <md-result-page
                type="lost">
        </md-result-page>
    </div>
</template>

<script>
  import {ResultPage} from 'mand-mobile'

  export default {
    name: 'error-404',
    components: {
      [ResultPage.name]: ResultPage,
    },
  }

</script>

<style lang="stylus">
    .error-404
        display flex
        height 100%
        justify-content center
        align-items center
        img
            height 131px
</style>