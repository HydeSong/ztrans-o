<template>
    <div class="order-list">
        <nav-bar>
            {{title}}
        </nav-bar>
        <div class="content">
            <md-scroll-view
                    ref="scrollView"
                    :scrolling-x="false"
                    @endReached="$_onEndReached">
                <div
                        v-for="i in list"
                        :key="i"
                        class="scroll-view-list">
                    <p class="scroll-view-item">{{i}}</p>
                </div>
                <md-scroll-view-more
                        slot="more"
                        :is-finished="isFinished">
                </md-scroll-view-more>
            </md-scroll-view>
        </div>
    </div>
</template>

<script>
  import {ScrollView, ScrollViewMore} from 'mand-mobile'
  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'

  export default {
    name: 'driver-order-list',
    components: {
      [ScrollView.name]: ScrollView,
      [ScrollViewMore.name]: ScrollViewMore,
      Split,
      NavBar
    },
    data() {
      return {
        title: '未完成订单',
        list: 10,
        isFinished: false,
      }
    },
    methods: {
      $_onEndReached() {
        if (this.isFinished) {
          return
        }
        // async data
        setTimeout(() => {
          this.list += 5
          if (this.list >= 20) {
            this.isFinished = true
          }
          this.$refs.scrollView.finishLoadMore()
        }, 1000)
      },
    },
  }

</script>

<style lang="stylus">
    .order-list
        height 100%
        .scroll-view-item
            padding 30px 0
            text-align center
            font-size 32px
            font-family DINAlternate-Bold
            border-bottom .5px solid #efefef
</style>