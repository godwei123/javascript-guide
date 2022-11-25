# CSS 过渡与动画

## 过渡 transition

transition 是过渡属性,强调过度,它的实现需要触发一个事件（比如鼠标移动上去,焦点,点击等）才执行动画.它类似于 flash 的补间动画,设置一个开始关键帧,一个结束关键帧。

## 动画 animation

animation 是动画属性,它的实现不需要触发事件,设定好时间之后可以自己执行,且可以循环一个动画.它也类似于 flash 的补间动画,但是它可以设置多个关键帧（用@keyframe 定义）完成动画。