<template>
    <div class="address">
        <nav-bar>
            {{title}}
        </nav-bar>
        <split></split>
        <div class="content" v-show="isShipping">
            <md-field>
                <md-field-item
                        title="省市区/县"
                        align="right"
                        readonly
                        :value="shippingDistrictDetail">
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
                        align="right"
                        readonly
                        :value="receiveDistrictDetail">
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
        raddressDetail: '',
        rpersonMobile: '',
        rpersonName: '',
        rlocationNum: '1',
        personMobile: '',
        personName: '',
        addressDetail: '',
        goodsTime: '',
        locationNum: '1',
        currentDate: new Date(),
        isDatePickerShow: false,
      }
    },
    computed: {
      ...mapState(['shipping', 'receiver', 'shippingDistrictDetail', 'receiveDistrictDetail']),
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
            personMobile: this.personMobile,
            personName: this.personName,
            addressDetail: this.addressDetail,
            goodsTime: this.goodsTime,
            locationNum: this.locationNum
          }
          this.setShipping(addressInfo)
        } else {
          console.log('确认收货信息')
          let addressInfo = {
            personMobile: this.rpersonMobile,
            personName: this.rpersonName,
            addressDetail: this.raddressDetail,
            locationNum: this.rlocationNum
          }
          this.setReceiver(addressInfo)
        }
        this.$router.go(-1)
      },
      onDatePickerConfirm() {
        this.goodsTime = this.$refs.datePicker.getFormatDate('yyyy-MM-dd hh:mm:00')
        console.log(this.goodsTime)
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
