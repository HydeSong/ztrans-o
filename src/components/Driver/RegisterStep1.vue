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
                    :value="billCity"
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
            <md-button @click.native="next" :disabled="disabled">下一步</md-button>
        </div>
        <md-picker
                ref="picker0"
                v-model="isOrderCityShow"
                :data="billCityData"
                @confirm="onPickerConfirm(0)"
                title="选择接单城市"
        ></md-picker>
        <md-picker
                ref="picker1"
                v-model="isCarInfoShow"
                :data="carInfoData"
                :cols="3"
                title="选择车辆信息"
                @confirm="onPickerConfirm(1)"
        ></md-picker>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Picker, Button, Field, FieldItem, InputItem} from 'mand-mobile'
  import Split from '../Base/Split'
  import {getAllRouterByCity} from '@/api/road'
  import {getCarBandList, getCarColourList, getCarTypeList} from '@/api/car'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'register-step1',
    data () {
      return {
        isOrderCityShow: false,
        billCity: '',
        name: '',
        ID: '',
        inviteMobile: '',
        isCarInfoShow: false,
        carInfo: '',
        license: '',
        billCityData: [],
        carInfoData: []
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
      ...mapGetters(['openId']),
      disabled () {
        return !(this.name && this.ID && this.inviteMobile && this.carInfo && this.license && this.billCity)
      }
    },
    created () {
      this._getCarBandList({customerNumId: 1})
      this._getCarTypeList({customerNumId: 1})
      this._getCarColourList({customerNumId: 1})
      this._getAllRouterByCity({openId: this.openId})
    },
    methods: {
      ...mapMutations({
        setStep1Data: 'SET_STEP1DATA'
      }),
      _getCarBandList (params) {
        getCarBandList(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:
                let carBands = []
                res.data.carBands.forEach((item) => {
                  carBands.push({
                    text: item.bandName,
                    value: item.bandId,
                    ...item
                  })
                })
                this.carInfoData.push(carBands)
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
      _getCarColourList (params) {
        getCarColourList(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:
                let carColours = []
                res.data.carColours.forEach((item) => {
                  carColours.push({
                    text: item.colourName,
                    value: item.colourId,
                    ...item
                  })
                })
                this.carInfoData.push(carColours)
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
      _getCarTypeList (params) {
        getCarTypeList(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            const code = res.data.code
            switch (code) {
              case 0:
                let carTypes = []
                res.data.carTypes.forEach((item) => {
                  carTypes.push({
                    text: item.typeName,
                    value: item.typeId,
                    ...item
                  })
                })
                this.carInfoData.push(carTypes)
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
                let billCityData = []
                res.data.wxRouterCityRelationModel.forEach((item, index) => {
                  billCityData.push({
                    text: `${item.sourceCityName} -> ${item.destinyCityName}`,
                    value: index + 1,
                    ...item
                  })
                })
                this.billCityData.push(billCityData)
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
      next () {
        this.$emit('next', 1)
        let step1Data = {
          carBrandId: 0,
          carColourId: 0,
          carPlateNumber: this.license,
          carTypeId: 0,
          driverIdentityId: this.ID,
          driverName: this.name,
          driverWorkCity: [
            {
              destinyCityId: 0,
              sourceCityId: 0
            }
          ],
          mobilePhone: this.inviteMobile,
        }
        this.setStep1Data(step1Data)
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
