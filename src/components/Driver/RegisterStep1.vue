<template>
    <div class="register-step1">
        <split></split>
        <md-field title="个人信息">
            <md-input-item
                    v-model="driverName"
                    title="姓名"
                    placeholder="请输入您的真实姓名"
            ></md-input-item>
            <md-input-item
                    v-model="driverIdentityId"
                    title="身份证"
                    placeholder="请输入您的身份证号码"
            ></md-input-item>
            <md-field-item
                    title="接单城市"
                    arrow="arrow-right"
                    align="right"
                    :value="billCity"
                    @click.native="isOrderCityShow = true">
            </md-field-item>
            <md-input-item
                    v-model="mobilePhone"
                    type="phone"
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
                    v-model="carPlateNumber"
                    title="车牌号码"
                    placeholder="例：沪A88888"
            ></md-input-item>
        </md-field>
        <split></split>
        <split></split>
        <div class="login-btn">
            <md-button @click.native="next" :disabled="disabled">下一步</md-button>
        </div>
        <md-picker
                ref="billCity"
                v-model="isOrderCityShow"
                :data="billCityData"
                @confirm="onPickerConfirm('billCity')"
                title="选择接单城市"
        ></md-picker>
        <md-picker
                ref="carInfo"
                v-model="isCarInfoShow"
                :data="carInfoData"
                :cols="5"
                title="选择车辆信息"
                @confirm="onPickerConfirm('carInfo')"
        ></md-picker>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Picker, Button, Field, FieldItem, InputItem} from 'mand-mobile'
  import Split from '../Base/Split'
  import {getAllRouterByCity} from '@/api/road'
  import {getCarBandList, getCarColourList, getCarTypeList, getCarSizeList, getCarWeightList} from '@/api/car'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'register-step1',
    data () {
      return {
        carBrandId: '',
        carColourId: '',
        carPlateNumber: '',
        carTypeId: '',
        sizeId: '',
        carSizeId: '',
        carWeightId: '',
        driverIdentityId: '',
        driverName: '',
        driverWorkCity:[],
        mobilePhone: '',
        billCity: '',
        carInfo: '',
        billCityData: [],
        carInfoData: [],
        isOrderCityShow: false,
        isCarInfoShow: false,
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
    computed: {
      ...mapGetters(['openId', 'customerInfo']),
      disabled () {
        return !(this.driverName && this.driverIdentityId && this.carInfo && this.carPlateNumber)
      }
    },
    created () {
      // console.log(this.customerInfo.customerMasterId)
      this._getCarBrandList({customerNumId: this.customerInfo.customerMasterId})
      this._getCarTypeList({customerNumId: this.customerInfo.customerMasterId})
      this._getCarColourList({customerNumId: this.customerInfo.customerMasterId})
      this._getCarSizeList({customerNumId: this.customerInfo.customerMasterId})
      this._getCarWeightList({customerNumId: this.customerInfo.customerMasterId})
      this._getAllRouterByCity({openId: this.openId})
    },
    methods: {
      ...mapMutations({
        setStep1Data: 'SET_STEP1DATA'
      }),
      _getCarBrandList (params) {
        getCarBandList(params).then(res => {
          if (res.code === 0) {
            let carBrands = []
            res.carBrands.forEach((item) => {
              carBrands.push({
                text: item.brandName,
                value: item.brandId,
                ...item
              })
            })
            this.carInfoData.push(carBrands)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getCarColourList (params) {
        getCarColourList(params).then(res => {
          if (res.code === 0) {
            let carColours = []
            res.carColours.forEach((item) => {
              carColours.push({
                text: item.colourName,
                value: item.colourId,
                ...item
              })
            })
            this.carInfoData.push(carColours)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getCarTypeList (params) {
        getCarTypeList(params).then(res => {
          if (res.code === 0) {
            let carTypes = []
            res.carTypes.forEach((item) => {
              carTypes.push({
                text: item.typeName,
                value: item.typeId,
                ...item
              })
            })
            this.carInfoData.push(carTypes)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getCarSizeList (params) {
        getCarSizeList(params).then(res => {
          if (res.code === 0) {
            let carSizes = []
            res.carSizes.forEach((item) => {
              carSizes.push({
                text: `${item.sizeName}米`,
                value: item.sizeId,
                ...item
              })
            })
            this.carInfoData.push(carSizes)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getCarWeightList (params) {
        getCarWeightList(params).then(res => {
          if (res.code === 0) {
            let carWeights = []
            res.carWeights.forEach((item) => {
              carWeights.push({
                text: item.weightName,
                value: item.weightId,
                ...item
              })
            })
            this.carInfoData.push(carWeights)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getAllRouterByCity (params) {
        getAllRouterByCity(params).then(res => {
          console.log(res)
          if (res.code === 0) {
            let billCityData = []
            res.wxRouterCityRelationModel.forEach((item, index) => {
              billCityData.push({
                text: `${item.sourceCityName} -> ${item.destinyCityName}`,
                value: index + 1,
                ...item
              })
            })
            this.billCityData.push(billCityData)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      next () {
        this.$emit('next', 1)
        let step1Data = {
          carBrandId: this.carBrandId,
          carColourId: this.carColourId,
          carPlateNumber: this.carPlateNumber,
          carTypeId: this.carTypeId,
          sizeId: this.sizeId,
          carSizeId: this.carSizeId,
          carWeightId: this.carWeightId,
          driverIdentityId: this.driverIdentityId,
          driverName: this.driverName,
          driverWorkCity: this.driverWorkCity,
          mobilePhone: this.mobilePhone,
        }
        this.setStep1Data(step1Data)
      },
      onPickerConfirm(name) {
        const values = this.$refs[name].getColumnValues()

        let res = ''
        values.forEach(value => {
          value && (res += `${value.text || value.label} `)
          console.log(value)
          if (name === 'billCity') {
            this.driverWorkCity.push({
              destinyCityId: value.destinyCityId,
              sourceCityId: value.sourceCityId
            })
          } else if (name === 'carInfo') {
            value.typeId && (this.carTypeId = value.typeId)
            value.brandId && (this.carBrandId = value.brandId)
            value.colourId && (this.carColourId = value.colourId)
            value.sizeId && (this.sizeId = value.sizeId)
            value.carSizeId && (this.carSizeId = carSizeId)
            value.carWeightId && (this.carWeightId = carWeightId)
          }
        })
        this[name] = res
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .register-step1
        .login-btn
            padding 0 20px
</style>
