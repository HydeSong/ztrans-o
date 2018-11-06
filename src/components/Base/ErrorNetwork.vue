<template>
    <div class="error-network" @click="handleClick">
        <md-result-page
                type="network"
                subtext="点击屏幕，重新加载">
        </md-result-page>
    </div>
</template>

<script>
import {ResultPage} from 'mand-mobile';

export default {
  name: 'error-network',
  components: {
    [ResultPage.name]: ResultPage,
  },
  methods: {
    handleClick() {
      console.log('重新加载');
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="stylus">
.error-network {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  img {
    height: 131px;
  }
}
</style>