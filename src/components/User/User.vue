<template>
    <div class="user">
        <nav-bar>
            <md-drop-menu
                    ref="selectRoad"
                    :data="pathData"
                    @change="selectRoadChange"
            ></md-drop-menu>
        </nav-bar>

        <div class="content">
            <md-tabs
                    :titles="tabTitles"
                    :default-index="0"
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
                        name="item0"
                        title="请输入发货地"
                        arrow="arrow-right"
                        class="shipping-address"
                        @click="fillShipping">
                </md-field-item>
                <md-field-item
                        name="item1"
                        title="请输入目的地"
                        arrow="arrow-right"
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
                            ref="input1"
                            v-model="bill.remark"
                            placeholder="请输入补充信息"
                    ></md-input-item>
                </md-field-item>
            </md-field>
            <split></split>
            <div class="order-footer">
                <div class="order-footer__amount">
                    <div class="booking-info">
                        <span>价格：{{bill.initPrice}}元({{bill.initDistance}}公里)</span>
                        <span>超里程费：{{bill.overstepPrice}}元/公里</span>
                    </div>
                    <div class="booking-info">
                        <span>预约数量：{{bill.appointmentNum}}</span>
                        <span>预约时间：{{bill.appointmentDate}}</span>
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
  import {DropMenu, Dialog, Tabs, Field, FieldItem, InputItem, Switch, Agree, Button} from 'mand-mobile'
  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'

  import {createOrder} from '@/api/order'
  import {getAllRouterByCity, getCarTypeByAllRouter, getRouterPriceByCarTypeAndRouterDetailSeries} from '@/api/road'
  import {getCustomerOpenIdByCode} from '@/api/openid'
  import {setCookie, getCookie} from '@/common/js/cache'
  import {mapMutations} from 'vuex'

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
          appointmentDate: "4244",
          appointmentNum: 0,
          carTypeSeries: 0,
          deliverGoodsTime: "",
          initDistance: "",
          initPrice: 0,
          openId: "1",
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
          wetherTakeover: ""
        },
        tabs: [],
        tabActiveIndex: 0,
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
      }
    },
    computed: {
      tabTitles () {
        let titles = []
        this.tabs.forEach(item => {
          titles.push(item.typeName)
        })
        return titles
      },
    },
    mounted() {
      window.DropMenuTrigger = () => {
        this.getSelectedValue('dropMenu0', 0)
      }
    },
    created () {
      console.log('组件已加载')
      console.log('获取openid')
      // this._getCustomerOpenIdByCode({"code": "123456","grantType": "authorization_code"})
      console.log('查询所有路线')
      this.setOpenId('1')
      this._getAllRouterByCity({openId: this.openId})
    },
    methods: {
      ...mapMutations({
        setCityIds: 'SET_CITYIDS',
        setOpenId: 'SET_OPENID'
      }),
      booking () {
        console.log('约车')
        console.log('验证数据 入参')
        this._createOrder()
      },
      selectRoadChange (barItem, listItem) {
        console.log(listItem)
        this.setCityIds(listItem)
        this._getCarTypeByAllRouter( {
          openId: '1',
          sourceCityId: listItem.sourceCityId,
          destinyCityId: listItem.destinyCityId
        })
      },
      fillShipping () {
        this.$router.push('/user/address/shipping')
      },
      fillReceiver () {
        this.$router.push('/user/address/receiver')
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
      _getCustomerOpenIdByCode (params) {
        getCustomerOpenIdByCode(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:
                this.setOpenId(res.data.openId)
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
                res.data.wxRouterCityRelationModel.forEach((item, index) => {
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
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .md-tabs{
        min-height: 440px!important
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
</style>
