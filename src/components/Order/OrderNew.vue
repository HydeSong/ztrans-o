<template>
    <div class="order">
        <nav-bar :arrowLeft="false">
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
                        title="车型"
                        arrow="arrow-right"
                        align="right"
                        :value="carTypeName"
                        @click.native="isPickerShow2 = true">
                </md-field-item>
                <md-field-item
                        :title="shippingDistrictDetail?`${shippingDistrictDetail}`:'请输入发货地'"
                        arrow="arrow-right"
                        :class="[shippingDistrictDetail?'':'saddress']"
                        @click="fillShipping">
                </md-field-item>
                <md-field-item
                        :title="receiveDistrictDetail?`${receiveDistrictDetail}`:'请输入收货地'"
                        arrow="arrow-right"
                        :class="[receiveDistrictDetail?'':'saddress']"
                        @click="fillReceiver">
                </md-field-item>
                <md-field-item
                        name="name"
                        title="发货时间"
                        arrow="arrow-right"
                        align="right"
                        :value="goodsTime"
                        @click.native="isDatePickerShow = true">
                </md-field-item>
            </md-field>
            <split></split>
            <md-field>
                <md-field-item
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
                        customized
                        align="center">
                    <md-input-item
                            v-model="bill.remark"
                            placeholder="请输入补充信息"
                    ></md-input-item>
                </md-field-item>
                <md-field-item
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
                        <span>用车时间：{{bill.appointmentDate || '--:--:--'}}</span>
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
        <md-date-picker
                ref="datePicker"
                v-model="isDatePickerShow"
                type="datetime"
                today-text="(今天)"
                title="选择发货时间"
                :default-date="currentDate"
                @confirm="onDatePickerConfirm"
        ></md-date-picker>
    </div>
</template>

<script>
import {
  DatePicker,
  DropMenu,
  Picker,
  Dialog,
  Tabs,
  Field,
  FieldItem,
  InputItem,
  Switch,
  Agree,
  Button,
  Toast,
} from 'mand-mobile';
import Split from '../Base/Split';
import NavBar from '../Base/NavBar';

import {createOrder} from '@/api/order';
import {
  getRouterPriceByCarTypeAndRouterDetailSeries,
  getCustomerRouterDetail,
} from '@/api/road';
import {
  getRouterAliaByCustomerMasterId,
  getPriceAndCarByCustomerIdAndRouterSeries,
} from '@/api/simple-order';
import {getCookie} from '@/common/js/cache';
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'user',
  components: {
    [DatePicker.name]: DatePicker,
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
    NavBar,
  },
  data() {
    return {
      goodsTime: new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''),
      isPickerShow1: false,
      isPickerShow2: false,
      currentDate: new Date(),
      isDatePickerShow: false,
      routerName: '',
      carTypeName: '',
      pickerData1: [],
      pickerData2: [],
      shippingDistrictDetail: '',
      receiveDistrictDetail: '',
      bill: {
        appointmentDate: new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''),
        appointmentNum: 1,
        carTypeSeries: '',
        carSizeSeries: '',
        deliverGoodsTime: new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''),
        initDistance: '',
        initPrice: '',
        openId: this.openId || getCookie('__user__openid'),
        overstepPrice: '',
        receiveAddressDetail: '',
        receiveGoodsLocationNum: '',
        receiveGoodsPersonMobile: '',
        receiveGoodsPersonName: '',
        remark: '',
        routerDetailSeries: '',
        routerPriceSeries: '',
        sendAddressDetail: '',
        sendGoodsLocationNum: '',
        sendGoodsPersonMobile: '',
        sendGoodsPersonName: '',
        goodsRemark: '',
      },
      wetherTakeover: false,
      agreeConf: {
        checked: false,
        name: 'wetherTakeover',
        size: 'lg',
        disabled: false,
        introduction: '未选中状态',
      },
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
    };
  },
  watch: {
    wetherTakeover(val) {
      let ret = val ? 'Y' : 'N';
      this.bill.wetherTakeover = ret;
    },
    goodsTime(val) {
      this.bill.appointmentDate = val;
      this.bill.deliverGoodsTime = val;
    },
    routerName() {
      Toast.loading('正在查询');
      this._getPriceAndCarByCustomerIdAndRouterSeries({
        customerMasterId: this.customerInfo.customerMasterId,
        openId: this.openId || getCookie('__user__openid'),
        routerDetailSeries: this.bill.routerDetailSeries,
      });
      setTimeout(() => {
        Toast.hide();
      }, 3000);
    },
    $route(to, from) {
      if (to.path === '/user/order') {
        this.bill.openId = this.openId || getCookie('__user__openid');
        this.bill.customerMasterId = this.customerInfo.customerMasterId;

        this.bill.receiveAddressDetail = this.receiver.addressDetail;
        this.bill.receiveGoodsLocationNum = this.receiver.locationNum;
        this.bill.receiveGoodsPersonMobile = this.receiver.personMobile;
        this.bill.receiveGoodsPersonName = this.receiver.personName;

        this.bill.sendAddressDetail = this.shipping.addressDetail;
        this.bill.sendGoodsLocationNum = this.shipping.locationNum;
        this.bill.sendGoodsPersonMobile = this.shipping.personMobile;
        this.bill.sendGoodsPersonName = this.shipping.personName;
      }
    },
  },
  computed: {
    ...mapGetters(['shipping', 'receiver', 'openId', 'customerInfo']),
    isPriceShow() {
      let ret = false;
      ret = Object.values(this.bill).every(item => {
        return item !== '';
      });
      return ret;
    },
  },
  created() {
    this._getRouterAliaByCustomerMasterId({
      customerMasterId: this.customerInfo.customerMasterId,
      openId: this.openId || getCookie('__user__openid'),
    });
    this.bill.customerMasterId = this.customerInfo.customerMasterId;
  },
  methods: {
    ...mapMutations({
      setShipping: 'SET_SHIPPING',
      setReceiver: 'SET_RECEIVER',
      setShippingDistrictDetail: 'SET_SHIPPINGDISTRICTDETAIL',
      setReceiveDistrictDetail: 'SET_RECEIVEDISTRICTDETAIL',
    }),
    _getCustomerRouterDetail(params) {
      getCustomerRouterDetail(params)
        .then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.bill.receiveAddressDetail = res.receiveAddressDetail;
            this.bill.receiveGoodsLocationNum = res.receiveGoodsLocationNum;
            this.bill.receiveGoodsPersonMobile = res.receiveGoodsPersonMobile;
            this.bill.receiveGoodsPersonName = res.receiveGoodsPersonName;

            this.bill.sendAddressDetail = res.sendAddressDetail;
            this.bill.sendGoodsLocationNum = res.sendGoodsLocationNum;
            this.bill.sendGoodsPersonMobile = res.sendGoodsPersonMobile;
            this.bill.sendGoodsPersonName = res.sendGoodsPersonName;

            this.shippingDistrictDetail = `${res.sourcePrvName}${
              res.sourceCityName
            }${res.sourceCityAreaName}${
              res.sourceTownName ? res.sourceTownName : ''
            }`;
            this.receiveDistrictDetail = `${res.destinationPrvName}${
              res.destinationCityName
            }${res.destinationCityAreaName}${
              res.destinationTownName ? res.destinationTownName : ''
            }`;

            this.setShippingDistrictDetail(this.shippingDistrictDetail);
            this.setReceiveDistrictDetail(this.receiveDistrictDetail);

            this.setShipping({
              personMobile: res.sendGoodsPersonMobile
                ? res.sendGoodsPersonMobile
                : '',
              personName: res.sendGoodsPersonName
                ? res.sendGoodsPersonName
                : '',
              addressDetail: res.sendAddressDetail ? res.sendAddressDetail : '',
              locationNum: res.sendGoodsLocationNum
                ? res.sendGoodsLocationNum
                : '',
            });

            this.setReceiver({
              personMobile: res.receiveGoodsPersonMobile
                ? res.receiveGoodsPersonMobile
                : '',
              personName: res.receiveGoodsPersonName
                ? res.receiveGoodsPersonName
                : '',
              addressDetail: res.receiveAddressDetail
                ? res.receiveAddressDetail
                : '',
              locationNum: res.receiveGoodsLocationNum
                ? res.receiveGoodsLocationNum
                : '',
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _getRouterAliaByCustomerMasterId(params) {
      getRouterAliaByCustomerMasterId(params)
        .then(res => {
          // console.log(res)
          if (res.code === 0) {
            const routerAliaModels = res.routerAliaModels;
            const ra = routerAliaModels.map(value => {
              return {text: value.routerAlia, value: value.series, ...value};
            });
            this.pickerData1 = [ra];
            this.$refs.pickerRouter.refresh();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _getPriceAndCarByCustomerIdAndRouterSeries(params) {
      getPriceAndCarByCustomerIdAndRouterSeries(params)
        .then(res => {
          if (res.code === 0) {
            Toast.hide();
            const carAndPriceModels = res.carAndPriceModels;
            const cp = carAndPriceModels.map(value => {
              return {text: value.typeName, value: value.series, ...value};
            });
            this.pickerData2 = [cp];
            this.$refs.pickerCarType.refresh();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onActConfirm() {
      this.onSearchUserOrder();
    },
    onActCancel() {
      console.log('继续下单');
      this.actDialog.open = false;
      this.bill = {
        customerMasterId: this.customerInfo.customerMasterId,
        appointmentDate: '',
        appointmentNum: 1,
        carTypeSeries: '',
        carSizeSeries: '',
        deliverGoodsTime: '',
        initDistance: '',
        initPrice: '',
        openId: this.openId || getCookie('__user__openid'),
        overstepPrice: '',
        receiveAddressDetail: '',
        receiveGoodsLocationNum: '',
        receiveGoodsPersonMobile: '',
        receiveGoodsPersonName: '',
        remark: '',
        routerDetailSeries: '',
        routerPriceSeries: '',
        sendAddressDetail: '',
        sendGoodsLocationNum: '',
        sendGoodsPersonMobile: '',
        sendGoodsPersonName: '',
        goodsRemark: '',
      };
      this.wetherTakeover = false;
      this.routerName = '';
      this.carTypeName = '';
      this.shippingDistrictDetail = '';
      this.receiveDistrictDetail = '';
      // 解决重新下单不能选择路线和车型问题
      this.$refs.pickerRouter.refresh();
      this.$refs.pickerCarType.refresh();
    },
    onSearchUserOrder() {
      this.actDialog.open = false;
      this.$router.push('/user/user-order');
    },
    booking() {
      this._createOrder();
    },
    fillShipping() {
      this.$router.push('/user/address-info/shipping');
    },
    fillReceiver() {
      this.$router.push('/user/address-info/receiver');
    },
    _createOrder() {
      let params = this.bill;
      // console.log(params);
      // 字段非空校验
      // 线路，车型，发货人 电话，发货人名字，发货人地址，收货人地址，收货人名字，收货人电话，货物描述，用车时间
      if (!params.routerDetailSeries) {
        Toast.failed('线路不可以为空！');
        return;
      }

      if (!params.carTypeSeries) {
        Toast.failed('车型不可以为空！');
        return;
      }

      if (!params.sendGoodsPersonMobile) {
        Toast.failed('发货人电话不可以为空！');
        return;
      }

      if (!params.sendGoodsPersonName) {
        Toast.failed('发货人名字不可以为空！');
        return;
      }

      if (!params.sendAddressDetail) {
        Toast.failed('发货人地址不可以为空！');
        return;
      }

      if (!params.receiveAddressDetail) {
        Toast.failed('收货人地址不可以为空！');
        return;
      }

      if (!params.receiveGoodsPersonName) {
        Toast.failed('收货人名字不可以为空！');
        return;
      }

      if (!params.receiveGoodsPersonMobile) {
        Toast.failed('收货人电话不可以为空！');
        return;
      }

      // if (!params.goodsRemark) {
      //   Toast.failed("货物描述不可以为空！");
      //   return;
      // }

      if (!params.appointmentDate) {
        Toast.failed('用车时间不可以为空！');
        return;
      }

      createOrder(params)
        .then(res => {
          // console.log(res)
          if (res.code === 0) {
            console.log('下单成功');
            this.actDialog.open = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onPickerRouterConfirm() {
      const values = this.$refs.pickerRouter.getColumnValues();
      let res = '';
      let val = '';
      values.forEach(value => {
        if (value) {
          res += `${value.text || value.label} `;
          val = value;
        }
      });
      this.routerName = res;
      // 清空车型
      this.carTypeName = '';
      // console.log(val)
      this._getCustomerRouterDetail({
        routerDetailSeries: val.series,
      });
      this.bill.routerDetailSeries = val.series;
    },
    onPickerCarTypeConfirm() {
      const values = this.$refs.pickerCarType.getColumnValues();
      let res = '';
      values.forEach(value => {
        value && (res = value);
      });
      this.carTypeName = res.typeName;
      this.bill.carTypeSeries = res.carTypeName;
      this.bill.carSizeSeries = res.carSizeName;
      this.bill.initDistance = res.initDistance;
      this.bill.initPrice = res.initPrice;
      this.bill.overstepPrice = res.overstepPrice;
      this.bill.routerPriceSeries = res.routerPriceId;
      // console.log(res)
    },
    onDatePickerConfirm() {
      this.goodsTime = this.$refs.datePicker.getFormatDate(
          'yyyy-MM-dd hh:mm:00'
      );
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.md-tabs {
  min-height: 440px !important;
  background: #fff url('../../assets/images/default.png') center center no-repeat !important;
  background-size: 26% !important;
}

.vehicle-type {
  background-color: #fff;
}

.vehicle-type__thumbnail {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  height: 90px * 2;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 16px * 2 0;
}

.vehicle-type__thumbnail img {
  height: 100%;
}

.vehicle-type__thumbnail span {
  position: absolute;
  top: 16px * 2;
  right: 16px * 2;
  font-size: 24px;
}

.vehicle-type__meta {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 16px * 2 16px * 2;
  list-style: none;
  line-height: 1.5em;
  text-align: center;
}

.vehicle-type__meta li {
  flex: 0 1 120px * 2;
}

.vehicle-type__meta li .value {
  display: block;
  font-size: 1em;
}

.vehicle-type__meta li .label {
  display: block;
  font-size: 0.75em;
  color: #a1a1a1;
}

.order-footer {
  margin: 16px * 2 10px * 2;
}

.order-footer__amount {
  padding: 8px * 2 16px * 2;
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
  padding: 8px * 2 0;
  border-bottom: 1px solid #ececec;
}

.booking-info .num input {
  width: 80px * 2;
  border: none;
}

.booking-info .price span {
  font-size: 1.25em;
  color: #f00;
}

.order-footer__amount p {
  margin: 0;
  padding: 8px * 2 0;
}

.order-footer__amount .extra {
  margin: 0;
  font-size: 0.75em;
  color: #a1a1a1;
}

.order-footer__buttons {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 10px * 2;
}

.order-footer__buttons > div {
  width: 30%;
}

.order-footer__buttons-now {
  width: 70%;
  height: 42px * 2;
  line-height: 42px * 2;
  text-align: center;
  color: #fff;
  background-color: #108ee9;
  border-radius: 5px * 2 0 0 5px * 2;
}

.order-footer__buttons-booking {
  display: block;
  width: 100%;
  height: 42px * 2;
  line-height: 42px * 2;
  text-align: center;
  color: #fff;
  background-color: rgba(16, 142, 233, 0.5);
  border-radius: 0 5px * 2 5px * 2 0;
}

.saddress {
  color: #fc9153;
}
</style>
