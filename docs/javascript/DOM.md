# DOM

## 元素的宽高

### offsetWidth

- offsetWidth = width + padding + border
- offsetWidth 是一个只读属性，它返回元素的布局宽度。通常这个值是以像素为单位的，但是对于根元素，它是一个与视口宽度相关的值。offsetWidth 的值包括元素的边框（border），水平线上的内边距（padding），垂直方向滚动条（如果存在且渲染的话），以及 CSS 设置的宽度（width）。

### clientWidth

- clientWidth = width + padding
- clientWidth 是一个只读属性，它返回元素的内部宽度（单位像素），包含内边距，但不包括垂直滚动条（如果存在）、边框和外边距。
- 如果元素的 overflow 为 scroll，clientWidth 也包括被滚动内容的宽度。
- 如果元素的 direction 为 rtl（从右向左阅读），clientWidth 从元素的右边缘开始，到左边缘结束。
- clientWidth 的值是一个浮点数，因此可能存在小数点后的不确定数字。
- clientWidth 的值是只读的，但是可以通过更改元素的 CSS 的 width 属性来改变它。
- clientWidth 的值不包括滚动条占用的空间。如果你需要包括滚动条占用的空间，那么可以使用 element.offsetWidth。
- clientWidth 的值不包括元素的边框和外边距。
- clientWidth 的值会被四舍五入为一个整数。
- clientWidth 的值会随着窗口滚动条的出现和消失而改变。
- clientWidth 的值会随着 CSS 的 width 属性的改变而改变。
- clientWidth 的值不包括伪元素的宽度。
- clientWidth 的值不包括伪元素的边框和外边距。
- clientWidth 的值不包括伪元素的滚动条占用的空间。

### scrollWidth

- scrollWidth = width + padding + border + 溢出内容的宽度
- scrollWidth 是一个只读属性，它返回元素的内容的总宽度，包括由于溢出导致的视图中不可见内容。
- scrollWidth 的值与元素的实际宽度是一样的，除非有溢出的内容，这时 scrollWidth 的值等于元素的实际宽度加上溢出内容的宽度。
- scrollWidth 的值是一个浮点数，因此可能存在小数点后的不确定数字。

### clientLeft

- clientLeft = border-left-width
- clientLeft 是一个只读属性，它返回元素的左边框的宽度，以像素表示。如果元素的 direction 为 rtl（从右向左阅读），那么 clientLeft 返回元素右边框的宽度。
- clientLeft 的值是一个浮点数，因此可能存在小数点后的不确定数字。
- clientLeft 的值是只读的，但是可以通过更改元素的 CSS 的 border-left-width 属性来改变它。
- clientLeft 的值不包括滚动条占用的空间。如果你需要包括滚动条占用的空间，那么可以使用 element.offsetWidth。
- clientLeft 的值不包括元素的内边距和外边距。
- clientLeft 的值会被四舍五入为一个整数。

### offsetLeft

- offsetLeft = border-left-width + 父元素的 offsetLeft
- offsetLeft 是一个只读属性，它返回当前元素相对于其 offsetParent 元素的左边界偏移的像素值。

### clientX

- clientX 是一个只读属性，它返回当事件被触发时，鼠标指针相对于浏览器页面（或客户区）的水平坐标。
- clientX 的值是一个浮点数，因此可能存在小数点后的不确定数字。
- clientX 的值是只读的，但是可以通过更改鼠标事件的返回值来改变它。
- clientX 的值不包括滚动条占用的空间。如果你需要包括滚动条占用的空间，那么可以使用 event.pageX。
- clientX 的值不包括元素的内边距和外边距。
- clientX 的值会被四舍五入为一个整数。
- clientX 的值会随着窗口滚动条的出现和消失而改变。

### offsetX

- offsetX 是一个只读属性，它返回当事件被触发时，鼠标指针相对于目标节点的 X 坐标。
- offsetX 的值是一个浮点数，因此可能存在小数点后的不确定数字。
- offsetX 的值是只读的，但是可以通过更改鼠标事件的返回值来改变它。
- offsetX 的值不包括滚动条占用的空间。如果你需要包括滚动条占用的空间，那么可以使用 event.pageX。
- offsetX 的值不包括元素的内边距和外边距。

### pageX

- pageX 是一个只读属性，它返回当事件被触发时，鼠标指针相对于整个文档的 X 坐标。
- pageX 的值是一个浮点数，因此可能存在小数点后的不确定数字。
- pageX 的值是只读的，但是可以通过更改鼠标事件的返回值来改变它。

### screenX

- screenX 是一个只读属性，它返回当事件被触发时，鼠标指针相对于屏幕的 X 坐标。
- screenX 的值是一个浮点数，因此可能存在小数点后的不确定数字。
- screenX 的值是只读的，但是可以通过更改鼠标事件的返回值来改变它。

## 几种获得宽高的方式

- dom.style.width/height 这种方式只能取到 dom 元素内联样式所设置的宽高，也就是说如果该节点的样式是在 style 标签中或外联的 CSS 文件中设置的话，通过这种方法是获取不到 dom 的宽高的。
- dom.currentStyle.width/height 这种方式获取的是在页面渲染完成后的结果，就是说不管是哪种方式设置的样式，都能获取到。但这种方式只有 IE 浏览器支持。
- window.getComputedStyle(dom).width/height 这种方式的原理和 2 是一样的，这个可以兼容更多的浏览器，通用性好一些。
- dom.getBoundingClientRect().width/height 这种方式是根据元素在视窗中的绝对位置来获取宽高的
- dom.offsetWidth/offsetHeight 这个就没什么好说的了，最常用的，也是兼容最好的。

## 拓展 各种获得宽高的方式

- 获取屏幕的高度和宽度（屏幕分辨率）： window.screen.height/width
- 获取屏幕工作区域的高度和宽度（去掉状态栏）： window.screen.availHeight/availWidth
- 网页全文的高度和宽度： document.body.scrollHeight/Width
- 滚动条卷上去的高度和向右卷的宽度： document.body.scrollTop/scrollLeft
- 网页可见区域的高度和宽度（不加边线）： document.body.clientHeight/clientWidth
- 网页可见区域的高度和宽度（加边线）： document.body.offsetHeight/offsetWidth
