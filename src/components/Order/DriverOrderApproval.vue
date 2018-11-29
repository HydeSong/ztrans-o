<template>
    <transition name="slide-in-up">
        <div class="driver-order-approval">
            <nav-bar>
                {{title}}
            </nav-bar>
            <div class="content">
                <split></split>
                <md-field>
                    <md-input-item
                        title="额外费用"
                        type="money"
                        v-model="driverAddFee"
                        maxlength="12"
                        placeholder="请输入金额"
                    ></md-input-item>
                    <md-input-item
                        title="备注"
                        v-model="driverRemark"
                        placeholder="请输入备注信息"
                    ></md-input-item>
                </md-field>
                <md-field title="交接单照片">
                    <div class="upload-qualification">
                        <div class="upload-qualification-item">
                            <div
                                class="image-reader-item"
                                v-for="(img, index) in imageList['driverReceitp']"
                                @click="showViewer(0, $event)"
                                :key="index"
                                :style="{
                                'backgroundImage': `url(${img})`,
                                'backgroundPosition': 'center center',
                                'backgroundRepeat': 'no-repeat',
                                'backgroundSize': 'cover'
                                }">
                                <md-icon
                                        class="image-reader-item-del"
                                        name="circle-cross"
                                        color="#fc9153"
                                        @click.native.stop="onDeleteImage('driverReceitp', index)">
                                </md-icon>
                            </div>
                            <div v-show="imageList['driverReceitp'].length === 0">
                                <md-image-reader
                                        name="driverReceitp"
                                        @select="onReaderSelect"
                                        @complete="onReaderComplete"
                                        @error="onReaderError"
                                ></md-image-reader>
                                <span class="btn-upload-identity-card">点击上传交接单</span>
                            </div>
                        </div>
                    </div>
                    <split></split>
                    <split></split>
                </md-field>
            </div>
            <md-action-bar :actions="actions" @click="onCompleteOrder">
                &yen;{{driverAddFee || 0}}
            </md-action-bar>
            <md-image-viewer
                v-model="isViewerShow"
                :list="imageView"
                :has-dots="true"
                :initial-index="viewerIndex">
            </md-image-viewer>
        </div>
    </transition>
</template>

<script>
import {
  Field,
  FieldItem,
  InputItem,
  Toast,
  Icon,
  ImageReader,
  ImageViewer,
  ActionBar,
  Dialog,
} from 'mand-mobile';
import Split from '../Base/Split';
import NavBar from '../Base/NavBar';

import {updateDriverOrder} from '@/api/order';
import {uploadPicture, getPicture, deletePicture} from '@/api/picture';
import {getCookie} from '@/common/js/cache';
import {mapGetters} from 'vuex';

export default {
  name: 'driver-order-approval',
  components: {
    [ActionBar.name]: ActionBar,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [InputItem.name]: InputItem,
    [ImageViewer.name]: ImageViewer,
    [Icon.name]: Icon,
    [ImageReader.name]: ImageReader,
    Split,
    NavBar,
  },
  computed: {
    ...mapGetters(['openId', 'customerInfo']),
    imageView() {
      let imageView = [];
      const driverReceitp = this.imageList.driverReceitp[0];
      driverReceitp && imageView.push(driverReceitp);
      return imageView;
    },
  },
  data() {
    return {
      disabled: true,
      isViewerShow: false,
      viewerIndex: 0,
      imageList: {
        driverReceitp: [],
      },
      imgUlrs: {
        driverReceitp: [],
      },
      title: '司机完成订单资料',
      actions: [
        {
          text: '确认完成该订单',
          disabled: true,
        },
      ],
      driverRemark: '',
      driverAddFee: '',
    };
  },
  methods: {
    showViewer(index) {
      this.viewerIndex = index;
      this.isViewerShow = true;
    },
    onReaderSelect() {
      Toast.loading('图片读取中...');
    },
    onReaderComplete(name, {dataUrl, blob, file}) {
      if (file.size > 5 * 1024 * 1024) {
        Toast.failed('文件不能大于5M');
        return;
      }
      const demoImageList = this.imageList[name] || [];
      demoImageList.push(dataUrl);
      this.$set(this.imageList, name, demoImageList);

      let pictureCode = '5';
      let customerNumId = this.customerInfo.customerMasterId;
      // 把图片上传到服务器
      const params = {customerNumId, pictureCode};
      this._uploadPicture(params, file, name);

      Toast.hide();
    },
    onReaderError(name, {msg}) {
      Toast.failed(msg);
    },
    onDeleteImage(name, index) {
      const demoImageList = this.imageList[name] || [];
      demoImageList.splice(index, 1);
      this.$set(this.imageList, name, demoImageList);

      const imgUlrList = this.imgUlrs[name] || [];
      // 从服务器上删除
      this._deletePicture(
        {
          customerNumId: this.customerInfo.customerMasterId,
          url: imgUlrList[index],
        },
        name
      );
    },
    _deletePicture(params, name) {
      deletePicture(params)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            Toast.succeed('删除成功');
            const imgUlrList = this.imgUlrs[name] || [];
            imgUlrList.splice(0, 1);
            this.$set(this.imgUlrs, name, imgUlrList);
            this.actions[0].disabled = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _uploadPicture(params, file, name) {
      uploadPicture(params, file)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            Toast.succeed('上传成功');
            const imgUlrList = this.imgUlrs[name] || [];
            imgUlrList.push(res.url);
            this.$set(this.imgUlrs, name, imgUlrList);
            this.actions[0].disabled = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _updateDriverOrder(params) {
      Toast.loading('正在提交');
      updateDriverOrder(params)
        .then(res => {
          if (res.code === 0) {
            Toast.succeed('成功');
            this.$router.go(-1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onCompleteOrder(event, action) {
      this._updateDriverOrder({
        openId: this.openId || getCookie('__user__openid'),
        driverRemark: this.driverRemark,
        driverAddFee: this.driverAddFee,
        driverReceitp: this.imgUlrs.driverReceitp[0],
        orderStatus: 6,
        series: this.$route.query.series,
      });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.driver-order-approval {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #f5f5f9;
}

.slide-in-up-enter-active {
  transition: all 0.3s ease;
}

.slide-in-up-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-in-up-enter, .slide-in-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.upload-qualification {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.upload-qualification-item {
  width: 50%;
  height: 224px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .md-image-reader {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-reader-item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
}

.upload-qualification-item input {
  display: none;
}

.upload-qualification-item span {
  display: block;
  width: 100%;
  padding-top: 60px * 2;
  text-align: center;
  color: #363636;
}

.btn-upload-identity-card {
  background: url('../../assets/images/icon-bill.png') no-repeat center 10px * 2;
}
</style>
