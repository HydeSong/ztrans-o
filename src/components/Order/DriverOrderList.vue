<template>
    <div>
        <nav-bar>
            {{title}}
        </nav-bar>
        <div class="driver-order-list" ref="page">
            <md-result-page
                    v-if="driverOrders.length === 0"
                    class="customized"
                    img-url="//manhattan.didistatic.com/static/manhattan/mfd/result-page/lost"
                    text="没有订单"
                    subtext="要不然刷新试试？">
            </md-result-page>
            <md-scroll-view
                    v-else
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
                          <li>司机真实价：{{item.driverRealPrice}}元</li>
                          <li>客户名字：{{item.customerName}}</li>
                          <li>线路别名：{{item.routerAlia}}</li>
                          <li>用车时间：{{item.appointmentDate}}</li>
                          <li>订单状态：{{item.orderStatusName}}</li>
                          <li>订单状态最后变化时间：{{item.orderStatusDate}}</li>
                          <li>发货人地址：{{item.sendAddressDetail}}</li>
                          <li>发货点个数：{{item.sendGoodsLocationNum}}</li>
                          <li>发货人电话：{{item.sendGoodsPersonMobile}}</li>
                          <li>发货人名字：{{item.sendGoodsPersonName}}</li>
                          <li>收件人地址：{{item.receiveAddressDetail}}</li>
                          <li>收货人电话：{{item.receiveGoodsPersonMobile}}</li>
                          <li>收货人名字：{{item.receiveGoodsPersonName}}</li>
                          <li>路经其他站点：<ul class="ul-inner">
                              <li v-for="(itm, index) in item.goodsLocation" :key="index">{{itm}}</li>
                          </ul>
                          </li>
                          <li>备注：{{item.remark}}</li>
                      </ul>
                      <div class="actions-wrapper" v-if="orderStatus == 0">
                          <md-button type="link" v-if="item.orderStatusName === '已接单'" disabled>已接单</md-button>
                          <md-button type="link" v-else @click.native="onComfirmOrder(item)">确认接单</md-button>
                          <md-button type="link" @click.native="onCompleteOrder(item)">完成订单</md-button>
                      </div>
                    </p>
                </div>
                <md-scroll-view-more
                        slot="more"
                        :is-finished="isFinished">
                </md-scroll-view-more>
            </md-scroll-view>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import {
  ScrollView,
  ScrollViewMore,
  Button,
  ResultPage,
  Toast,
} from 'mand-mobile';
import Split from '../Base/Split';
import NavBar from '../Base/NavBar';

import {updateDriverOrder, getDriverOrder} from '@/api/order';
import {getCookie, setCookie} from '@/common/js/cache';
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'driver-order-list',
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
      current: 1,
      orderStatus: this.$route.query.orderStatus,
      startTime: this.$route.query.startTime,
      endTime: this.$route.query.endTime,
      isFinished: false,
    };
  },
  watch: {
    $route(to, from) {
      if (to.path === '/driver/driver-order-list') {
        // fix: 查询订单时返回后会报错
        const orderStatus = getCookie('__user__orderstatus')
        const startTime = getCookie('__user__starttime')
        const endTime = getCookie('__user__endtime')
        const params = {
          openId: this.openId || getCookie('__user__openid'),
          orderStatus: orderStatus,
          routerDetailAliaSearchKey: '',
          startTime: startTime,
          endTime: endTime,
          current: this.current,
          pageSize: 10,
        };
        console.log(params);
        this._getDriverOrder(params);
      }
    },
  },
  computed: {
    ...mapGetters(['openId', 'driverOrders']),
    title() {
      this.orderStatus = this.$route.query.orderStatus;
      return this.orderStatus == 0 ? '未完成订单' : '已完成订单';
    },
  },
  mounted() {
    setTimeout(() => {
      this.setPageHeight();
    }, 0);
  },
  methods: {
    ...mapMutations({
      setDriverOrders: 'SET_DRIVERORDERS',
    }),
    setPageHeight() {
      const height = window.screen.availHeight;
      this.$refs.page.style.height = `${height}px`;
    },
    _getDriverOrder(params) {
      getDriverOrder(params)
        .then(res => {
          if (res.code === 0) {
            const driverOrders = res.driverOrder;
            const total = res.total;
            const more = this.driverOrders.concat(driverOrders);
            this.setDriverOrders(more);
            if (more.length >= total) {
              this.isFinished = true;
            }
            this.$refs.scrollView.finishLoadMore();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    $_onEndReached() {
      if (this.isFinished) {
        return;
      }
      // async data
      this.current++;
      const params = {
        openId: this.openId || getCookie('__user__openid'),
        orderStatus: this.orderStatus,
        routerDetailAliaSearchKey: '',
        startTime: this.startTime,
        endTime: this.endTime,
        current: this.current,
        pageSize: 10,
      };
      this._getDriverOrder(params);
    },
    _updateDriverOrder(params) {
      Toast.loading('正在提交');
      updateDriverOrder(params)
        .then(res => {
          if (res.code === 0) {
            Toast.succeed('成功');
            // 重新获取司机订单
            const params = {
              openId: this.openId || getCookie('__user__openid'),
              orderStatus: this.orderStatus,
              routerDetailAliaSearchKey: '',
              startTime: this.startTime,
              endTime: this.endTime,
              current: this.current,
              pageSize: 10,
            };
            this._getDriverOrder(params);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onComfirmOrder(item) {
      this._updateDriverOrder({
        openId: this.openId || getCookie('__user__openid'),
        orderStatus: 2,
        series: item.series,
      });
    },
    onCompleteOrder(item) {
      // fix: 查询订单时返回后会报错
      setCookie('__user__orderstatus', this.orderStatus)
      setCookie('__user__starttime', this.startTime)
      setCookie('__user__endtime', this.endTime)
      this.$router.push({
        path: '/driver/driver-order-list/driver-order-approval',
        query: {
          series: item.series,
          orderStatus: this.orderStatus,
          startTime: this.startTime,
          endTime: this.endTime,
        },
      });
    },
  },
};
</script>

<style lang="stylus">
.driver-order-list {
  padding: 0 0 200px;
  height: 700px;

  .md-scroll-view {
    background: transparent;
    height: 100%;
  }

  .scroll-view-list {
    padding: 0 20px;
    margin: 30px 0 30px;
  }

  .scroll-view-item {
    width: 100%;
    padding: 60px 0 60px;
    color: #333;
    font-size: 24px;
    text-align: left;
    background: #fff;
    box-sizing: border-box;
    line-height: 1.5;
    text-indent: 2em;

    .ul-inner {
      padding: 0 50px;
    }
  }

  .actions-wrapper {
    display: flex;
  }
}
</style>
