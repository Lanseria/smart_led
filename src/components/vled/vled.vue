<template>
  <div>
    <div class="light" :class="led">
    </div>
    <div class="light_btm" :class="ledBbtn" title="点击按钮打开智能灯">
      <img :class="ledBbtn"  @click="openled"/>
    </div>
    <div class="select">
      <ul class="color-ul">
        <li :class="pre[status===index?1:0]+item" v-for="(item,index) in colormap" :key="index" v-show="index" @click="opencolor(index)">
        </li>
      </ul>
    </div>
    <div class="tips">点击开关开启；点击下边颜色按钮可以换色</div>
  </div>
</template>

<script>
import LED from '../../api/client'
export default {
  name: 'vled',
  data () {
    return {
      status: 0,
      colormap: [],
      pre: [],
      color_store: 1
    }
  },
  methods: {
    openled () {
      if (this.status === 0) {
        LED.open()
        this.status = this.color_store
        console.log(this.colormap[this.status])
      } else {
        LED.close()
        this.color_store = this.status
        this.status = 0
        console.log(this.colormap[this.status])
      }
    },
    opencolor (index) {
      if (this.status === 0) {
        alert('先打开电源')
      } else {
        this.status = index
        LED.adjust(index)
        // console.log(this.colormap[index])
      }
    }
  },
  computed: {
    led: {
      get () {
        return this.colormap[this.status]
      }
    },
    ledBbtn: {
      get () {
        return this.colormap[this.status]
      }
    }
  },
  created () {
    this.colormap = ['close', 'red', 'yellow', 'blue', 'green', 'purple']
    this.pre = ['off', 'on']
  },
  mounted () {
    LED.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet" scoped>
  @import "../../common/stylus/mixin.styl"

  .light
    height: 520px
    width: 340px
    margin-right: auto
    margin-left: auto
    position: relative
    &.close
      bg-image('l-close')
    &.red
      bg-image('l-red')
    &.yellow
      bg-image('l-yellow')
    &.blue
      bg-image('l-blue')
    &.green
      bg-image('l-green')
    &.purple
      bg-image('l-purple')
  .light_btm
    background-image: url('light_btm_bg.png')
    background-repeat: no-repeat
    background-position: center 0px
    height: 212px
    width: 366px
    margin-right: auto
    margin-left: auto
    position: relative
    z-index: 100
    top: -82px
    text-align: center
    img
      height: 55px
      width: 55px
      margin-top: 30px
      &.close
        bg-image('switch-close')
      &.red
        bg-image('switch-red')
      &.yellow
        bg-image('switch-yellow')
      &.blue
        bg-image('switch-blue')
      &.green
        bg-image('switch-green')
      &.purple
        bg-image('switch-purple')
  .select
    width: 424px
    margin-right: auto
    margin-left: auto
    position: relative
    z-index: 200
    top: -120px
    overflow: hidden
    ul
      width: 460px
      overflow: hidden
      li
        height: 66px
        width: 64px
        margin-right: 26px
        float: left
        &.offred
          bg-image('off-red')
        &.offyellow
          bg-image('off-yellow')
        &.offblue
          bg-image('off-blue')
        &.offgreen
          bg-image('off-green')
        &.offpurple
          bg-image('off-purple')
        &.onred
          bg-image('on-red')
        &.onyellow
          bg-image('on-yellow')
        &.onblue
          bg-image('on-blue')
        &.ongreen
          bg-image('on-green')
        &.onpurple
          bg-image('on-purple')
  .tips
    font-size: 12px
    line-height: 20px
    color: #999
    text-align: center
    position: relative
    z-index: 300
    height: 20px
    top: -100px
    width: 100%
</style>
