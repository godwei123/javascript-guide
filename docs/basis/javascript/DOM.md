1、clientWidth：目标元素的 width+padding(左右两侧)

2、offsetWidth：目标元素的 width+padding(左右两侧)+border(左右两侧)

3、clientLeft：目标元素左边框 border 的宽度

4、offsetLeft：目标元素左边框离其具有定位的父元素之间的距离

5、clientX：鼠标相对于浏览器窗口可视区域的 X 坐标（横向）

6、offsetX：鼠标相对于绑定事件元素的 X 坐标

7、pageX：鼠标相对于文档的 X 坐标，会计算滚动距离；如果没有滚动距离，值与 clientX 一样

8、screenX：鼠标相对于**显示器**屏幕左侧的 X 坐标

9、getBoundingClientRect().left：目标元素左边框相对于浏览器可视区域的距离，可能为负值
