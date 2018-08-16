<template>
    <div class="address">
        <nav-bar>
            {{title}}
        </nav-bar>
        <div class="content" v-show="isShipping">
            <md-field>
                <md-field-item
                        title="省市区/县"
                        arrow="arrow-right"
                        align="right"
                        :value="pickerValue1"
                        @click.native="isPickerShow1 = true">
                </md-field-item>
                <md-input-item
                        v-model="addressDetail"
                        title="详细地址"
                        placeholder="请输入详细地址(必填)"
                ></md-input-item>
                <md-input-item
                        type="phone"
                        v-model="personMobile"
                        title="联系电话"
                        placeholder="请填写联系电话(必填)"
                ></md-input-item>
                <md-input-item
                        v-model="personName"
                        title="发货人姓名"
                        placeholder="请填写发货人姓名(可选填)"
                ></md-input-item>
                <md-field-item
                        name="name"
                        title="发货时间"
                        arrow="arrow-right"
                        align="right"
                        :value="goodsTime"
                        @click.native="isDatePickerShow = true">
                </md-field-item>
                <md-input-item
                        title="发货点个数"
                        type="digit"
                        v-model="locationNum"
                        placeholder="请输入发货点个数"
                ></md-input-item>
            </md-field>
        </div>
        <div class="content" v-show="!isShipping">
            <md-field>
                <md-field-item
                        title="省市区/县"
                        arrow="arrow-right"
                        align="right"
                        :value="pickerValue1"
                        @click.native="isPickerShow1 = true">
                </md-field-item>
                <md-input-item
                        v-model="raddressDetail"
                        title="详细地址"
                        placeholder="请输入详细地址(必填)"
                ></md-input-item>
                <md-input-item
                        type="phone"
                        v-model="rpersonMobile"
                        title="联系电话"
                        placeholder="请填写联系电话(必填)"
                ></md-input-item>
                <md-input-item
                        v-model="rpersonName"
                        title="收货人姓名"
                        placeholder="请填写收货人姓名(可选填)"
                ></md-input-item>
                <md-input-item
                        title="收货点个数"
                        type="digit"
                        v-model="rlocationNum"
                        placeholder="请输入收货点个数"
                ></md-input-item>
            </md-field>
        </div>
        <split></split>
        <div class="footer">
            <md-button @click.native="confirm">确 认</md-button>
        </div>
        <md-picker
                ref="picker1"
                v-model="isPickerShow1"
                :data="district"
                :cols="3"
                is-cascade
                title="选择省市区/县"
                @confirm="onPickerConfirm(1)"
        ></md-picker>
        <md-date-picker
                ref="datePicker"
                v-model="isDatePickerShow"
                type="datetime"
                today-text="&(今天)"
                title="选择发货时间"
                :default-date="currentDate"
                @confirm="onDatePickerConfirm"
        ></md-date-picker>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Picker, Field, FieldItem, DatePicker, InputItem, Button} from 'mand-mobile'
  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'
  import {mapState, mapMutations} from 'vuex'
  import {getRouterByCityAreaTown} from '@/api/road'

  export default {
    name: 'address-info',
    components: {
      [Button.name]: Button,
      [InputItem.name]: InputItem,
      [DatePicker.name]: DatePicker,
      [Picker.name]: Picker,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      Split,
      NavBar
    },
    data () {
      return {
        rrouterDetailSeries: '',
        rrouterType: '',
        raddressDetail: '',
        rpersonMobile: '',
        rpersonName: '',
        rlocationNum: '1',
        routerDetailSeries: '',
        routerType: '',
        personMobile: '',
        personName: '',
        addressDetail: '',
        goodsTime: '',
        locationNum: '1',
        sourceCityId: 0,
        sourceCityName:'',
        sourceCityAreaId:0,
        sourceCityAreaName:'',
        sourceTownId:0,
        sourceTownName:'',
        destinyCityId:0,
        destinyCityName:'',
        destinyCityAreaId:0,
        destinyCityAreaName:'',
        destinyTownId:0,
        destinyTownName:'',
        isPickerShow1: false,
        district: [[]],
        pickerValue1: '',
        currentDate: new Date(),
        isDatePickerShow: false,
      }
    },
    created() {
      this._getRouterByCityAreaTown({
        openId: this.openId,
        sourceCityId: this.cityIds.sourceCityId
      })
    },
    computed: {
      ...mapState(['cityIds', 'openId']),
      title () {
        const id = this.$route.params.id
        if (id === 'shipping') {
          return '发货地信息'
        } else if (id === 'receiver') {
          return '收货地信息'
        }
      },
      isShipping () {
        return this.$route.params.id === 'shipping'
      }
    },
    methods: {
      ...mapMutations({
        setShipping: 'SET_SHIPPING',
        setReceiver: 'SET_RECEIVER'
      }),
      confirm () {
        if (this.isShipping) {
          console.log('确认发货信息')
          let addressInfo = {
            routerDetailSeries: this.routerDetailSeries,
            personMobile: this.personMobile,
            personName: this.personName,
            addressDetail: this.addressDetail,
            goodsTime: this.goodsTime,
            locationNum: this.locationNum,
            districtDetail: this.pickerValue1,
            sourceCityId:310100,
            sourceCityName:'上海市',
            sourceCityAreaId:310101,
            sourceCityAreaName:'黄浦区',
            sourceTownId:31010101,
            sourceTownName:'南京东路街道',
          }
          this.setShipping(addressInfo)
        } else {
          console.log('确认收货信息')
          let addressInfo = {
            routerDetailSeries: this.rrouterDetailSeries,
            personMobile: this.rpersonMobile,
            personName: this.rpersonName,
            addressDetail: this.raddressDetail,
            locationNum: this.rlocationNum,
            districtDetail: this.pickerValue1,
            destinyCityId:320500,
            destinyCityName:'苏州市',
            destinyCityAreaId:320502,
            destinyCityAreaName:'沧浪区',
            destinyTownId:32050201,
            destinyTownName:'双塔街道',
          }
          this.setReceiver(addressInfo)
        }
        this.$router.go(-1)
      },
      _getRouterByCityAreaTown (params) {
        getRouterByCityAreaTown(params).then(res => {
          // console.log(res)
          if (res.code === 0) {
            let district = []
            if (this.isShipping) {
              const sourceRouterCityAreaTownModel = res.data.sourceRouterCityAreaTownModel
              district.push(sourceRouterCityAreaTownModel)
              // 省市区/县默认值
              const defaultValue = `${district[0][0].label}${district[0][0].children[0].label}${district[0][0].children[0].children[0].label}`
              this.pickerValue1 = defaultValue
              this.routerDetailSeries = district[0][0].children[0].children[0].routerDetailSeries
            } else {
              const destionRouterCityAreaTownModel = res.data.destionRouterCityAreaTownModel
              district.push(destionRouterCityAreaTownModel)
              // 省市区/县默认值
              const defaultValue = `${district[0][0].label}${district[0][0].children[0].label}${district[0][0].children[0].children[0].label}`
              this.pickerValue1 = defaultValue
              this.rrouterDetailSeries = district[0][0].children[0].children[0].routerDetailSeries
            }
            this.district = district
          }
        }).catch(err => {
          console.log(err)
        })
      },
      onPickerConfirm(index) {
        const values = this.$refs[`picker${index}`].getColumnValues()
        const activeValue = this.$refs[`picker${index}`].getColumnValue(index)
        let res = ''
        values.forEach(value => {
          value && (res += `${value.text || value.label}`)
        })
        this[`pickerValue${index}`] = res
        if (this.isShipping) {
          this.routerDetailSeries = activeValue.children[0].routerDetailSeries
          this.routerType = activeValue.children[0].routerType
        } else {
          this.rrouterDetailSeries = activeValue.children[0].routerDetailSeries
          this.rrouterType = activeValue.children[0].routerType
        }
      },
      onDatePickerConfirm() {
        this.goodsTime = this.$refs.datePicker.getFormatDate('yyyy-MM-dd hh:mm:00')
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .address
        width 100%
        height 100%
        background: #f5f5f9;
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        z-index 10000
        .footer
            margin 20px
</style>
