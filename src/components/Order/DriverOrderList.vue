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
                <div v-for="(item, index) in driverOrders"
                     :key="index"
                     class="scroll-view-list">
                    <div class="scroll-view-item">
                        <ul class="bill-list" @click="_detail(item)">
                            <li><span>订单号：</span>{{item.series}}</li>
                            <li><span>司机真实价：</span>{{item.driverRealPrice}}元</li>
                            <li><span>司机额外费用：</span>{{item.driverAddFee}}元</li>
                            <li><span>客户名字：</span>{{item.customerName}}</li>
                            <li><span>线路别名：</span>{{item.routerAlia}}</li>
                            <li><span>用车时间：</span>{{item.appointmentDate}}</li>
                            <li><span>订单状态：</span>{{item.orderStatusName}}</li>
                            <li><span>订单状态最后变化时间：</span>{{item.orderStatusDate}}</li>
                            <li><span>发货人地址：</span>{{item.sendAddressDetail}}</li>
                            <li><span>发货点个数：</span>{{item.sendGoodsLocationNum}}</li>
                            <li><span>发货人电话：</span>{{item.sendGoodsPersonMobile}}</li>
                            <li><span>发货人名字：</span>{{item.sendGoodsPersonName}}</li>
                            <li><span>收件人地址：</span>{{item.receiveAddressDetail}}</li>
                            <li><span>收货人电话：</span>{{item.receiveGoodsPersonMobile}}</li>
                            <li><span>收货人名字：</span>{{item.receiveGoodsPersonName}}</li>
                            <li><span>路经其他站点：</span>
                                <ul class="ul-inner">
                                    <li v-for="(itm, index) in item.goodsLocation" :key="index">{{itm}}</li>
                                </ul>
                            </li>
                            <li><span>备注：</span>{{item.remark}}</li>
                        </ul>
                    </div>
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
        Dialog,
        ScrollView,
        ScrollViewMore,
        Button,
        ResultPage,
    } from 'mand-mobile';
    import Split from '../Base/Split';
    import NavBar from '../Base/NavBar';

    import {updateDriverOrder, getDriverOrder} from '@/api/order';
    import {getCookie, setCookie} from '@/common/js/cache';
    import {mapGetters, mapMutations} from 'vuex';

    export default {
        name: 'driver-order-list',
        components: {
            [Dialog.name]: Dialog,
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
                setOrderDetail: 'SET_ORDERDETAIL'
            }),
            setPageHeight() {
                const height = window.screen.availHeight;
                this.$refs.page.style.height = `${height}px`;
            },
            _detail(item) {
                this.setOrderDetail(item)
                this.$router.push(`/driver/order-detail?orderStatus=${this.orderStatus}&startTime=${this.startTime}&endTime=${this.endTime}`)
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
            }
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
            padding: 10px 0 0;
            color: #333;
            font-size: 24px;
            text-align: left;
            background: #fff;
            box-sizing: border-box;
            line-height: 1.5;
            text-indent: 2em;
            border: 4px solid #FFE2B5;

            ul.ul-inner {
                padding: 0 50px;

                li {
                    border: 0 !important;
                }
            }

            ul.bill-list {
                li {
                    padding: 5px 0;
                    border-bottom: 1px dashed #ccc;

                    span {
                        color: #999CA7;
                    }
                }
            }
        }

        .actions-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .md-button {
                flex: 1;
                margin: 2px;
            }
        }
    }
</style>
