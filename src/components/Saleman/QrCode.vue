<template>
    <div class="qrcode">
        <nav-bar>
            扫一扫
        </nav-bar>
        <div class="content">
            <img :src="qrcodeImg" alt="二维码">
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Split from '../Base/Split';
import NavBar from '../Base/NavBar';
import {mapState} from 'vuex';

export default {
  name: 'qrcode',
  components: {
    Split,
    NavBar,
  },
  computed: {
    ...mapState([
      'qrcodeImg'
    ]),
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.qrcode {
    width: 100%;

    .content {
        padding: 30px;

        img {
            width: 100%;
        }
    }
}
</style>
