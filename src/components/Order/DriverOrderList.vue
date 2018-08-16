<template>
    <div class="user-order-list">
        <nav-bar>
            {{title}}
        </nav-bar>
        <md-scroll-view
                ref="scrollView"
                :scrolling-x="false"
                @endReached="$_onEndReached">
            <div
                    v-for="(item, index) in driverOrders"
                    :key="index"
                    class="scroll-view-list">
                <p class="scroll-view-item">
                <ul>
                    <li>订单号：{{item.series}}</li>
                    <li>司机报价：{{item.initPrice}}元/（{{item.initDistance}}公里）</li>
                    <li>订单状态：{{item.orderStatusName}}</li>
                    <li>订单状态最后变化时间：{{item.orderStatusDate}}</li>
                    <li>超里程价：{{item.overstepPrice}}元/公里</li>
                    <li>车牌号：{{item.carPlateNumber}}</li>
                    <li>车型：{{item.carTypeName}}</li>
                    <li>司机姓名：{{item.driverName}}</li>
                    <li>司机手机：{{item.driverMobile}}</li>
                    <li>线路别名：{{item.routerAlia}}</li>
                    <li>预约时间：{{item.appointmentDate}}</li>
                    <li>备注：{{item.remark}}</li>
                </ul>
                <div class="actions-wrapper">
                    <md-button type="link" @click.native="onComfirmOrder(item)">确认接单</md-button>
                    <md-button type="link" @click.native="onCompleteOrder(item)">完成送货</md-button>
                </div>
                </p>
            </div>
            <md-scroll-view-more
                    slot="more"
                    :is-finished="isFinished">
            </md-scroll-view-more>
        </md-scroll-view>
        <md-result-page
                v-if="driverOrders.length === 0"
                class="customized"
                img-url="//manhattan.didistatic.com/static/manhattan/mfd/result-page/lost"
                text="没有订单"
                subtext="要不然刷新试试？">
        </md-result-page>
    </div>
</template>

<script>
  import {ScrollView, ScrollViewMore, Button, ResultPage} from 'mand-mobile'
  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'

  import {updateDriverOrder} from '@/api/order'
  import {getCookie} from '@/common/js/cache'
  import {mapGetters} from 'vuex'

  export default {
    name: 'user-order-list',
    components: {
      [ScrollView.name]: ScrollView,
      [ScrollViewMore.name]: ScrollViewMore,
      [Button.name]: Button,
      [ResultPage.name]: ResultPage,
      Split,
      NavBar,
    },
    data() {
      return {
        list: 10,
        isFinished: false
      }
    },
    computed: {
      ...mapGetters(['openId', 'driverOrders']),
      title () {
        const orderStatus = this.$route.query.orderStatus
        return orderStatus == 0 ? '未完成订单' : '已完成订单'
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
      _updateDriverOrder (params) {
        Toast.loading('正在提交')
        updateDriverOrder(params).then(res => {
          if (res.code === 0) {
            Toast.succeed('成功')
          }
        }).catch(err => {
          console.log(err)
        })
      },
      onComfirmOrder (item) {
        this._updateDriverOrder({
          openId: this.openId || getCookie('__user__openid'),
          orderStatus: 2,
          series: item.series
        })
      },
      onCompleteOrder (item) {
        this._updateDriverOrder({
          openId: this.openId || getCookie('__user__openid'),
          orderStatus: 5,
          series: item.series
        })
      }
    },
  }

</script>

<style lang="stylus">
    .user-order-list
        .md-scroll-view
            background transparent
        .scroll-view-list
            padding 0 20px
            margin 30px 0 30px
        .scroll-view-item
            width 100%
            padding 60px 0 60px
            color #333
            font-size 24px
            text-align left
            background #fff
            box-sizing border-box
            line-height 1.5
            text-indent 2em
        .actions-wrapper
            display flex
</style>