## 在VUE中使用

看到有小伙伴在问怎么在vue中使用, 所以我封装了个vue组件/vue/animate-text.vue
vue1.0做了兼容但是偷懒没有测试过 应该也是可以用的
直接拷贝这个文件到项目里面 然后照着下面的样子引用就行了 比较简单, 自己测试过了 所以应该不会有很明显的bug吧

[详细文档在这](https://github.com/qgh810/animate-text)

具体用法如下:

```html
<animate-text
  class="animate-text-number"
  :value="如果没有指定是数字,则会以打字动画出现,就像现在这样">
  >
</animate-text>
<!-- 或者 -->
<animate-text
  class="animate-text-number"
  :value="123456"
  :is-number="true"
  :start-number="0"
  :time="2000"
  :change-count="50"
  @animated="function () {console.log('这里是动画结束的回调函数')}">
  >
</animate-text>
```
