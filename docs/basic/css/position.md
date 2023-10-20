# position

CSS position 属性用于指定一个元素在文档中的定位方式。top，right，bottom 和 left 属性则决定了该元素的最终位置。

| 属性值   | 概述                                                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| absolute | 生成绝对定位的元素,相对于 static 定位以外的一个父元素进行定位.元素的位置通过 left、top、right、bottom 属性进行规定.                              |
| relative | 生成相对定位的元素,相对于其原来的位置进行定位.元素的位置通过 left、top、right、bottom 属性进行规定.元素原来位置保留                              |
| fixed    | 生成绝对定位的元素,指定元素相对于屏幕视⼝（viewport）的位置来指定元素位置.元素的位置在屏幕滚动时不会改变,⽐如回到顶部的按钮⼀般都是⽤此定位⽅式. |
| static   | 默认值,没有定位,元素出现在正常的文档流中,会忽略 top, bottom, left, right 或者 z-index 声明,块级元素从上往下纵向排布,⾏级元素从左向右排列.        |
| inherit  | 规定从父元素继承 position 属性的值                                                                                                               |

**absolute** 如果为 absolute 设置了 top、left,浏览器会递归查找该元素的所有父元素,如果找到一个设置了 position:relative/absolute/fixed 的元素,就以该元素为基准定位,如果没找到,就以浏览器边界定位。absolute 元素会被移出正常文档流，并不为元素预留空间。在布置文档流中其它元素时，绝对定位元素不占据空间。

**relative** 元素的定位永远是相对于元素自身位置的,和其他元素没关系,也不会影响其他元素。

**fixed** 元素的定位是相对于 window （或者 iframe）边界的,和其他元素没有关系.但是它具有破坏性,会导致其他元素位置的变化。元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。

**static** 关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。

> 如果 top 和 bottom 都被指定（严格来说，这里指定的值不能为 auto ），top 优先。 如果指定了 left 和 right ，当 direction 设置为 ltr（水平书写的中文、英语）时 left 优先，当 direction 设置为 rtl 时 right 优先。

## position:sticky

sticky 被称为粘性定位元素。简单的理解就是:

- 在目标区域以内,它的行为就像 position:relative;
- 在滑动过程中,某个元素距离其父元素的距离达到 sticky 粘性定位的要求时(top:100px)，这时相当于 fixed 定位,固定到适当位置。

元素固定的相对偏移是**相对于离它最近的具有滚动框的祖先元素**,如果祖先元素都不可以滚动,那么是相对于 viewport 来计算元素的偏移量.

使用条件：

- 父元素不能 overflow:hidden 或者 overflow:auto 属性.
- 必须指定 top、bottom、left、right 4 个值之一,否则只会处于相对定位
- 父元素的高度不能低于 sticky 元素的高度
- sticky 元素仅在其父元素内生效

## absolute 与 fixed

**共同点:**

- 改变行内元素的呈现方式,将 display 置为 inline-block
- 使元素脱离普通文档流,不再占据文档物理空间
- 覆盖非定位文档元素

**不同点:**

- absolute 与 fixed 的根元素不同,absolute 根元素可以设置,fixed 根元素是浏览器.
- 在有滚动条的页面中,absolute 会跟着父元素进行移动,fixed 固定在页面的具体位置.

## 脱离文档流

将窗体自上而下分成一行一行,并在每行中按从左至右依次排放元素,称为文档流,也称为普通流.
这个应该不难理解,HTML 中全部元素都是盒模型,盒模型占用一定的空间,依次排放在 HTML 中,形成了文档流.

元素脱离文档流之后,将不再在文档流中占据空间,而是处于浮动状态（可以理解为漂浮在文档流的上方）.脱离文档流的元素的定位基于正常的文档流,当一个元素脱离文档流后,依然在文档流中的其他元素将忽略该元素并填补其原先的空间.

**脱离文档流方法:**

- float
- absolute
- fixed

## 隐藏元素

- display: none; 渲染树不会包含该渲染对象,因此该元素不会在页面中占据位置,也不会响应绑定的监听事件.
- visibility: hidden; 元素在页面中仍占据空间,但是不会响应绑定的监听事件.
- opacity: 0; 将元素的透明度设置为 0,以此来实现元素的隐藏.元素在页面中仍然占据空间,并且能够响应元素绑定的监听事件.
- position: absolute; 通过使用绝对定位将元素移除可视区域内,以此来实现元素的隐藏.
- z-index: 负值; 来使其他元素遮盖住该元素,以此来实现隐藏.
- transform: scale(0,0); 将元素缩放为 0,来实现元素的隐藏.这种方法下,元素仍在页面中占据位置,但是不会响应绑定的监听事件.

## z-index 失效

z-index 堆叠上下文只有在 position:relative/absolute/fixed 脱离文档流控制时才生效，static 时无效。

**z-index 属性在下列情况下会失效:**

- 父元素 position 为 relative 时，子元素的 z-index 失效。**解决:** 父元素 position 改为 absolute 或 static；
- 元素没有设置 position 属性为非 static 属性。**解决:** 设置该元素的 position 属性为 relative，absolute 或是 fixed 中的一种；
- 元素在设置 z-index 的同时还设置了 float 浮动。**解决:** float 去除，改为 display：inline-block；
