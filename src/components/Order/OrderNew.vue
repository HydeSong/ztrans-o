<template>
    <div class="order">
        <nav-bar>
            客户下单
        </nav-bar>
        <div class="content">
            <split></split>
            <md-field>
              <md-field-item
                        title="线路别名(编号)"
                        arrow="arrow-right"
                        align="right"
                        :value="routerName"
                        @click.native="isPickerShow1 = true">
                </md-field-item>
                <md-field-item
                        name="name"
                        title="车型"
                        arrow="arrow-right"
                        align="right"
                        :value="carTypeName"
                        @click.native="isPickerShow2 = true">
                </md-field-item>
                <md-field-item
                        name="shipping-address"
                        :title="shippingDistrictDetail?`${shippingDistrictDetail}`:'请输入发货地'"
                        arrow="arrow-right"
                        :class="[shippingDistrictDetail?'':'saddress']"
                        @click="fillShipping">
                </md-field-item>
                <md-field-item
                        name="receiver-address"
                        :title="receiveDistrictDetail?`${receiveDistrictDetail}`:'请输入收货地'"
                        arrow="arrow-right"
                        :class="[receiveDistrictDetail?'':'saddress']"
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
                            v-model="wetherTakeover"
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
                <md-button @click.native="booking">确认下单</md-button>
                <split></split>
                <md-button @click.native="onSearchUserOrder">查询订单</md-button>
            </div>
            <router-view></router-view>
        </div>
        <md-dialog
                icon="circle-right"
                title="下单成功"
                :closable="false"
                v-model="actDialog.open"
                :btns="actDialog.btns">
            恭喜您成功完成下单
        </md-dialog>
        <md-picker
                ref="pickerRouter"
                v-model="isPickerShow1"
                :data="pickerData1"
                @confirm="onPickerRouterConfirm"
                title="选择线路别名">
        </md-picker>
        <md-picker
                ref="pickerCarType"
                v-model="isPickerShow2"
                :data="pickerData2"
                @confirm="onPickerCarTypeConfirm"
                title="选择车型">
        </md-picker>
    </div>
</template>

<script>
  import {DropMenu, Picker, Dialog, Tabs, Field, FieldItem, InputItem, Switch, Agree, Button, Toast} from 'mand-mobile'
  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'

  import {createOrder} from '@/api/order'
  import {getRouterPriceByCarTypeAndRouterDetailSeries} from '@/api/road'
  import {getRouterAliaByCustomerMasterId, getPriceAndCarByCustomerIdAndRouterSeries} from '@/api/simple-order'
  import {getCookie} from '@/common/js/cache'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'user',
    components: {
      [Button.name]: Button,
      [Picker.name]: Picker,
      [Agree.name]: Agree,
      [DropMenu.name]: DropMenu,
      [Tabs.name]: Tabs,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [InputItem.name]: InputItem,
      [Switch.name]: Switch,
      [Dialog.name]: Dialog,
      Split,
      NavBar
    },
    data() {
      return {
        isPickerShow1: false,
        isPickerShow2: false,
        routerName: '',
        carTypeName: '',
        receiveDistrictDetail: '',
        shippingDistrictDetail: '',
        pickerData1: [],
        pickerData2: [],
        bill: {
          appointmentDate: '',
          appointmentNum: 1,
          carTypeSeries: '',
          carSizeSeries: '',
          deliverGoodsTime: '',
          initDistance: '',
          initPrice: 0,
          openId: this.openId || getCookie('__user__openid'),
          overstepPrice: 0,
          receiveAddressDetail: '',
          receiveGoodsLocationNum: 0,
          receiveGoodsPersonMobile: '',
          receiveGoodsPersonName: '',
          remark: '',
          routerDetailSeries: 0,
          routerPriceSeries: 0,
          sendAddressDetail: '',
          sendGoodsLocationNum: 0,
          sendGoodsPersonMobile: '',
          sendGoodsPersonName: '',
          goodsRemark: ''
        },
        wetherTakeover: false,
        agreeConf: {
          checked: false,
          name: 'wetherTakeover',
          size: 'lg',
          disabled: false,
          introduction: '未选中状态',
        },
        isPriceShow: false,
        actDialog: {
          open: false,
          btns: [
            {
              text: '继续下单',
              handler: this.onActCancel,
            },
            {
              text: '查询订单',
              handler: this.onActConfirm,
            },
          ],
        },
      }
    },
    watch: {
      'wetherTakeover' (val) {
        let ret = val ? 'Y' : 'N'
        this.bill.wetherTakeover = ret
      },
      'routerName' () {
        Toast.loading('正在查询')
        this._getPriceAndCarByCustomerIdAndRouterSeries({
          customerMasterId: this.customerInfo.customerMasterId,
          openId: this.openId || getCookie('__user__openid'),
          routerDetailSeries: this.bill.routerDetailSeries
        })
        setTimeout(() => {
          Toast.hide()
        }, 3000)
      },
      "$route" (to, from) {
        if (to.path === '/user/order') {

          this.bill.receiveAddressDetail = this.receiver.addressDetail
          this.bill.receiveGoodsLocationNum = this.receiver.locationNum
          this.bill.receiveGoodsPersonMobile = this.receiver.personMobile
          this.bill.receiveGoodsPersonName = this.receiver.personName

          this.bill.sendAddressDetail = this.shipping.addressDetail
          this.bill.sendGoodsLocationNum = this.shipping.locationNum
          this.bill.sendGoodsPersonMobile = this.shipping.personMobile
          this.bill.sendGoodsPersonName = this.shipping.personName

          this.bill.deliverGoodsTime = this.shipping.goodsTime
          this.bill.appointmentDate = this.shipping.goodsTime
          console.log(this.shipping.goodsTime)
          console.log(this.bill.appointmentDate)
        }
      }
    },
    computed: {
      ...mapGetters(['shipping', 'receiver', 'openId', 'customerInfo']),
      'bill.appointmentDate' () {
        return this.shipping.goodsTime
      }
    },
    created () {
      this._getRouterAliaByCustomerMasterId({
        customerMasterId: this.customerInfo.customerMasterId,
        openId: this.openId || getCookie('__user__openid')
      })
    },
    methods: {
      ...mapMutations({
        setShipping: 'SET_SHIPPING',
        setReceiver: 'SET_RECEIVER',
        setShippingDistrictDetail: 'SET_SHIPPINGDISTRICTDETAIL',
        setReceiveDistrictDetail: 'SET_RECEIVEDISTRICTDETAIL'
      }),
      _getRouterAliaByCustomerMasterId(params) {
        getRouterAliaByCustomerMasterId(params).then(res => {
          if (res.code === 0) {
            const routerAliaModels = res.routerAliaModels
            const ra = routerAliaModels.map((value) => {
              return {'text': value.routerAlia, 'value': value.series, ...value}
            })
            this.pickerData1 = [ra]
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getPriceAndCarByCustomerIdAndRouterSeries(params) {
        getPriceAndCarByCustomerIdAndRouterSeries(params).then(res => {
          if (res.code === 0) {
            Toast.hide()
            const carAndPriceModels = res.carAndPriceModels
            const cp = carAndPriceModels.map((value) => {
              return {'text': value.typeName, 'value': value.series, ...value}
            })
            this.pickerData2 = [cp]
          }
        }).catch(err => {
          console.log(err)
        })
      },
      onActConfirm () {
        this.onSearchUserOrder()
      },
      onActCancel () {
        console.log('继续下单')
        this.actDialog.open = false
        this.bill = {
          appointmentDate: '',
          appointmentNum: 1,
          carTypeSeries: '',
          carSizeSeries: '',
          deliverGoodsTime: '',
          initDistance: '',
          initPrice: 0,
          openId: '',
          overstepPrice: 0,
          receiveAddressDetail: '',
          receiveGoodsLocationNum: 0,
          receiveGoodsPersonMobile: '',
          receiveGoodsPersonName: '',
          remark: '',
          routerDetailSeries: 0,
          routerPriceSeries: 0,
          sendAddressDetail: '',
          sendGoodsLocationNum: 0,
          sendGoodsPersonMobile: '',
          sendGoodsPersonName: '',
          goodsRemark: ''
        }
        this.wetherTakeover = ''
        this.routerName = ''
        this.carTypeName = ''
        this.shippingDistrictDetail = ''
        this.receiveDistrictDetail = ''
      },
      onSearchUserOrder () {
        this.$router.push('/user/user-order')
      },
      booking () {
        this._createOrder()
      },
      fillShipping () {
        this.$router.push('/user/address-info/shipping')
      },
      fillReceiver () {
        this.$router.push('/user/address-info/receiver')
      },
      _createOrder() {
        let params = this.bill
        console.log(params)
        createOrder(params).then(res => {
          // console.log(res)
          if (res.code === 0) {
            console.log('下单成功')
            this.actDialog.open = true
          }
        }).catch(err => {
          console.log(err)
        })
      },
      onPickerRouterConfirm() {
        const values = this.$refs.pickerRouter.getColumnValues()
        let res = ''
        let val = ''
        values.forEach(value => {
          if(value) {
            res += `${value.text || value.label} `
            val = value
          }
        })
        this.routerName = res
        console.log(val)
        this.bill.routerDetailSeries = val.series

        this.bill.receiveAddressDetail = val.receiveAddressDetail
        this.bill.receiveGoodsLocationNum = val.receiveGoodsLocationNum
        this.bill.receiveGoodsPersonMobile = val.receiveGoodsPersonMobile
        this.bill.receiveGoodsPersonName = val.receiveGoodsPersonName

        this.bill.sendAddressDetail = val.sendAddressDetail
        this.bill.sendGoodsLocationNum = val.sendGoodsLocationNum
        this.bill.sendGoodsPersonMobile = val.sendGoodsPersonMobile
        this.bill.sendGoodsPersonName = val.sendGoodsPersonName

        this.shippingDistrictDetail = `${val.sourcePrvName}${val.sourceCityName}${val.sourceCityAreaName}${val.sourceTownName}${val.sendAddressDetail}`
        this.receiveDistrictDetail = `${val.destinationPrvName}${val.destinationCityName}${val.destinationCityAreaName}${val.destinationTownName}${val.receiveAddressDetail}`

        this.setShippingDistrictDetail(`${val.sourcePrvName}${val.sourceCityName}${val.sourceCityAreaName}${val.sourceTownName}`)
        this.setReceiveDistrictDetail(`${val.destinationPrvName}${val.destinationCityName}${val.destinationCityAreaName}${val.destinationTownName}`)
      },
      onPickerCarTypeConfirm() {
        const values = this.$refs.pickerCarType.getColumnValues()
        let res = ''
        values.forEach(value => {
          value && (res = value)
        })
        this.carTypeName = res.typeName

        this.bill.carTypeSeries = res.carTypeName
        this.bill.carSizeSeries = res.carSizeName
        this.bill.initDistance = res.initDistance
        this.bill.initPrice = res.initPrice
        this.bill.overstepPrice = res.overstepPrice
        this.bill.routerPriceSeries = res.routerPriceId
      },
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
