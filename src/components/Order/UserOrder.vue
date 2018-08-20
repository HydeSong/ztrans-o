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
                        title="线路别名(编号)"
                        arrow="arrow-right"
                        align="right"
                        :value="routerDetailAliaSearchKey"
                        @click.native="isPickerShow1 = true">
                </md-field-item>
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
                <md-button @click.native="onSearch">查询</md-button>
            </div>
        </div>
        <md-picker
                ref="pickerRouter"
                v-model="isPickerShow1"
                :data="pickerData1"
                @confirm="onPickerRouterConfirm"
                title="选择线路别名"
        ></md-picker>
        <md-date-picker
                ref="datePicker1"
                v-model="isDatePickerShow1"
                type="datetime"
                today-text="&(今天)"
                title="选择开始时间"
                :default-date="currentDate"
                @confirm="onDatePickerConfirm1"
        ></md-date-picker>
        <md-date-picker
                ref="datePicker2"
                v-model="isDatePickerShow2"
                type="datetime"
                today-text="&(今天)"
                title="选择结束时间"
                :default-date="currentDate"
                @confirm="onDatePickerConfirm2"
        ></md-date-picker>
    </div>
</template>

<script>
  import { Button, Picker, Field, FieldItem, DatePicker, Toast, TabBar } from 'mand-mobile'
  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'

  import {getRouterAliaByCustomerMasterId} from '@/api/simple-order'
  import {getCustomerOrder} from '@/api/order'
  import {getCookie} from '@/common/js/cache'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'user-order',
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
        title: '客户订单管理',
        isPickerShow1: false,
        isDatePickerShow1: false,
        isDatePickerShow2: false,
        pickerData1: [],
        currentDate: new Date(),
        titles: ['未完成订单', '已完成订单'],
        orderStatus: 1,
        routerDetailAliaSearchKey: '',
        startTime: '',
        endTime: '',
      }
    },
    created() {
      this._getRouterAliaByCustomerMasterId({
        customerMasterId: this.customerInfo.customerMasterId,
        openId: this.openId || getCookie('__user__openid')
      })
    },
    computed: {
      ...mapGetters(['openId', 'customerInfo']),
    },
    methods: {
      ...mapMutations({
        setCustomerOrders: 'SET_CUSTOMERORDERS'
      }),
      _getCustomerOrder (params) {
        Toast.loading('正在查询')
        console.log(params)
        getCustomerOrder(params).then(res => {
          if (res.code === 0) {
            Toast.hide()
            const customerOrders = res.customerOrders
            this.setCustomerOrders(customerOrders)
            this.$router.push(`/user/user-order-list?orderStatus=${this.orderStatus}&startTime=${this.startTime}&endTime=${this.endTime}&routerDetailAliaSearchKey=${this.routerDetailAliaSearchKey}`)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getRouterAliaByCustomerMasterId(params) {
        getRouterAliaByCustomerMasterId(params).then(res => {
          if (res.code === 0) {
            const routerAliaModels = res.routerAliaModels
            const ra = routerAliaModels.map((value) => {
              return {'text': value.routerAlia, 'value': value.series, ...value}
            })
            // console.log('ra', ra)
            this.pickerData1 = [ra]
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
      onPickerRouterConfirm() {
        const values = this.$refs.pickerRouter.getColumnValues()
        let res = ''
        values.forEach(value => {
          res += `${value.text || value.label}`
        })
        this.routerDetailAliaSearchKey = res
      },
      onIndexTabChange (index) {
        this.orderStatus = index
      },
      onSearch () {
        console.log('searching')
        const params = {
          openId: this.openId || getCookie('__user__openid'),
          orderStatus: this.orderStatus,
          routerDetailAliaSearchKey: this.routerDetailAliaSearchKey,
          startTime: this.startTime,
          endTime: this.endTime,
          current: 1,
          pageSize: 10
        }
        this._getCustomerOrder(params)
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
