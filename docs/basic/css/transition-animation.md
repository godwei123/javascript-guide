# CSS 过渡与动画

## animation、transition、transform、translate

- animation：用于设置动画属性，他是一个简写的属性，包含 6 个属性
- transition：用于设置元素的样式过度，和 animation 有着类似的效果，但细节上有很大的不同
- transform：用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系
- translate：translate 只是 transform 的一个属性值，即移动，除此之外还有 scale 等

### 参考资料

- https://juejin.im/post/5b137e6e51882513ac201dfb#heading-2

## 过渡 transition

transition 是过渡属性,强调过度,它的实现需要触发一个事件（比如鼠标移动上去,焦点,点击等）才执行动画.它类似于 flash 的补间动画,设置一个开始关键帧,一个结束关键帧。

## 动画 animation

animation 是动画属性,它的实现不需要触发事件,设定好时间之后可以自己执行,且可以循环一个动画.它也类似于 flash 的补间动画,但是它可以设置多个关键帧（用@keyframe 定义）完成动画。
