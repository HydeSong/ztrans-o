<template>
    <div class="address">
        <nav-bar>
            {{title}}
        </nav-bar>
        <div class="content">
            <md-field>
                <md-field-item
                        title="省市区/县"
                        arrow="arrow-right"
                        align="right"
                        :value="pickerValue1"
                        @click.native="isPickerShow1 = true">
                </md-field-item>
                <md-input-item
                        ref="input0"
                        title="详细地址"
                        placeholder="请输入详细地址(必填)"
                        :maxlength="5"
                ></md-input-item>
                <md-input-item
                        ref="input0"
                        title="联系电话"
                        placeholder="请填写联系电话(必填)"
                        :maxlength="5"
                ></md-input-item>
                <md-input-item
                        ref="input0"
                        title="发货人姓名"
                        placeholder="请填写发货人姓名(可选填)"
                        :maxlength="5"
                ></md-input-item>
                <md-field-item
                        name="name"
                        title="发货时间"
                        arrow="arrow-right"
                        align="right"
                        v-show="$route.params.id === 'shipping'"
                        :value="datePickerValue"
                        @click.native="isDatePickerShow = true">
                </md-field-item>
                <md-field-item
                        title="收货点个数"
                        arrow="arrow-right"
                        align="right"
                        :value="pickerValue0"
                        @click.native="isPickerShow0 = true">
                </md-field-item>
            </md-field>
            <md-picker
                    ref="picker1"
                    v-model="isPickerShow1"
                    :data="pickerData1"
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
                    :minDate="currentDate"
                    is-twelve-hours
                    @change="onDatePickerChange"
                    @confirm="onDatePickerConfirm"
            ></md-date-picker>
            <md-picker
                    ref="picker0"
                    v-model="isPickerShow0"
                    :data="pickerData0"
                    @confirm="onPickerConfirm(0)"
                    title="选择收货点个数"
            ></md-picker>
        </div>
        <split></split>
        <div class="footer">
            <md-button>确 认</md-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Picker, Field, FieldItem, DatePicker, InputItem, Button} from 'mand-mobile'
  import simple from 'mand-mobile/components/picker/demo/data/simple'
  import district from 'mand-mobile/components/picker/demo/data/district'

  import Split from '../Base/Split'
  import NavBar from '../Base/NavBar'

  export default {
    name: 'address-info',
    data () {
      return {
        isPickerShow0: false,
        isPickerShow1: false,
        pickerData0: simple,
        pickerData1: district,
        pickerValue0: '',
        pickerValue1: '',
        currentDate: new Date(),
        isDatePickerShow: false,
        datePickerValue: '',
      }
    },
    computed: {
      title () {
        const id = this.$route.params.id
        if (id === 'shipping') {
          return '发货地信息'
        } else if (id === 'receiver') {
          return '收货地信息'
        }
      }
    },
    methods: {
      onPickerConfirm(index) {
        const values = this.$refs[`picker${index}`].getColumnValues()

        let res = ''
        values.forEach(value => {
          value && (res += `${value.text || value.label} `)
        })
        this[`pickerValue${index}`] = res
      },
      textRender() {
        const args = Array.prototype.slice.call(arguments)
        const typeFormat = args[0] // 类型
        const column0Value = args[1] // 第1列选中值
        const column1Value = args[2] // 第2列选中值
        const column2Value = args[3] // 第3列选中值

        if (typeFormat === 'dd') {
          return `${column0Value}/${column1Value}/${column2Value}`
        }
      },
      onDatePickerChange(columnIndex, itemIndex, value) {
        console.log(
          `[Mand Mobile] DatePicker Change\ncolumnIndex: ${columnIndex},\nitemIndex:${itemIndex},\nvalue: ${JSON.stringify(
            value,
          )}`,
        )
      },
      onDatePickerConfirm(columnsValue) {
        console.log(`[Mand Mobile] DatePicker Confirm\nvalue: ${JSON.stringify(columnsValue)}`)
        this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy/MM/dd hh:mm')
      },
    },
    components: {
      [Button.name]: Button,
      [InputItem.name]: InputItem,
      [DatePicker.name]: DatePicker,
      [Picker.name]: Picker,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      Split,
      NavBar
    }
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
