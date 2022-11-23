# 定位

## position

常见属性值

| 属性值   | 概述                                                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| absolute | 生成绝对定位的元素,相对于 static 定位以外的一个父元素进行定位.元素的位置通过 left、top、right、bottom 属性进行规定.                              |
| relative | 生成相对定位的元素,相对于其原来的位置进行定位.元素的位置通过 left、top、right、bottom 属性进行规定.元素原来位置保留                              |
| fixed    | 生成绝对定位的元素,指定元素相对于屏幕视⼝（viewport）的位置来指定元素位置.元素的位置在屏幕滚动时不会改变,⽐如回到顶部的按钮⼀般都是⽤此定位⽅式. |
| static   | 默认值,没有定位,元素出现在正常的文档流中,会忽略 top, bottom, left, right 或者 z-index 声明,块级元素从上往下纵向排布,⾏级元素从左向右排列.        |
| inherit  | 规定从父元素继承 position 属性的值                                                                                                               |

relative:元素的定位永远是相对于元素自身位置的,和其他元素没关系,也不会影响其他元素

fixed:元素的定位是相对于 window （或者 iframe）边界的,和其他元素没有关系.但是它具有破坏性,会导致其他元素位置的变化.

absolute:元素的定位相对于前两者要复杂许多.如果为 absolute 设置了 top、left,浏览器会递归查找该元素的所有父元素,如果找到一个设置了 position:relative/absolute/fixed 的元素,就以该元素为基准定位,如果没找到,就以浏览器边界定位.

### position:sticky

- position:sticky 被称为粘性定位元素（stickily positioned element）是计算后位置属性为 sticky 的元素.
- 简单的理解就是:在目标区域以内,它的行为就像 position:relative;在滑动过程中,某个元素距离其父元素的距离达到 sticky 粘性定位的要求时(比如 top:100px)；position:sticky 这时的效果相当于 fixed 定位,固定到适当位置.
- 元素固定的相对偏移是**相对于离它最近的具有滚动框的祖先元素**,如果祖先元素都不可以滚动,那么是相对于 viewport 来计算元素的偏移量.

使用条件

- 父元素不能 overflow:hidden 或者 overflow:auto 属性.
- 必须指定 top、bottom、left、right 4 个值之一,否则只会处于相对定位
- 父元素的高度不能低于 sticky 元素的高度
- sticky 元素仅在其父元素内生效

### absolute 与 fixed

**共同点:**

- 改变行内元素的呈现方式,将 display 置为 inline-block
- 使元素脱离普通文档流,不再占据文档物理空间
- 覆盖非定位文档元素

**不同点:**

- absolute 与 fixed 的根元素不同,absolute 的根元素可以设置,fixed 根元素是浏览器.
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

- display: none:渲染树不会包含该渲染对象,因此该元素不会在页面中占据位置,也不会响应绑定的监听事件.
- visibility: hidden:元素在页面中仍占据空间,但是不会响应绑定的监听事件.
- opacity: 0:将元素的透明度设置为 0,以此来实现元素的隐藏.元素在页面中仍然占据空间,并且能够响应元素绑定的监听事件.
- position: absolute:通过使用绝对定位将元素移除可视区域内,以此来实现元素的隐藏.
- z-index: 负值:来使其他元素遮盖住该元素,以此来实现隐藏.
- clip/clip-path :使用元素裁剪的方法来实现元素的隐藏,这种方法下,元素仍在页面中占据位置,但是不会响应绑定的监听事件.
- transform: scale(0,0):将元素缩放为 0,来实现元素的隐藏.这种方法下,元素仍在页面中占据位置,但是不会响应绑定的监听事件.

## z-index 失效

z-index 堆叠上下文只有在 postion:relative/absolute/fixed 脱离文档流控制时才生效，static 时无效。

z-index 属性在下列情况下会失效：

- 父元素 position 为 relative 时，子元素的 z-index 失效。解决：父元素 position 改为 absolute 或 static；
- 元素没有设置 position 属性为非 static 属性。解决：设置该元素的 position 属性为 relative，absolute 或是 fixed 中的一种；
- 元素在设置 z-index 的同时还设置了 float 浮动。解决：float 去除，改为 display：inline-block；

---

CSS position 属性用于指定一个元素在文档中的定位方式。top，right，bottom 和 left 属性则决定了该元素的最终位置。

定位类型
定位元素（positioned element）是其计算后位置属性为 relative, absolute, fixed 或 sticky 的一个元素（换句话说，除 static 以外的任何东西）。
相对定位元素（relatively positioned element）是计算后位置属性为 relative 的元素。
绝对定位元素（absolutely positioned element）是计算后位置属性为 absolute 或 fixed 的元素。
粘性定位元素（stickily positioned element）是计算后位置属性为 sticky 的元素。
大多数情况下，height 和 width 被设定为 auto 的绝对定位元素，按其内容大小调整尺寸。但是，被绝对定位的元素可以通过指定 top 和 bottom ，保留 height 未指定（即 auto），来填充可用的垂直空间。它们同样可以通过指定 left 和 right 并将 width 指定为 auto 来填充可用的水平空间。

除了刚刚描述的情况（绝对定位元素填充可用空间）：

如果 top 和 bottom 都被指定（严格来说，这里指定的值不能为 auto ），top 优先。
如果指定了 left 和 right ，当 direction 设置为 ltr（水平书写的中文、英语）时 left 优先，当 direction 设置为 rtl（阿拉伯语、希伯来语、波斯语由右向左书写）时 right 优先。

static
该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。

relative
该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。position:relative 对 table-\*-group, table-row, table-column, table-cell, table-caption 元素无效。

相对定位的元素是在文档中的正常位置偏移给定的值，但是不影响其他元素的偏移。

absolute
元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。

相对定位的元素并未脱离文档流，而绝对定位的元素则脱离了文档流。在布置文档流中其它元素时，绝对定位元素不占据空间。绝对定位元素相对于最近的非 static 祖先元素定位。当这样的祖先元素不存在时，则相对于 ICB（inital container block, 初始包含块）

fixed
元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。

sticky
元素根据正常文档流进行定位，然后相对它的*最近滚动祖先（nearest scrolling ancestor）*和 containing block (最近块级祖先 nearest block-level ancestor)，包括 table-related 元素，基于 top, right, bottom, 和 left 的值进行偏移。偏移值不会影响任何其他元素的位置。 该值总是创建一个新的层叠上下文（stacking context）。注意，一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的 overflow 是 hidden, scroll, auto, 或 overlay 时），即便这个祖先不是最近的真实可滚动祖先。这有效地抑制了任何“sticky”行为（详情见 Github issue on W3C CSSWG）。．

粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。例如：

#one { position: sticky; top: 10px; }
在 viewport 视口滚动到元素 top 距离小于 10px 之前，元素为相对定位。之后，元素将固定在与顶部距离 10px 的位置，直到 viewport 视口回滚到阈值以下。

粘性定位常用于定位字母列表的头部元素。标示 B 部分开始的头部元素在滚动 A 部分时，始终处于 A 的下方。而在开始滚动 B 部分时，B 的头部会固定在屏幕顶部，直到所有 B 的项均完成滚动后，才被 C 的头部替代。

须指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。
