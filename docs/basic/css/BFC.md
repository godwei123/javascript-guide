# BFC

## 高度塌缩

在浮动布局中,父元素默认是被子元素撑开的,当子元素浮动后,其会完全脱离文档流,子元素从文档流中脱离,将会无法撑起父元素的高度,导致父元素的高度丢失,父元素高度丢失后,其下的元素会自动上移,导致页面布局混乱,所以高度塌陷是比较常见的问题.

**解决办法:**

1. BFC

   BFC（Block Formatting Context）块级格式化环境

   BFC 是 CSS 中的一个隐藏属性,可以为一个元素开启 BFC;开启 BFC 该元素就是一个独立布局区域

   元素开启 BFC 后的特点:

   - 开启 BFC 的元素不会被浮动元素覆盖

   - 开启 BFC 的元素子元素和父元素的外边距不会重叠
   - 开启 BFC 的元素可以包含浮动的元素

   需要通过一些特殊方式开启元素 BFC:

   - 设置元素的浮动 （不推荐）. `float: left;`
   - 将元素设置为行内块元素 （不推荐）. `display: inline-block;`
   - 将元素 overflow 设置为一个非 visible 的值,常见方式为元素设置 overflow:hidden 开启其
     BFC,以使其可以包含浮动的元素. `overflow: auto;`

   第一种方式设置父元素浮动使父元素也脱离了文档流;第二种一般不采用设置行内块元素的方式;第三种可以使父元素保持块元素特点,同时宽高由子元素撑开.

2. 使用 clear 解决

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
  content: "";
  display: table;
  clear: both;
}
```

## margin 重叠问题

**问题描述:**

两个块级元素的上外边距和下外边距可能会合并（折叠）为一个外边距,其大小会取其中外边距值大的那个,这种行为就是外边距折叠.需要注意的是,**浮动的元素和绝对定位**这种脱离文档流的元素的外边距不会折叠.重叠只会出现在**垂直方向**.

下面代码效果:
box1 和 box2 都有上边距 100px,相对位置没有变化.和预期效果（子元素 div.box2 会从左上角移动到父元素 div.box1
的左下角,父元素位置不变）不同

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

- 如果两者都是正数,那么就去最大者
- 如果是一正一负,就会正值减去负值的绝对值
- 两个都是负值时,用 0 减去两个中绝对值大的那个

**解决办法:**

对于折叠的情况,主要有两种:**兄弟之间重叠**和**父子之间重叠**

（1）兄弟之间重叠

- 底部元素变为行内盒子:`display: inline-block`
- 底部元素设置浮动:`float`
- 底部元素的 position 的值为`absolute/fixed`

（2）父子之间重叠

- 父元素加入:`overflow: hidden`
- 父元素添加透明边框:`border:1px solid transparent`
- 子元素变为行内盒子:`display: inline-block`
- 子元素加入浮动属性或定位

## BFC 块级格式化上下文

https://juejin.cn/post/6844904169875177479

BFC 是一个独立的区域,它内部的元素都依照它的规则渲染,并且不会与 BFC 外部打交道.

**以下方式会创建 BFC:**

- 根元素或包含根元素的元素
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell,HTML 表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption,HTML 表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是
  HTML
  table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout、content 或 strict 的元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto,包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的 BFC,即使该元素没有包裹在一个多列容器中

当一个元素设置了新的 BFC 后,就和这个元素外部的 BFC 没有关系了,这个元素只会去约束自己内部的子元素.

**BFC 的布局规则例如以下:**

- 内部的盒子会在垂直方向,一个个地放置;
- 盒子垂直方向的距离由 margin 决定,属于同一个 BFC 的两个相邻 Box 的上下 margin 会发生重叠;
- 每一个元素的左边,与包含块的左边相接触（对于从右往左的布局,则相反）,即使存在浮动也是如此;
- BFC 的区域不会与 float 重叠;
- BFC 就是页面上的一个隔离的独立容器,容器里面的子元素不会影响到外面的元素.反之也如此;
- 计算 BFC 的高度时,浮动元素也參与计算.

**应用场景**

**1.防止浮动元素高度塌陷**

不适用 BFC 情况下，子元素使用浮动，父元素高度会塌陷

**2.避免外边距折叠**

当 2 个 box 在同一个 BFC 容器内，同时使用 margin 会引起外边距重合

**3.自适应两栏布局**

根据规则 BFC 的区域不会与浮动元素的 box 重叠，可以实现自适应两栏布局
