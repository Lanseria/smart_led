<template>
  <div class="app">
    <div class="title border-1px">智能家居灯控系统</div>
    <vled></vled>
  </div>
</template>

<script>
import vled from './components/vled/vled'
export default {
  name: 'app',
  components: {
    vled
  }
}
</script>

<style lang="stylus" rel="stylesheet" scoped>
  @import "./common/stylus/mixin.styl"
  .app
    .title
      font-size: 20px;
      line-height: 20px;
      color: #888;
      font-weight: bold;
      height: 20px;
      margin-left: 20%;
      padding-top: 28px;
</style>
