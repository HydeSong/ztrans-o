<template>
    <div>
        <nav-bar>
            订单详情
        </nav-bar>
        <div class="order-detail" ref="page">
            <h1>{{orderDetail.orderStatusName}}</h1>
            <ul class="bill-list">
                <li><span>订单号：</span><span>{{orderDetail.series}}</span></li>
                <li><span>司机真实价：</span><span>{{orderDetail.driverRealPrice}}元</span></li>
                <li><span>司机额外费用：</span><span>{{orderDetail.driverAddFee}}元</span></li>
                <li><span>客户名字：</span><span>{{orderDetail.customerName}}</span></li>
                <li><span>线路别名：</span><span>{{orderDetail.routerAlia}}</span></li>
                <li><span>用车时间：</span><span>{{orderDetail.appointmentDate}}</span></li>
                <li><span>订单状态：</span><span>{{orderDetail.orderStatusName}}</span></li>
                <li><span>更新时间：</span><span>{{orderDetail.orderStatusDate}}</span></li>
                <li><span>发货人地址：</span><span>{{orderDetail.sendAddressDetail}}</span></li>
                <li><span>发货点个数：</span><span>{{orderDetail.sendGoodsLocationNum}}</span></li>
                <li><span>发货人电话：</span><span>{{orderDetail.sendGoodsPersonMobile}}</span></li>
                <li><span>发货人名字：</span><span>{{orderDetail.sendGoodsPersonName}}</span></li>
                <li><span>收件人地址：</span><span>{{orderDetail.receiveAddressDetail}}</span></li>
                <li><span>收货人电话：</span><span>{{orderDetail.receiveGoodsPersonMobile}}</span></li>
                <li><span>收货人名字：</span><span>{{orderDetail.receiveGoodsPersonName}}</span></li>
                <li><span>路经其他站点：</span>
                    <span>
                     <ul class="ul-inner">
                        <li v-for="(itm, index) in orderDetail.goodsLocation" :key="index">{{itm}}</li>
                     </ul>
                </span>
                </li>
                <li><span>备注：</span><span>{{orderDetail.remark}}</span></li>
            </ul>
            <md-action-bar :actions="actions"></md-action-bar>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {
        Dialog,
        Button,
        ActionBar,
        Toast,
    } from 'mand-mobile'
    import NavBar from '../Base/NavBar'

    import {updateDriverOrder} from '@/api/order'
    import {getCookie, setCookie} from '@/common/js/cache'
    import {mapGetters} from 'vuex'

    export default {
        name: 'order-detail',
        components: {
            [Dialog.name]: Dialog,
            [Button.name]: Button,
            [ActionBar.name]: ActionBar,
            NavBar,
        },
        data() {
            return {
                orderStatus: this.$route.query.orderStatus,
                startTime: this.$route.query.startTime,
                endTime: this.$route.query.endTime,
                actions: [
                    {
                        text: '靠车',
                        onClick: this.onKaoche
                    },
                    {
                        text: '发车',
                        onClick: this.onFache
                    },
                    {
                        text: '到达',
                        onClick: this.onDaoda
                    },
                    {
                        text: '完成订单',
                        onClick: this.onCompleteOrder
                    },
                    {
                        text: '确认接单',
                        onClick: this.onComfirmOrder,
                    },
                ],
            }
        },
        computed: {
            ...mapGetters(['orderDetail', 'openId', 'driverOrders'])
        },
        mounted() {
            setTimeout(() => {
                this.setPageHeight();
            }, 0);
        },
        methods: {
            setPageHeight() {
                const height = window.screen.availHeight;
                this.$refs.page.style.height = `${height}px`;
            },
            _updateDriverOrder(params) {
                Toast.loading('正在提交');
                updateDriverOrder(params)
                    .then(res => {
                        if (res.code === 0) {
                            Toast.succeed('成功');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            onComfirmOrder() {
                let item = this.orderDetail
                this._updateDriverOrder({
                    openId: this.openId || getCookie('__user__openid'),
                    orderStatus: 2,
                    series: item.series,
                });
            },
            onCompleteOrder() {
                // fix: 查询订单时返回后会报错
                let item = this.orderDetail
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
            onKaoche() {
                let item = this.orderDetail
                Dialog.confirm({
                    title: '确认靠车',
                    content: '请确认是否靠车',
                    confirmText: '确定',
                    onConfirm: () => {
                        this._updateDriverOrder({
                            openId: this.openId || getCookie('__user__openid'),
                            orderStatus: 3,
                            series: item.series,
                        });
                    },
                })
            },
            onFache() {
                let item = this.orderDetail
                Dialog.confirm({
                    title: '确认发车',
                    content: '请确认是否发车',
                    confirmText: '确定',
                    onConfirm: () => {
                        this._updateDriverOrder({
                            openId: this.openId || getCookie('__user__openid'),
                            orderStatus: 4,
                            series: item.series,
                        });
                    },
                })
            },
            onDaoda() {
                let item = this.orderDetail
                Dialog.confirm({
                    title: '确认到达',
                    content: '请确认是否到达',
                    confirmText: '确定',
                    onConfirm: () => {
                        this._updateDriverOrder({
                            openId: this.openId || getCookie('__user__openid'),
                            orderStatus: 5,
                            series: item.series,
                        });
                    },
                })
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .order-detail {
        padding: 0 20px 200px;
        height: 700px;
        background #fff;

        h1 {
            text-align: center;
        }

        ul.ul-inner {
            li {
                border: 0 !important;
            }
        }

        ul.bill-list {
            padding: 20px;
            border: 4px solid #FFE2B5;

            li {
                padding: 5px 0;
                border-bottom: 1px dashed #ccc;
                display: flex;
                justify-content: space-between

                span {
                    color: #999CA7;
                    flex: 1;
                    text-align: left
                }

                span:first-child {
                    text-align: right
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
