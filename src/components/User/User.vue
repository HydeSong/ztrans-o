<template>
    <div class="user">
        <nav-bar>
            <md-drop-menu
                    ref="selectRoad"
                    :data="pathData"
                    :default-value="defaultPath"
                    @change="selectRoadChange"
            ></md-drop-menu>
        </nav-bar>

        <div class="content">
            <md-tabs
                    :titles="tabTitles"
                    :default-index="0"
                    @change="tabIndexChange"
            >
                <div v-for="(tab, index) of tabs" :key="index">
                    <div class="vehicle-type">
                        <div class="vehicle-type__thumbnail"><img v-lazy="tab.imgUrl" alt=""/><span>在线：{{tab.carCount}}辆</span></div>
                        <ul class="vehicle-type__meta">
                            <li><span class="value">{{tab.sizeName}}</span><span class="label">长*宽*高</span></li>
                            <li><span class="value">{{tab.weightName}}</span><span class="label">载重</span></li>
                        </ul>
                    </div>
                </div>
            </md-tabs>
            <split></split>
            <md-field>
                <md-field-item
                        name="shipping-address"
                        :title="(shipping.addressDetail||shipping.districtDetail)?`${shipping.districtDetail}${shipping.addressDetail}`:'请输入发货地'"
                        arrow="arrow-right"
                        :class="[(shipping.addressDetail||shipping.districtDetail)?'':'saddress']"
                        @click="fillShipping">
                </md-field-item>
                <md-field-item
                        name="receiver-address"
                        :title="(receiver.addressDetail||receiver.districtDetail)?`${receiver.districtDetail}${receiver.addressDetail}`:'请输入收货地'"
                        arrow="arrow-right"
                        :class="[(receiver.addressDetail||receiver.districtDetail)?'':'saddress']"
                        @click="fillReceiver">
                </md-field-item>
            </md-field>
            <split></split>
            <md-field>
                <md-field-item
                        name="item3"
                        customized
                        align="left">
                    <md-agree
                            v-model="bill.wetherTakeover"
                            size="lg"
                    >
                        需要搬卸
                    </md-agree>
                </md-field-item>
                <md-field-item
                        name="item3"
                        customized
                        align="center">
                    <md-input-item
                            v-model="bill.remark"
                            placeholder="请输入补充信息"
                    ></md-input-item>
                </md-field-item>
                <md-field-item
                        name="item3"
                        customized
                        align="center">
                    <md-input-item
                            v-model="bill.goodsRemark"
                            placeholder="请输入货物描述"
                    ></md-input-item>
                </md-field-item>
            </md-field>
            <split></split>
            <div class="order-footer">
                <div class="order-footer__amount">
                    <div class="booking-info">
                        <span>价格：{{bill.initPrice || '--'}}元({{bill.initDistance || '--'}}公里)</span>
                        <span>超里程费：{{bill.overstepPrice || '--'}}元/公里</span>
                    </div>
                    <div class="booking-info">
                        <span>预约数量：{{bill.appointmentNum || '--'}}</span>
                        <span>预约时间：{{bill.appointmentDate || '--:--:--'}}</span>
                    </div>
                </div>
                <split></split>
                <md-button @click.native="booking">约 车</md-button>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import {DropMenu, Dialog, Tabs, Field, FieldItem, InputItem, Switch, Agree, Button, Toast} from 'mand-mobile'
  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'

  import {createOrder} from '@/api/order'
  import {getAllRouterByCity, getCarTypeByAllRouter, getRouterPriceByCarTypeAndRouterDetailSeries, getCityByOpenId} from '@/api/road'
  import {getCustomerOpenIdByCode} from '@/api/openid'
  import {getCookie} from '@/common/js/cache'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'user',
    components: {
      [Button.name]: Button,
      [Agree.name]: Agree,
      [DropMenu.name]: DropMenu,
      [Tabs.name]: Tabs,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [InputItem.name]: InputItem,
      [Switch.name]: Switch,
      Split,
      NavBar
    },
    data() {
      return {
        bill: {
          appointmentDate: "",
          appointmentNum: 1,
          carTypeSeries: '',
          deliverGoodsTime: "",
          initDistance: "",
          initPrice: 0,
          openId: "",
          overstepPrice: 0,
          receiveAddressDetail: "",
          receiveGoodsLocationNum: 0,
          receiveGoodsPersonMobile: "",
          receiveGoodsPersonName: "",
          remark: "",
          routerDetailSeries: 0,
          routerPriceSeries: 0,
          sendAddressDetail: "",
          sendGoodsLocationNum: 0,
          sendGoodsPersonMobile: "",
          sendGoodsPersonName: "",
          wetherTakeover: false,
          goodsRemark: ''
        },
        tabs: [],
        agreeConf: {
          checked: false,
          name: 'wetherTakeover',
          size: 'lg',
          disabled: false,
          introduction: '未选中状态',
        },
        switchActive: false,
        isContentShow: false,
        pathData: [
          {
            text: '请选择路线',
            options: [],
          },
        ],
        defaultPath: []
      }
    },
    computed: {
      ...mapGetters(['shipping', 'receiver', 'wxcode', 'openId']),
      tabTitles () {
        let titles = []
        this.tabs.forEach(item => {
          titles.push(item.typeName)
        })
        return titles
      }
    },
    mounted() {
      window.DropMenuTrigger = () => {
        this.getSelectedValue('selectRoad', 0)
      }
    },
    created () {
      this._getCityByOpenId({openId: this.openId || getCookie('__user__openid')})
      this._getAllRouterByCity({openId: this.openId || getCookie('__user__openid')})
    },
    beforeRouteUpdate (to, from, next) {
      if (to.path === '/user') {
        this._getRouterPriceByCarTypeAndRouterDetailSeries({carTypeSeries: this.bill.carTypeSeries, openId: this.openId || getCookie('__user__openid'), routerDetailSeries: this.shipping.routerDetailSeries})
        this.bill.deliverGoodsTime = this.shipping.goodsTime
        this.bill.openId = this.openId || getCookie('__user__openid')
        this.bill.receiveAddressDetail = this.receiver.addressDetail
        this.bill.receiveGoodsLocationNum = this.receiver.locationNum
        this.bill.receiveGoodsPersonMobile = this.receiver.personMobile
        this.bill.receiveGoodsPersonName = this.receiver.personName
        this.bill.routerDetailSeries = this.shipping.routerDetailSeries
        this.bill.sendAddressDetail = this.shipping.addressDetail
        this.bill.sendGoodsLocationNum = this.shipping.locationNum
        this.bill.sendGoodsPersonMobile = this.shipping.personMobile
        this.bill.sendGoodsPersonName = this.shipping.personName
        this.bill.appointmentDate = this.shipping.goodsTime
      }
      next()
    },
    methods: {
      ...mapMutations({
        setCityIds: 'SET_CITYIDS',
        setOpenId: 'SET_OPENID'
      }),
      booking () {
        // console.log('约车')
        // console.log('验证数据 入参')
        this._createOrder()
      },
      tabIndexChange (index, preIndex) {
        // console.log(index, preIndex)
        this.bill.carTypeSeries = this.tabs[index].series
        // console.log(this.bill.carTypeSeries)
        // 切换车型时查询价格
        if (this.bill.carTypeSeries && this.shipping.routerDetailSeries) {
          this._getRouterPriceByCarTypeAndRouterDetailSeries({carTypeSeries: this.bill.carTypeSeries, openId: this.openId || getCookie('__user__openid'), routerDetailSeries: this.shipping.routerDetailSeries})
        }
      },
      selectRoadChange (barItem, listItem) {
        console.log(listItem)
        this.setCityIds(listItem)
        this._getCarTypeByAllRouter({
          openId: this.openId,
          sourceCityId: listItem.sourceCityId,
          destinyCityId: listItem.destinyCityId
        })
        // 切换路线时查询价格
        if (this.bill.carTypeSeries && this.shipping.routerDetailSeries) {
          this._getRouterPriceByCarTypeAndRouterDetailSeries({carTypeSeries: this.bill.carTypeSeries, openId: this.openId || getCookie('__user__openid'), routerDetailSeries: this.shipping.routerDetailSeries})
        }
      },
      fillShipping () {
        this.$router.push('/user/address-info/shipping')
      },
      fillReceiver () {
        this.$router.push('/user/address-info/receiver')
      },
      getSelectedValue(selector, index) {
        const value = this.$refs[selector].getSelectedValue(index)
        Dialog.alert({
          content: `<pre>${JSON.stringify(value)}</pre>`,
        })
      },
      _createOrder() {
        let params = this.bill
        console.log(params)
        createOrder(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:
                console.log('下单成功')
                Toast.succeed('下单成功')
                break
              case 401:
                console.log(code)
                Toast.failed('下单失败')
                break
              case 403:
                console.log(code)
                Toast.failed('下单失败')
                break
              case 404:
                console.log(code)
                Toast.failed('下单失败')
                break
              case -1:
                console.log(code)
                Toast.failed('下单失败')
                break
              default:
                console.log(code)
                break
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getRouterPriceByCarTypeAndRouterDetailSeries(params) {
        getRouterPriceByCarTypeAndRouterDetailSeries(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:
                this.bill.initDistance = res.data.initDistance
                this.bill.initPrice = res.data.initPrice
                this.bill.overstepPrice = res.data.overstepPrice
                this.bill.routerPriceId = res.data.routerPriceId
                this.bill.routerPriceSeries = res.data.routerPriceId
                break
              case 401:
                console.log(code)
                Toast.failed(res.data.message)
                break
              case 403:
                console.log(code)
                Toast.failed(res.data.message)
                break
              case 404:
                console.log(code)
                Toast.failed(res.data.message)
                break
              case -1:
                console.log(code)
                Toast.failed(res.data.message)
                break
              default:
                console.log(code)
                Toast.failed(res.data.message)
                break
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getCarTypeByAllRouter (params) {
        getCarTypeByAllRouter(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:
                let baseCarTypes = []
                res.data.baseCarTypes.forEach((item) => {
                  item.title = item.typeName
                  baseCarTypes.push(item)
                })
                this.tabs = baseCarTypes
                console.log(this.tabs)
                break
              case 401:
                console.log(code)
                break
              case 403:
                console.log(code)
                break
              case 404:
                console.log(code)
                break
              case -1:
                console.log(code)
                break
              default:
                console.log(code)
                break
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getAllRouterByCity (params) {
        getAllRouterByCity(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:
                let pathDataOptions = []
                res.data.wxRouterCityRelationModel.forEach((item) => {
                  pathDataOptions.push({
                    text: `${item.sourceCityName} -> ${item.destinyCityName}`,
                    ...item
                  })
                })
                this.pathData[0].options = pathDataOptions
                console.log(this.pathData)
                break
              case 401:
                console.log(code)
                break
              case 403:
                console.log(code)
                break
              case 404:
                console.log(code)
                break
              case -1:
                console.log(code)
                break
              default:
                console.log(code)
                break
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getCityByOpenId (params) {
        getCityByOpenId(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:
                let defaultPath = []
                let item = res.data.wxRouterCityRelationModel
                // 默认路线
                defaultPath.push(`${item.sourceCityName} -> ${item.destinyCityName}`)
                this.defaultPath = defaultPath
                this.pathData[0].text = `${item.sourceCityName} -> ${item.destinyCityName}`
                this.setCityIds(item)
                // 默认车型
                this._getCarTypeByAllRouter({
                  openId: this.openId,
                  sourceCityId: item.sourceCityId,
                  destinyCityId: item.destinyCityId
                })
                console.log(this.defaultPath)
                break
              case 401:
                console.log(code)
                break
              case 403:
                console.log(code)
                break
              case 404:
                console.log(code)
                break
              case -1:
                console.log(code)
                break
              case -5046:
                console.log(code)
                console.log('没有默认路线')
                break
              default:
                console.log(code)
                break
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .md-tabs{
        min-height: 440px!important
        background: #fff url("../../assets/images/default.png") center center no-repeat!important
        background-size 26%!important
    }
    .vehicle-type{
        background-color: #fff;
    }
    .vehicle-type__thumbnail {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        height: 90px*2;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding: 16px*2 0;
    }
    .vehicle-type__thumbnail img {
        height: 100%
    }
    .vehicle-type__thumbnail span{
        position: absolute;
        top: 16px*2;
        right: 16px*2;
        font-size: 24px;
    }
    .vehicle-type__meta {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0 16px*2 16px*2;
        list-style: none;
        line-height: 1.5em;
        text-align: center;
    }

    .vehicle-type__meta li {
        flex: 0 1 120px*2
    }

    .vehicle-type__meta li .value {
        display: block;
        font-size: 1em;
    }
    .vehicle-type__meta li .label {
        display: block;
        font-size: .75em;
        color: #a1a1a1;
    }
    .order-footer {
        margin: 16px*2 10px*2;
    }
    .order-footer__amount {
        padding: 8px*2 16px*2;
        /* text-align: center; */
        background-color: #fff;
    }
    .order-footer__amount .booking-info:last-child {
        border-bottom: 0;
    }

    .booking-info {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 8px*2 0;
        border-bottom: 1px solid #ececec;
    }
    .booking-info .num input{
        width: 80px*2;
        border: none
    }
    .booking-info .price span {
        font-size: 1.25em;
        color: #f00;
    }
    .order-footer__amount p {
        margin: 0;
        padding: 8px*2 0;
    }

    .order-footer__amount .extra {
        margin: 0;
        font-size: .75em;
        color: #a1a1a1;
    }
    .order-footer__buttons {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: justify;
        justify-content: space-between;
        margin-top: 10px*2;
    }
    .order-footer__buttons > div {
        width: 30%;
    }
    .order-footer__buttons-now {
        width: 70%;
        height: 42px*2;
        line-height: 42px*2;
        text-align: center;
        color: #fff;
        background-color: #108ee9;
        border-radius: 5px*2 0 0 5px*2;
    }
    .order-footer__buttons-booking {
        display: block;
        width: 100%;
        height: 42px*2;
        line-height: 42px*2;
        text-align: center;
        color: #fff;
        background-color: rgba(16, 142, 233, .5);
        border-radius: 0 5px*2 5px*2 0;
    }

    .saddress {
        color: #fc9153
    }
</style>
