<template>
    <div>
        <nav-bar>
            {{title}}
        </nav-bar>
        <div class="user-order-list" ref="page">
            <md-result-page
                    v-if="customerOrders.length === 0"
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
                        v-for="(item, index) in customerOrders"
                        :key="index"
                        class="scroll-view-list">
                    <p class="scroll-view-item">
                    <ul>
                        <li>订单号：{{item.series}}</li>
                        <li>订单报价：{{item.initPrice}}元/（{{item.initDistance}}公里）</li>
                        <li>订单状态：{{item.orderStatusName}}</li>
                        <li>订单状态最后变化时间：{{item.orderStatusDate}}</li>
                        <li>超里程价：{{item.overstepPrice}}元/公里</li>
                        <li>车牌号：{{item.carPlateNumber}}</li>
                        <li>车型：{{item.carTypeName}}</li>
                        <li>车尺寸：{{item.carSizeName}}</li>
                        <li>司机姓名：{{item.driverName}}</li>
                        <li>司机手机：{{item.driverMobile}}</li>
                        <li>线路别名：{{item.routerAlia}}</li>
                        <li>发货人地址：{{item.sendAddressDetail}}</li>
                        <li>发货点个数：{{item.sendGoodsLocationNum}}</li>
                        <li>发货人电话：{{item.sendGoodsPersonMobile}}</li>
                        <li>发货人名字：{{item.sendGoodsPersonName}}</li>
                        <li>收件人地址：{{item.receiveAddressDetail}}</li>
                        <li>收货人电话：{{item.receiveGoodsPersonMobile}}</li>
                        <li>收货人名字：{{item.receiveGoodsPersonName}}</li>
                        <li>路经其他站点：
                            <ul class="ul-inner">
                                <li v-for="(itm, index) in item.goodsLocation" :key="index">{{itm}}</li>
                            </ul>
                        </li>
                        <li>备注：{{item.remark}}</li>
                    </ul>
                    </p>
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
    import {ScrollView, ScrollViewMore, Button, ResultPage} from 'mand-mobile';
    import Split from '../Base/Split';
    import NavBar from '../Base/NavBar';

    import {getCustomerOrder} from '@/api/order';
    import {getCookie} from '@/common/js/cache';
    import {mapGetters, mapMutations} from 'vuex';

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
                current: 1,
                orderStatus: 0,
                routerDetailAliaSearchKey: this.$route.query.routerDetailAliaSearchKey,
                startTime: this.$route.query.startTime,
                endTime: this.$route.query.endTime,
                isFinished: false,
            };
        },
        computed: {
            ...mapGetters(['openId', 'customerOrders']),
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
                setCustomerOrders: 'SET_CUSTOMERORDERS',
            }),
            setPageHeight() {
                const height = window.screen.availHeight;
                this.$refs.page.style.height = `${height}px`;
            },
            _getCustomerOrder(params) {
                getCustomerOrder(params)
                    .then(res => {
                        if (res.code === 0) {
                            const customerOrders = res.customerOrders;
                            const total = res.total;
                            const more = this.customerOrders.concat(customerOrders);
                            this.setCustomerOrders(more);
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
                    routerDetailAliaSearchKey: this.routerDetailAliaSearchKey,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    current: this.current,
                    pageSize: 10,
                };
                this._getCustomerOrder(params);
            },
        },
    };
</script>

<style lang="stylus">
    .user-order-list {
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
            border: 4px solid #FFE2B5;

            .ul-inner {
                padding: 0 50px;
            }

            ul {
                li {
                    height: 20px;
                    line-height: 20px;
                    border-bottom: 1px dashed #ccc;

                    span {
                        color: #999CA7;
                    }
                }
            }
        }

        .actions-wrapper {
            display: flex;
        }
    }

    .md-result-page.customized {
        img {
            width: auto;
            height: 131px;
        }
    }
</style>
