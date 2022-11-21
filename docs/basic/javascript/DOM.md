1、clientWidth：目标元素的 width+padding(左右两侧)

2、offsetWidth：目标元素的 width+padding(左右两侧)+border(左右两侧)

3、clientLeft：目标元素左边框 border 的宽度

4、offsetLeft：目标元素左边框离其具有定位的父元素之间的距离

5、clientX：鼠标相对于浏览器窗口可视区域的 X 坐标（横向）

6、offsetX：鼠标相对于绑定事件元素的 X 坐标

7、pageX：鼠标相对于文档的 X 坐标，会计算滚动距离；如果没有滚动距离，值与 clientX 一样

8、screenX：鼠标相对于**显示器**屏幕左侧的 X 坐标

9、getBoundingClientRect().left：目标元素左边框相对于浏览器可视区域的距离，可能为负值

## 几种获得宽高的方式

- dom.style.width/height   这种方式只能取到 dom 元素内联样式所设置的宽高，也就是说如果该节点的样式是在 style 标签中或外联的 CSS 文件中设置的话，通过这种方法是获取不到 dom 的宽高的。
- dom.currentStyle.width/height   这种方式获取的是在页面渲染完成后的结果，就是说不管是哪种方式设置的样式，都能获取到。但这种方式只有 IE 浏览器支持。
- window.getComputedStyle(dom).width/height   这种方式的原理和 2 是一样的，这个可以兼容更多的浏览器，通用性好一些。
- dom.getBoundingClientRect().width/height   这种方式是根据元素在视窗中的绝对位置来获取宽高的
- **dom.offsetWidth/offsetHeight**   这个就没什么好说的了，最常用的，也是兼容最好的。

## 拓展 各种获得宽高的方式

- 获取屏幕的高度和宽度（屏幕分辨率）： window.screen.height/width
- 获取屏幕工作区域的高度和宽度（去掉状态栏）： window.screen.availHeight/availWidth
- 网页全文的高度和宽度： document.body.scrollHeight/Width
- 滚动条卷上去的高度和向右卷的宽度： document.body.scrollTop/scrollLeft
- 网页可见区域的高度和宽度（不加边线）： document.body.clientHeight/clientWidth
- 网页可见区域的高度和宽度（加边线）： document.body.offsetHeight/offsetWidth
