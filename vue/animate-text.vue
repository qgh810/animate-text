<template>
  <div class="x-animate-text-root" :class="{'x-animate-text-hidden': !ready}" v-html="value"></div>
</template>

<script>
// 作者: 邱国辉
// 参考文档: https://github.com/qgh810/animate-text
//
// 用法如下
// <animate-text
//   class="animate-text-number"
//   :value="123456"
//   :is-number="true"
//   :start-number="0"
//   :time="2000"
//   :change-count="50"
//   @animated="function () {console.log('这里是动画结束的回调函数')}">
//   >
// </animate-text>
import AnimateText from 'animate-text'

export default {
  name: 'AnimateText',

  props: {
    // 动画内容 可以是文本或者动画
    value: null,
    // 动画时长
    time: {
      type: Number,
      default: 500
    },
    // 是否渲染为数字动画标志位
    isNumber: {
      type: Boolean,
      default: false
    },
    // 数字动画的起始数字
    startNumber: {
      type: Number,
      default: 0
    },
    // 数字动画数字变化次数
    changeCount: {
      type: Number,
      default: 32
    }
  },

  data () {
    return {
      animateText: null,
      ready: false
    }
  },

  watch: {
    value (val) {
      this.ready = false
      setTimeout(() => {
        this.init()
      }, 30)
    },

    time (val) {
      this.animateText ? this.animateText.play(val) : this.init()
    }
  },

  mounted () {
    this.init()
  },
  // 兼容vue1.0
  ready () {
    this.init()
  },

  methods: {
    init () {
      if (!this.value && this.value - 0 !== 0) return
      this.ready = true
      this.animateText = new AnimateText(this.$el, {
        time: this.time, // 动画时长
        isNumber: this.isNumber, // 是否渲染为数字动画
        startNumber: this.startNumber, // 渲染为数字动画时 动画的开始数字
        changeCount: this.changeCount, // 数字动画数字变化次数
        onAnimated: this.onAnimated // 动画结束事件回调
      })
    },

    onAnimated () {
      this.$emit('animated')
    }
  }
}
</script>

<style lang="css" scoped>

.x-animate-text-hidden {
  opacity: 0
}

</style>
