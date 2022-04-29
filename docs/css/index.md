# CSS

## 1、居中

::: tip
居中实现涉及到宽高是否固定,元素是行内元素还是块级元素,应综合考虑实现方式.

实现方式很多,下面为常见的几种实现方式.

面试中 css 基础,常考题
:::

### 水平居中

#### 1.text-align

```css
.parent {
    text-align: center;
}
.son {
    display: inline-block;
}
```

#### 2.margin

```css
.son {
    margin: 0 auto;
}
```

#### 3.flex

```css
.parent {
    display: flex;
    justify-content: center;
}
```

#### 4.grid

```css
.parent {
    display: grid;
    justify-content: center;
}

/* 或者 */
.parent {
    display: grid;
}
.son {
    justify-self: center;
}
```

#### 5.绝对定位

```css
.parent {
    position: relative;
}

.son {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
}

.son {
    position: absolute;
    width: 宽度;
    left: 50%;
    margin-left: -0.5 * 宽度;
}

.son {
    position: absolute;
    width: 宽度;
    left: 0;
    right: 0;
    margin: 0 auto;
}
```

#### 6.table

```css
.parent {
    display: table-cell;
    text-align: center;
}
.son {
    display: inline-block;
}
```

### 垂直居中

#### 1.flex 布局

```css
.parent {
    display: flex;
    align-items: center;
}
```

#### 2.gird 布局

```css
.parent {
    display: grid;
    align-items: center;
}
/* OR */
.parent {
    display: grid;
}
.son {
    align-self: center;
}
```

#### 3.绝对定位

```css
.parent {
    position: relative;
}
.son {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
}
.son {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
```

#### 4.vertical-align + line-height

```css
.parent {
    line-height: 600px;
}
.son {
    display: inline-block;
    vertical-align: middle;
}
```

#### 5.table 布局

```css
.parent {
    display: table-cell;
    vertical-align: middle;
}
.son {
    display: inline-block;
}
```

### 水平垂直居中

#### 1.flex

```css
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

#### 2.grid

```css
.parent {
    display: grid;
    justify-content: center;
    align-items: center;
}

/* OR */

.parent {
    display: grid;
}
.son {
    justify-self: center;
    align-self: center;
}
```

#### 3.绝对定位

```css
.parent {
    position: relative;
}
.son {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.son {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```

#### 4.table 布局

```css
.parent {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.son {
    display: inline-block;
}
```

## 2、选择器权重值和优先级

!important > 内联 > #id > .class/属性选择器/:伪类 > 标签/::伪元素 > \* > 继承

对于选择器的优先级:

-   标签选择器、伪元素选择器:1;
-   类选择器、伪类选择器、属性选择器:10;
-   id 选择器:100;
-   内联样式:1000;

注意事项:

-   !important 声明的样式的优先级最高;
-   如果优先级相同,则最后出现的样式生效;
-   继承得到的样式的优先级最低;
-   通用选择器（\*）、子选择器（>）和相邻同胞选择器（+）并不在这四个等级中,所以它们的权值都为 0 ;
-   样式表的来源不同时,优先级顺序为:内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式.

## 3、盒模型

CSS3 中的盒模型有以下两种:标准盒子模型、IE 盒子模型

盒模型都是由四个部分组成的,分别是 margin、border、padding 和 content.
![标准盒子模型](/20200715170108916.png)

![IE 盒子模型](/20200715170121834.png)

标准盒模型和 IE 盒模型的区别在于设置 width 和 height 时,所对应的范围不同:

-   标准盒模型的 width 和 height 属性的范围只包含了 content,
-   IE 盒模型的 width 和 height 属性的范围包含了 border、padding 和 content.

可以通过修改元素的 box-sizing 属性来改变元素的盒模型:

-   box-sizing: content-box 表示标准盒模型（默认值）
-   box-sizing: border-box 表示 IE 盒模型（怪异盒模型）

## 4、block、inline 和 inline-block

(1) block:会独占一行,多个元素会另起一行,可以设置 width、height、margin 和 padding 属性;

(2) inline:元素不会独占一行,设置 width、height 属性无效.但可以设置水平方向的 margin 和 padding 属性,不能设置垂直方向的 padding 和 margin;

(3) inline-block:将对象设置为 inline 对象,但对象的内容作为 block 对象呈现,之后的内联对象会被排列在同一行内.

对于行内元素和块级元素,其特点如下:

(1) 行内元素

-   设置宽高无效;
-   可以设置水平方向的 margin 和 padding 属性,不能设置垂直方向.

(2) 块级元素

-   可以设置宽高;
-   设置 margin 和 padding 都有效;
-   可以自动换行,多个块状,默认排列从上到下.

## 5、伪类和伪元素

伪元素 : 在内容元素的前后插入额外的元素或样式,但是这些元素实际上并不在文档中生成.它们只在外部显示可见,但不会在文档的源代码中找到它们,因此,称为“伪”元素.伪元素类似于增添一个新的 DOM 节点到 DOM 树中,而不是改变元素的状态.注意了,这里是类似,而不是真的增加一个节点,这也是其被称为伪元素的原因（实质上,元素被创建在文档外）.

伪类 : 将特殊的效果添加到特定选择器上.它是已有元素上添加类别的,不会产生新的元素.伪类就是一个选择处于特定状态的元素的选择器,比如某一个 clsss 的第一个元素,某个被 hover 的元素等等,我们可以理解成一个特定的 CSS 类,但与普通的类不一样,它只有处于 DOM 树无法描述的状态下才能为元素添加样式,所以将其称为伪类.

总结：（1）伪类是通过在元素选择器上加⼊伪类改变元素状态,⽽伪元素通过对元素的操作进⾏对元素的改变.（2）伪类是操作文档中已有的元素,而伪元素是创建了一个文档外的元素.（3）为了书写 CSS 时进行区分,一般伪类是单冒号,如:hover,而伪元素是双冒号::before.

## 6、position

### 常见属性值

| **属性值** | **概述**                                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| absolute   | 生成绝对定位的元素,相对于 static 定位以外的一个父元素进行定位.元素的位置通过 left、top、right、bottom 属性进行规定.                              |
| relative   | 生成相对定位的元素,相对于其原来的位置进行定位.元素的位置通过 left、top、right、bottom 属性进行规定.元素原来位置保留                              |
| fixed      | 生成绝对定位的元素,指定元素相对于屏幕视⼝（viewport）的位置来指定元素位置.元素的位置在屏幕滚动时不会改变,⽐如回到顶部的按钮⼀般都是⽤此定位⽅式. |
| static     | 默认值,没有定位,元素出现在正常的文档流中,会忽略 top, bottom, left, right 或者 z-index 声明,块级元素从上往下纵向排布,⾏级元素从左向右排列.        |
| inherit    | 规定从父元素继承 position 属性的值                                                                                                               |

relative:元素的定位永远是相对于元素自身位置的,和其他元素没关系,也不会影响其他元素

fixed:元素的定位是相对于 window （或者 iframe）边界的,和其他元素没有关系.但是它具有破坏性,会导致其他元素位置的变化.

absolute:元素的定位相对于前两者要复杂许多.如果为 absolute 设置了 top、left,浏览器会递归查找该元素的所有父元素,如果找到一个设置了 position:relative/absolute/fixed 的元素,就以该元素为基准定位,如果没找到,就以浏览器边界定位.

### position:sticky

用法

-   position:sticky 被称为粘性定位元素（stickily positioned element）是计算后位置属性为 sticky 的元素.
-   简单的理解就是:在目标区域以内,它的行为就像 position:relative;在滑动过程中,某个元素距离其父元素的距离达到 sticky 粘性定位的要求时(比如 top:100px);position:sticky 这时的效果相当于 fixed 定位,固定到适当位置.
-   元素固定的相对偏移是**相对于离它最近的具有滚动框的祖先元素**,如果祖先元素都不可以滚动,那么是相对于 viewport 来计算元素的偏移量.

使用条件

-   父元素不能 overflow:hidden 或者 overflow:auto 属性.
-   必须指定 top、bottom、left、right4 个值之一,否则只会处于相对定位
-   父元素的高度不能低于 sticky 元素的高度
-   sticky 元素仅在其父元素内生效

### absolute 与 fixed

**共同点:**

-   改变行内元素的呈现方式,将 display 置为 inline-block
-   使元素脱离普通文档流,不再占据文档物理空间
-   覆盖非定位文档元素

**不同点:**

-   absolute 与 fixed 的根元素不同,absolute 的根元素可以设置,fixed 根元素是浏览器.
-   在有滚动条的页面中,absolute 会跟着父元素进行移动,fixed 固定在页面的具体位置.

## 7、flex 布局

### 容器

首先,实现 flex 布局需要先指定一个容器,任何一个容器都可以被指定为 flex 布局,这样容器内部的元素就可以使用 flex 来进行布局.

```css
/* 可以有两种取值 */
.container {
    display: flex | inline-flex;
}
```

> 需要注意的是:当时设置 flex 布局之后,子元素的 float、clear、vertical-align 的属性将会失效.

有下面六种属性可以设置在容器上,它们分别是:

1、flex-direction

2、flex-wrap

3、flex-flow

4、justify-content

5、align-items

6、align-content

#### flex-direction: 决定主轴的方向(即项目的排列方向)

```css
/* 
row:             主轴为水平方向,起点在左端.默认值
row-reverse:     主轴为水平方向,起点在右端
column:          主轴为垂直方向,起点在上沿
column-reverse:  主轴为垂直方向,起点在下沿
*/
.container {
    flex-direction: row | row-reverse | column | column-reverse;
}
```

#### flex-wrap: 决定容器内项目是否可换行

```css
/* 
默认情况下,项目都排在主轴线上,使用 flex-wrap 可实现项目的换行.
nowrap:       不换行, 默认值
wrap:         项目主轴总尺寸超出容器时换行,第一行在上方
wrap-reverse: 换行,第一行在下方
*/
.container {
    flex-wrap: nowrap | wrap | wrap-reverse;
}
```

#### flex-flow: flex-direction 和 flex-wrap 的简写形式

```css
/* 
默认值为: row nowrap(这里是分开的两个属性哦)
 */
.container {
    flex-flow: <flex-direction> || <flex-wrap>;
}
```

#### justify-content:定义了项目在主轴的对齐方式

```css
/* 
建立在主轴为水平方向时测试,即 flex-direction: row
flex-start      左对齐  默认值
flex-end        右对齐
center          居中
space-between   两端对齐,项目之间的间隔相等,即剩余空间等分成间隙.
space-around    每个项目两侧的间隔相等,所以项目之间的间隔比项目与边缘的间隔大一倍.
*/
.container {
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

#### align-items: 定义了项目在交叉轴上的对齐方式

```css
/* 
建立在主轴为水平方向时测试,即 flex-direction: row
stretch:    如果项目未设置高度或者设为 auto,将占满整个容器的高度.默认值
flex-start: 交叉轴的起点对齐
flex-end:   交叉轴的终点对齐
center:     交叉轴的中点对齐
baseline:   项目的第一行文字的基线对齐
*/
.container {
    align-items: flex-start | flex-end | center | baseline | stretch;
}
```

#### align-content: 定义了多根轴线的对齐方式,如果项目只有一根轴线,那么该属性将不起作用

```css
.container {
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

### 子容器

上述讲的是一个容器可以设置的属性,下面讲的是容器内的子容器

-   order 属性: order 越小，越往前排

-   flex-grow 属性: 定义子元素或者子容器的放大比例,默认为 0,即如果存在剩余空间,也不放大.

-   flex-shrink 属性: 定义了项目的缩小比例,默认为 1,即如果空间不足,该项目将缩小.

-   flex-basis 属性: 定义了在分配多余空间之前,项目占据的主轴空间（main size）.浏览器根据这个属性,计算主轴是否有多余空间.它的默认值为 auto,即项目的本来大小.

-   align-self 属性: 当前子容器在交叉轴对齐方式

### flex 简写

第一个数值是 flex-grow。赋值为正数的话是让元素增加所占空间。第二个数值是 flex-shrink 正数可以让它缩小所占空间，但是只有在 flex 元素总和超出主轴才会生效。最后一个数值是 flex-basis；flex 元素是在这个基准值的基础上缩放的。

flex 简写属性在下面有三个值的定义 默认值为 0 1 auto;

-   flex-grow : 定义项目的放大比例,默认为 0

-   flex-shrink : 定义项目的缩小比例,默认为 1

-   flex-basis : 定义项目在分配多余的空间之前,项目占据的主轴空间。默认为 auto（item 本来大小）,如果设置为具体值，优先级大于元素本身设置的宽度。

#### flex: initial

flex: initial 是把 flex 元素重置为 Flexbox 的初始值，它相当于 flex: 0 1 auto。

在这里 flex-grow 的值为 0，所以 flex 元素不会超过它们 flex-basis 的尺寸。flex-shrink 的值为 1, 所以可以缩小 flex 元素来防止它们溢出。flex-basis 的值为 auto. Flex 元素尺寸可以是在主维度上设置的，也可以是根据内容自动得到的。

#### flex:\<positive-number>

完整形式:flex:1 = flex: \<positive-number> 1 0;

-   flex:1 在父元素尺寸不足的时候,会优先最小化内容尺寸.
-   使用场景:当我们希望元素可以充分的利用剩余的空间,同时不会很多的占用其他同级元素的空间的时候使用.
-   flex:0 通常表现为内容最小化宽度
-   使用场景:当希望元素 item 占用最小化的内容宽度的时候

#### flex:auto

flex: auto 等同于 flex: 1 1 auto，flex 元素在需要的时候既可以拉伸也可以收缩。

flex:auto 在父元素尺寸不足的时候,会优先最大化内容尺寸.使用场景:当我们希望元素充分的使用剩余的空间,各自元素按照各自内容进行分配的时候使用.

#### flex: none

flex: none 可以把 flex 元素设置为不可伸缩。它和设置为 flex: 0 0 auto 是一样的。

元素既不能拉伸或者收缩，但是元素会按具有 flex-basis: auto 属性的 flexbox 进行布局。

## 8、display 和 visibility

## 9、高度塌缩

在浮动布局中,父元素默认是被子元素撑开的,当子元素浮动后,其会完全脱离文档流,子元素从文档流中脱离,将会无法撑起父元素的高度,导致父元素的高度丢失,父元素高度丢失后,其下的元素会自动上移,导致页面布局混乱,所以高度塌陷是比较常见的问题.

**解决办法:**

1.  BFC

    BFC（Block Formatting Context）块级格式化环境

    BFC 是 CSS 中的一个隐藏属性,可以为一个元素开启 BFC;开启 BFC 该元素就是一个独立布局区域

    元素开启 BFC 后的特点:

    -   开启 BFC 的元素不会被浮动元素覆盖

    -   开启 BFC 的元素子元素和父元素的外边距不会重叠
    -   开启 BFC 的元素可以包含浮动的元素

    需要通过一些特殊方式开启元素 BFC:

    -   设置元素的浮动 （不推荐）. `float: left;`
    -   将元素设置为行内块元素 （不推荐）. `display: inline-block;`
    -   将元素 overflow 设置为一个非 visible 的值,常见方式为元素设置 overflow:hidden 开启其 BFC,以使其可以包含浮动的元素. `overflow: auto;`

    第一种方式设置父元素浮动使父元素也脱离了文档流;第二种一般不采用设置行内块元素的方式;第三种可以使父元素保持块元素特点,同时宽高由子元素撑开.

2.  使用 clear 解决

设置清除浮动以后,浏览器会自动为元素添加一个上外边距以使其位置不受其他元素影响
添加 `clear: both;` 清除浮动元素对当前元素所产生的影响

3. 通过 HTML 的方式来影响 CSS 样式

可以通过设置一个 div（与浮动元素同一级）,给他设置`clear:both`来撑开父元素的空间,这样父元素的空间就会随着子元素宽高的变化而变化,不受浮动影响;

4. 最终解决方案

css 样式里在 box 的后面用 content 添加一个空元素,并设置为块元素,clear:both.

在父级元素添加 class=“clearfix”,样式如下:

```css
.clearfix::before,
.clearfix::after {
    content: '';
    display: table;
    clear: both;
}
```

## 10、margin 重叠问题

**问题描述:**

两个块级元素的上外边距和下外边距可能会合并（折叠）为一个外边距,其大小会取其中外边距值大的那个,这种行为就是外边距折叠.需要注意的是,**浮动的元素和绝对定位**这种脱离文档流的元素的外边距不会折叠.重叠只会出现在**垂直方向**.

下面代码效果:
box1 和 box2 都有上边距 100px,相对位置没有变化.和预期效果（子元素 div.box2 会从左上角移动到父元素 div.box1 的左下角,父元素位置不变）不同

```html
<style>
    .box1 {
        width: 200px;
        height: 200px;
        background-color: saddlebrown;
    }
    .box2 {
        width: 100px;
        height: 100px;
        background-color: sandybrown;
        margin-top: 100px;
    }
</style>

<body>
    <div class="box1">
        <div class="box2"></div>
    </div>
</body>
```

**计算原则:**

折叠合并后外边距的计算原则如下:

-   如果两者都是正数,那么就去最大者
-   如果是一正一负,就会正值减去负值的绝对值
-   两个都是负值时,用 0 减去两个中绝对值大的那个

**解决办法:**

对于折叠的情况,主要有两种:**兄弟之间重叠**和**父子之间重叠**

（1）兄弟之间重叠

-   底部元素变为行内盒子:`display: inline-block`
-   底部元素设置浮动:`float`
-   底部元素的 position 的值为`absolute/fixed`

（2）父子之间重叠

-   父元素加入:`overflow: hidden`
-   父元素添加透明边框:`border:1px solid transparent`
-   子元素变为行内盒子:`display: inline-block`
-   子元素加入浮动属性或定位

## 11、BFC 块级格式化上下文

BFC 是一个独立的区域,它内部的元素都依照它的规则渲染,并且不会与 BFC 外部打交道.

**以下方式会创建 BFC:**

-   根元素或包含根元素的元素
-   浮动元素（元素的 float 不是 none）
-   绝对定位元素（元素的 position 为 absolute 或 fixed）
-   行内块元素（元素的 display 为 inline-block）
-   表格单元格（元素的 display 为 table-cell,HTML 表格单元格默认为该值）
-   表格标题（元素的 display 为 table-caption,HTML 表格标题默认为该值）
-   匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
-   overflow 值不为 visible 的块元素
-   display 值为 flow-root 的元素
-   contain 值为 layout、content 或 strict 的元素
-   弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
-   网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
-   多列容器（元素的 column-count 或 column-width 不为 auto,包括 column-count 为 1）
-   column-span 为 all 的元素始终会创建一个新的 BFC,即使该元素没有包裹在一个多列容器中

当一个元素设置了新的 BFC 后,就和这个元素外部的 BFC 没有关系了,这个元素只会去约束自己内部的子元素.

**BFC 的布局规则例如以下:**

-   内部的盒子会在垂直方向,一个个地放置;
-   盒子垂直方向的距离由 margin 决定,属于同一个 BFC 的两个相邻 Box 的上下 margin 会发生重叠;
-   每一个元素的左边,与包含块的左边相接触（对于从右往左的布局,则相反）,即使存在浮动也是如此;
-   BFC 的区域不会与 float 重叠;
-   BFC 就是页面上的一个隔离的独立容器,容器里面的子元素不会影响到外面的元素.反之也如此;
-   计算 BFC 的高度时,浮动元素也參与计算.

## 12、脱离文档流

将窗体自上而下分成一行一行,并在每行中按从左至右依次排放元素,称为文档流,也称为普通流.
这个应该不难理解,HTML 中全部元素都是盒模型,盒模型占用一定的空间,依次排放在 HTML 中,形成了文档流.

元素脱离文档流之后,将不再在文档流中占据空间,而是处于浮动状态（可以理解为漂浮在文档流的上方）.脱离文档流的元素的定位基于正常的文档流,当一个元素脱离文档流后,依然在文档流中的其他元素将忽略该元素并填补其原先的空间.

**脱离文档流方法:**

-   float
-   absolute
-   fixed

## 13、隐藏元素

-   display: none:渲染树不会包含该渲染对象,因此该元素不会在页面中占据位置,也不会响应绑定的监听事件.
-   visibility: hidden:元素在页面中仍占据空间,但是不会响应绑定的监听事件.
-   opacity: 0:将元素的透明度设置为 0,以此来实现元素的隐藏.元素在页面中仍然占据空间,并且能够响应元素绑定的监听事件.
-   position: absolute:通过使用绝对定位将元素移除可视区域内,以此来实现元素的隐藏.
-   z-index: 负值:来使其他元素遮盖住该元素,以此来实现隐藏.
-   clip/clip-path :使用元素裁剪的方法来实现元素的隐藏,这种方法下,元素仍在页面中占据位置,但是不会响应绑定的监听事件.
-   transform: scale(0,0):将元素缩放为 0,来实现元素的隐藏.这种方法下,元素仍在页面中占据位置,但是不会响应绑定的监听事件.

## 14、z-index 失效

## 15、响应式布局

## 16、px rem em vw vh

-   px 是固定的像素,一旦设置了就无法因为适应页面大小而改变.
-   em 和 rem 相对于 px 更具有灵活性,他们是相对长度单位,其长度不是固定的,更适用于响应式布局.
-   em 是相对于其父元素来设置字体大小,这样就会存在一个问题,进行任何元素设置,都有可能需要知道他父元素的大小.而 rem 是相对于根元素,这样就意味着,只需要在根元素确定一个参考值.
-   vw/vh\*\*是与视图窗口有关的单位,vw 表示相对于视图窗口的宽度,vh 表示相对于视图窗口高度,除了 vw 和 vh 外,还有 vmin 和 vmax 两个相关的单位.

## 17、CSS 可继承与不可继承属性

一、无继承性的属性

1. display:规定元素应该生成的框的类型
2. 文本属性:

-   vertical-align:垂直文本对齐
-   text-decoration:规定添加到文本的装饰
-   text-shadow:文本阴影效果
-   white-space:空白符的处理
-   unicode-bidi:设置文本的方向

3. 盒子模型的属性:width、height、margin、border、padding
4. 背景属性:background、background-color、background-image、background-repeat、background-position、background-attachment
5. 定位属性:float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
6. 生成内容属性:content、counter-reset、counter-increment
7. 轮廓样式属性:outline-style、outline-width、outline-color、outline
8. 页面样式属性:size、page-break-before、page-break-after
9. 声音样式属性:pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

二、有继承性的属性

1. 字体系列属性

-   font-family:字体系列
-   font-weight:字体的粗细
-   font-size:字体的大小
-   font-style:字体的风格

2. 文本系列属性

-   text-indent:文本缩进
-   text-align:文本水平对齐
-   line-height:行高
-   word-spacing:单词之间的间距
-   letter-spacing:中文或者字母之间的间距
-   text-transform:控制文本大小写（就是 uppercase、lowercase、capitalize 这三个）
-   color:文本颜色

3. 元素可见性

-   visibility:控制元素显示隐藏

4. 列表布局属性

-   list-style:列表风格,包括 list-style-type、list-style-image 等

5. 光标属性

-   cursor:光标显示为何种形态

## 18、link 和 @import

两者都是外部引用 CSS 的方式,它们的区别如下:

-   link 是 XHTML 标签,除了加载 CSS 外,还可以定义 RSS 等其他事务;@import 属于 CSS 范畴,只能加载 CSS.
-   link 引用 CSS 时,在页面载入时同时加载;@import 需要页面网页完全载入以后加载.
-   link 是 XHTML 标签,无兼容问题;@import 是在 CSS2.1 提出的,低版本的浏览器不支持.
-   link 支持使用 Javascript 控制 DOM 去改变样式;而@import 不支持.

## 19、CSS 动画

-   transition 是过渡属性,强调过度,它的实现需要触发一个事件（比如鼠标移动上去,焦点,点击等）才执行动画.它类似于 flash 的补间动画,设置一个开始关键帧,一个结束关键帧.
-   animation 是动画属性,它的实现不需要触发事件,设定好时间之后可以自己执行,且可以循环一个动画.它也类似于 flash 的补间动画,但是它可以设置多个关键帧（用@keyframe 定义）完成动画.

## 常见布局实现

### 两栏布局

#### float+margin

```html
<style>
    .box {
        height: 200px;
        background: #ccc;
    }
    .left {
        width: 200px;
        float: left;
        background: tomato;
        height: 100%;
    }
    .right {
        margin-left: 200px;
        width: auto;
        height: 100%;
        background: gold;
    }
</style>

<div class="box">
    <div class="left"></div>
    <div class="right"></div>
</div>
```

#### float+overflow

```html
<style>
    .box {
        height: 200px;
        background: #ccc;
    }
    .left {
        width: 200px;
        float: left;
        background: tomato;
        height: 100%;
    }
    .right {
        overflow: hidden;
        background: gold;
        height: 100%;
    }
</style>

<div class="box">
    <div class="left"></div>
    <div class="right"></div>
</div>
```

#### flex

```html
<style>
    .box {
        display: flex;
        height: 200px;
        background: #ccc;
    }
    .left {
        width: 200px;
        background: tomato;
    }
    .right {
        flex: 1;
        background: gold;
    }
</style>

<div class="box">
    <div class="left"></div>
    <div class="right"></div>
</div>
```

### 三栏布局

### 九宫格布局

## CSS 实现简单图形
