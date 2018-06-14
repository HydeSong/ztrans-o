<template>
    <div class="register-step1">
        <split></split>
        <md-field title="个人信息">
            <md-input-item
                    v-model="name"
                    title="姓名"
                    placeholder="请输入您的真实姓名"
            ></md-input-item>
            <md-input-item
                    v-model="ID"
                    title="身份证"
                    placeholder="请输入您的身份证号码"
            ></md-input-item>
            <md-field-item
                    title="接单城市"
                    arrow="arrow-right"
                    align="right"
                    :value="orderCity"
                    @click.native="isOrderCityShow = true">
            </md-field-item>
            <md-input-item
                    v-model="inviteMobile"
                    title="邀请人手机号"
                    placeholder="选填，提交后不可更改"
            ></md-input-item>
        </md-field>
        <split></split>
        <md-field title="车辆信息">
            <md-field-item
                    title="车辆信息"
                    arrow="arrow-right"
                    align="right"
                    :value="carInfo"
                    @click.native="isCarInfoShow = true">
                </md-field-item>
            <md-input-item
                    v-model="license"
                    title="车牌号码"
                    placeholder="例：沪A88888"
            ></md-input-item>
        </md-field>
        <split></split>
        <split></split>
        <div class="login-btn">
            <md-button @click.native="next">下一步</md-button>
        </div>
        <md-picker
                ref="picker0"
                v-model="isOrderCityShow"
                :data="pickerData0"
                @confirm="onPickerConfirm(0)"
                title="选择接单城市"
        ></md-picker>
        <md-picker
                ref="picker1"
                v-model="isCarInfoShow"
                :data="pickerData1"
                :cols="3"
                is-cascade
                title="选择车辆信息"
                @confirm="onPickerConfirm(1)"
        ></md-picker>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Picker, Button, Field, FieldItem, InputItem} from 'mand-mobile'
  import Split from '../Base/Split'
  import simple from 'mand-mobile/components/picker/demo/data/simple'
  import district from 'mand-mobile/components/picker/demo/data/district'

  export default {
    name: 'register-step1',
    data () {
      return {
        isOrderCityShow: false,
        orderCity: '',
        name: '',
        ID: '',
        inviteMobile: '',
        isCarInfoShow: false,
        carInfo: '',
        license: '',
        pickerData0: simple,
        pickerData1: district
      }
    },
    components: {
      [Button.name]: Button,
      [Picker.name]: Picker,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [InputItem.name]: InputItem,
      Split
    },
    methods: {
      next () {
        this.$router.push('/driver/register/2')
      },
      onPickerConfirm(index) {
        const values = this.$refs[`picker${index}`].getColumnValues()

        let res = ''
        values.forEach(value => {
          value && (res += `${value.text || value.label} `)
        })
        this[`pickerValue${index}`] = res
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .register-step1
        .login-btn
            padding 0 20px
</style>
