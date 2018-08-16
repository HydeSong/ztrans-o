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
                    v-for="(item, index) in customerOrders"
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
                        <md-button type="link">确认接单</md-button>
                        <md-button type="link">完成送货</md-button>
                    </div>
                </p>
            </div>
            <md-scroll-view-more
                    slot="more"
                    :is-finished="isFinished">
            </md-scroll-view-more>
        </md-scroll-view>
    </div>
</template>

<script>
  import {ScrollView, ScrollViewMore, Button} from 'mand-mobile'
  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'

  import {getCookie} from '@/common/js/cache'
  import {mapGetters} from 'vuex'

  export default {
    name: 'user-order-list',
    components: {
      [ScrollView.name]: ScrollView,
      [ScrollViewMore.name]: ScrollViewMore,
      [Button.name]: Button,
      Split,
      NavBar,
    },
    data() {
      return {
        title: '未完成订单',
        list: 10,
        isFinished: false,
        customerOrders: [{
          appointmentDate: '2018.07.31 10:19',
          carPlateNumber: '沪BBBBBBB',
          carTypeName: '大卡车',
          driverMobile: '18702181631',
          driverName: '宋海峰' ,
          initDistance: '110',
          initPrice: '110',
          orderStatusDate: '2018.07.31 10:19',
          orderStatusName: '正在运输',
          overstepPrice: '10',
          remark: '不错不错 赚钱了赚钱了',
          routerAlia: '上海->昆山',
          series: '189891891891891189'
        },{
          appointmentDate: '2018.07.31 10:19',
          carPlateNumber: '2018.07.31 10:19',
          carTypeName: '大卡车',
          driverMobile: '18702181631',
          driverName: '宋海峰' ,
          initDistance: '110',
          initPrice: '110',
          orderStatusDate: '2018.07.31 10:19',
          orderStatusName: '正在运输',
          overstepPrice: '10',
          remark: '不错不错 赚钱了赚钱了',
          routerAlia: '上海->昆山',
          series: '189891891891891189'
        },{
          appointmentDate: '2018.07.31 10:19',
          carPlateNumber: '2018.07.31 10:19',
          carTypeName: '大卡车',
          driverMobile: '18702181631',
          driverName: '宋海峰' ,
          initDistance: '110',
          initPrice: '110',
          orderStatusDate: '2018.07.31 10:19',
          orderStatusName: '正在运输',
          overstepPrice: '10',
          remark: '不错不错 赚钱了赚钱了',
          routerAlia: '上海->昆山',
          series: '189891891891891189'
        }]
      }
    },
    computed: {
      ...mapGetters(['openId', 'customerOrders'])
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