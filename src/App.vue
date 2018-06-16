<template>
  <div id="app" ref="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted () {
    setTimeout(() => {
      this.setAppHeight()
    }, 0)
  },
  methods: {
    setAppHeight () {
      const height = window.screen.availHeight
      this.$refs.app.style.height = `${height}px`
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 28px;
}
html, body {

  background-color: #f5f5f9;
}
* {
  padding: 0;
  margin: 0;
}
</style>
