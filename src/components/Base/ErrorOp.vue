<template>
    <div class="error-op">
        <md-result-page
                :buttons="buttons">
        </md-result-page>
    </div>
</template>

<script>
import {ResultPage, Toast} from 'mand-mobile';

export default {
  name: 'error-op',
  components: {
    [ResultPage.name]: ResultPage,
  },
  data() {
    return {
      buttons: [
        {
          text: '普通按钮',
          handler() {
            Toast.succeed('普通操作');
          },
        },
        {
          text: '高亮按钮',
          type: 'ghost-primary',
          handler() {
            Toast.succeed('不普通操作');
          },
        },
      ],
    };
  },
};
</script>

<style lang="stylus">
.error-op {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  img {
    height: 131px;
  }
}
</style>