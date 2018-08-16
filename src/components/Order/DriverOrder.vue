<template>
    <div class="simple-order">
        <nav-bar>
            {{title}}
        </nav-bar>
        <div class="content">
            <split></split>
            <md-tab-bar
                    :titles="titles"
                    :default-index="1"
                    @indexChanged="onIndexTabChange">
            </md-tab-bar>
            <split></split>
            <md-field>
                <md-field-item
                        name="name"
                        title="开始时间"
                        arrow="arrow-right"
                        align="right"
                        :value="startTime"
                        @click.native="isDatePickerShow1 = true">
                </md-field-item>
                <md-field-item
                        name="name"
                        title="结束时间"
                        arrow="arrow-right"
                        align="right"
                        :value="endTime"
                        @click.native="isDatePickerShow2 = true">
                </md-field-item>
            </md-field>
            <div class="order-footer">
                <md-button @click.native="onSearch" :disabled="isBillOk">查询</md-button>
            </div>
        </div>
        <md-date-picker
                ref="datePicker1"
                v-model="isDatePickerShow1"
                type="datetime"
                today-text="&(今天)"
                title="选择预约时间"
                :default-date="currentDate"
                @confirm="onDatePickerConfirm1"
        ></md-date-picker>
        <md-date-picker
                ref="datePicker2"
                v-model="isDatePickerShow2"
                type="datetime"
                today-text="&(今天)"
                title="选择预约时间"
                :default-date="currentDate"
                @confirm="onDatePickerConfirm2"
        ></md-date-picker>
    </div>
</template>

<script>
  import { Button, Picker, Field, FieldItem, DatePicker, Toast, TabBar } from 'mand-mobile'
  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'

  import {getDriverOrder} from '@/api/order'
  import {getCookie} from '@/common/js/cache'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'driver-order',
    components: {
      [Button.name]: Button,
      [DatePicker.name]: DatePicker,
      [Picker.name]: Picker,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [TabBar.name]: TabBar,
      Split,
      NavBar
    },
    data() {
      return {
        title: '司机订单管理',
        isDatePickerShow1: false,
        isDatePickerShow2: false,
        pickerData1: [],
        currentDate: new Date(),
        titles: ['未完成订单', '已完成订单'],
        orderStatus: '',
        startTime: '',
        endTime: '',
      }
    },
    computed: {
      ...mapGetters(['openId', 'customerInfo']),
      isBillOk() {
        return !(this.startTime && this.endTime)
      }
    },
    methods: {
      ...mapMutations({
        setDriverOrders: 'SET_DRIVERORDERS'
      }),
      _getDriverOrder (params) {
        Toast.loading('正在查询')
        getDriverOrder(params).then(res => {
          if (res.code === 0) {
            Toast.hide()
            const driverOrders = res.data.driverOrder
            this.setDriverOrders(driverOrders)
            this.$router.push('/driver-order-list')
          }
        }).catch(err => {
          console.log(err)
        })
      },
      onDatePickerConfirm1() {
        this.startTime = this.$refs.datePicker1.getFormatDate('yyyy-MM-dd hh:mm:00')
      },
      onDatePickerConfirm2() {
        this.endTime = this.$refs.datePicker2.getFormatDate('yyyy-MM-dd hh:mm:00')
      },
      onIndexTabChange (index) {
        this.orderStatus = index
      },
      onSearch () {
        console.log('searching')
        const params = {
          openId: this.openId || getCookie('__user__openid'),
          orderStatus: this.orderStatus,
          routerDetailAliaSearchKey: '',
          startTime: this.startTime,
          endTime: this.endTime,
        }
        this._getDriverOrder(params)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .content {
        height 100%
    }
    .order-footer {
        margin: 16px*2 10px*2;
    }
</style>
