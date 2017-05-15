import { checkNode } from './utils/check'
import { showWarn } from './utils/log'

class AnimateText {
  constructor (el, options) {
    this.initData(el, options) && this.init()
    this.play = this.play.bind(this)
  }

  /**
   * 检查和初始化传入参数
   */
  initData (el, options) {
    this.el = checkNode(el)
    if (!this.el) return
    options = this.checkOptions(options)
    this.options = options
    if (options.isNumber) {
      this.number = Number(this.el.innerText)
      if (!this.number && this.number !== 0) {
        this.options.isNumber = false
        return this.initData(el, this.options)
      }
      this.startNumber = options.startNumber - 0 || 0
      this.changeCount = options.changeCount - 0 || 24
    } else {
      this.text = this.el.innerText
      this.textArr = this.text.split('')
    }
    this.isNumber = options.isNumber
    this.time = options.time
    this.spanClassName = options.spanClassName
    this.el.innerText = ''
    this.onAnimated = options.onAnimated
    return true
  }

  /**
   * 检查并且初始化options
   */
  checkOptions (options) {
    if (typeof options === 'number') options = {time: options}
    options = options || {}
    let baseOptions = {
      time: 500,
      isNumber: false,
      startNumber: 0,
      changeCount: 32,
      onAnimated () {}
    }
    for (let option in baseOptions) {
      !options[option] && (options[option] = baseOptions[option])
    }
    return options
  }

  init (time = this.time) {
    this.isNumber ? this.playNumberAnimation(time) : this.playTextAnimation(time)
  }

  playTextAnimation (time) {
    var textArr = [].concat(this.textArr)
    var currTextArr = []
    this.tid = setInterval(() => {
      var word = textArr.shift()
      if (!word) {
        this.onEnd()
        return clearInterval(this.tid)
      }
      let span = document.createElement('span')
      let br = document.createElement('br')
      span.className = this.spanClassName
      span.innerText = word
      this.el.appendChild(word === '\n' ? br : span)
      // currTextArr.push(word === '\n' ? '<br>' : `<span class="animate-text-text-span">${word}</span>`)
      // this.el.innerHTML = currTextArr.join('')
    }, time / this.textArr.length)
  }

  playNumberAnimation (time) {
    let changeCount = this.changeCount
    let targetNumber = this.number
    if (!targetNumber === 0) return
    let targetNumberDecimalLength = this.getDecimalLength(targetNumber)
    let StartNumberDecimalLength = this.getDecimalLength(this.startNumber)
    let decimalLength = Math.max(targetNumberDecimalLength, StartNumberDecimalLength)
    let d = this.number - this.startNumber
    let everyD = (d / changeCount).toFixed(decimalLength) - 0
    if (everyD === 0) {
      showWarn('差值过小无法动画')
      return this.el.innerText = targetNumber
    }
    var currNumber = this.startNumber
    this.tid = setInterval(() => {
      currNumber = (currNumber + everyD).toFixed(decimalLength) - 0
      if (Math.abs(currNumber - targetNumber) < Math.abs(everyD)) {
        this.el.innerText = targetNumber
        this.onEnd()
        return clearInterval(this.tid)
      }
      this.el.innerText = currNumber
    }, time / changeCount)
  }

  getDecimalLength (number) {
    let numberStr = number + ''
    return numberStr.split('.')[1] && numberStr.split('.')[1].length || 0
  }

  play (time = this.time) {
    clearInterval(this.tid)
    this.el.innerText = this.isNumber ? this.number : this.text
    var options = {
      time: this.time,
      isNumber: this.isNumber,
      startNumber: this.startNumber,
      changeCount: this.changeCount,
      onAnimated: this.onAnimated
    }
    this.initData(this.el, options) && this.init()
  }

  onEnd () {
    let callBack = this.options.onAnimated
    if (typeof callBack !== 'function') return
    setTimeout(() => {
      this.options.onAnimated()
    }, 10)
  }
}

module.exports = AnimateText
