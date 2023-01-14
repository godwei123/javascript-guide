# CSS interview

## 1、CSS 的权重和优先级

从 0 开始，一个行内样式+1000，一个 id 选择器+100，一个属性选择器、class 或者伪类+10，一个元素选择器，或者伪元素+1，通配符+0

- 权重相同，写在后面的覆盖前面的
- 使用 `!important` 达到最大优先级，都使用 `!important` 时，权重大的优先级高

## 2、CSS 盒模型

CSS3 中的盒模型有以下两种：标准盒子模型、IE 盒子模型

盒模型都是由四个部分组成的,分别是 margin、border、padding 和 content.

![标准盒子模型](../public/20200715170108916.png)

![IE盒子模型](../public/20200715170121834.png)

标准盒模型和 IE 盒模型的区别在于设置 width 和 height 时,所对应的范围不同:

- 标准盒模型的 width 和 height 属性的范围只包含了 content,
- IE 盒模型的 width 和 height 属性的范围包含了 border、padding 和 content.

可以通过修改元素的 box-sizing 属性来改变元素的盒模型:

- box-sizing: content-box 表示标准盒模型（默认值）， `content-box` 是默认值。如果你设置一个元素的宽为 100px，那么这个元素的内容区会有 100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
- box-sizing: border-box 表示 IE 盒模型（怪异盒模型），设置的边框和内边距的值是包含在 width 内的。也就是说，如果你将一个元素的 width 设为 100px，那么这 100px 会包含它的 border 和 padding，内容区的实际宽度是 width 减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。

## 3、block、inline 和 inline-block

(1) block，会独占一行，多个元素会另起一行，可以设置 width、height、margin 和 padding 属性；

(2) inline，元素不会独占一行，设置 width、height 属性无效，但可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin；

(3) inline-block，将对象设置为 inline 对象，但对象的内容作为 block 对象呈现之后的内联对象会被排列在同一行内。

## 4、清除浮动

不清除浮动会发生高度塌陷：浮动元素父元素高度自适应（父元素不写高度时，子元素写了浮动后，父元素会发生高度塌陷）

- clear 清除浮动（添加空 div 法）在浮动元素下方添加空 div,并给该元素写 css 样式：`{clear:both;height:0;overflow:hidden;}`
- 给浮动元素父级设置高度
- 父级同时浮动（需要给父级同级元素添加浮动）
- 父级设置成 inline-block，其 margin: 0 auto 居中方式失效
- 给父级添加 overflow:hidden 清除浮动方法
- 万能清除法 after 伪类 清浮动（现在主流方法，推荐使用）

```css
.float_div:after {
  content: ".";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
.float_div {
  zoom: 1;
}
```

## 5、隐藏一个元素方法

- visibility
- display
- z-index
- opacity
- transform
- position

## 6、visibility 、opacity 和 display 的差别

- visibility 设置 hidden 会隐藏元素，但是其位置还存在与页面文档流中，不会被删除，所以会触发浏览器渲染引擎的重绘
- display 设置了 none 属性会隐藏元素，且其位置也不会被保留下来，所以会触发浏览器渲染引擎的回流和重绘。
- opacity 会将元素设置为透明，但是其位置也在页面文档流中，不会被删除，所以会触发浏览器渲染引擎的重绘

## 7、BFC 与 IFC 区别

BFC 是块级格式上下文，IFC 是行内格式上下文：

- 内部的 Box 会水平放置
- 水平的间距由 margin，padding，border 决定

参考链接：

- https://juejin.im/entry/5938daf7a0bb9f006b2295db
- https://zhuanlan.zhihu.com/p/74817089

## 8、BFC 会与 float 元素相互覆盖吗

不会，因为 BFC 是页面中一个独立的隔离容器，其内部的元素不会与外部的元素相互影响，比如两个 div，上面的 div 设置了 float，那么如果下面的元素不是 BFC，也没有设置 float，会形成对上面的元素进行包裹内容的情况，如果设置了下面元素为 overflow：hidden；属性那么就能够实现经典的两列布局，左边内容固定宽度，右边因为是 BFC 所以会进行自适应。

- https://zhuanlan.zhihu.com/p/25321647

## 9、什么是 BFC

BFC（Block Formatting Context）格式化上下文，是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。

### 形成 BFC 的条件

五种：

- 浮动元素，float 除 none 以外的值
- 定位元素，position（absolute，fixed）
- display 为以下其中之一的值 inline-block，table-cell，table-caption
- overflow 除了 visible 以外的值（hidden，auto，scroll）
- HTML 就是一个 BFC

BFC 的特性：

- 内部的 Box 会在垂直方向上一个接一个的放置。
- 垂直方向上的距离由 margin 决定
- bfc 的区域不会与 float 的元素区域重叠。
- 计算 bfc 的高度时，浮动元素也参与计算
- bfc 就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。

## 10、position 属性

## 11、两个 div 上下排列，都设 margin，有什么现象？

- 都正取大
- 一正一负相加

问：为什么会有这种现象？你能解释一下吗

是由块级格式上下文决定的，BFC，元素在 BFC 中会进行上下排列，然后垂直距离由 margin 决定，并且会发生重叠，具体表现为同正取最大的，同负取绝对值最大的，一正一负，相加

BFC 是页面中一个独立的隔离容器，内部的子元素不会影响到外部的元素。

## 12、CSS 可继承与不可继承属性

一、无继承性的属性

1. display:规定元素应该生成的框的类型
2. 文本属性:

- vertical-align:垂直文本对齐
- text-decoration:规定添加到文本的装饰
- text-shadow:文本阴影效果
- white-space:空白符的处理
- unicode-bidi:设置文本的方向

3. 盒子模型的属性:width、height、margin、border、padding
4. 背景属性:background、background-color、background-image、background-repeat、background-position、background-attachment
5. 定位属性:float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
6. 生成内容属性:content、counter-reset、counter-increment
7. 轮廓样式属性:outline-style、outline-width、outline-color、outline
8. 页面样式属性:size、page-break-before、page-break-after
9. 声音样式属性:pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

二、有继承性的属性

1. 字体系列属性

- font-family:字体系列
- font-weight:字体的粗细
- font-size:字体的大小
- font-style:字体的风格

2. 文本系列属性

- text-indent:文本缩进
- text-align:文本水平对齐
- line-height:行高
- word-spacing:单词之间的间距
- letter-spacing:中文或者字母之间的间距
- text-transform:控制文本大小写（就是 uppercase、lowercase、capitalize 这三个）
- color:文本颜色

3. 元素可见性

- visibility:控制元素显示隐藏

4. 列表布局属性

- list-style:列表风格,包括 list-style-type、list-style-image 等

5. 光标属性

- cursor:光标显示为何种形态

## 13、link 和 @import

两者都是外部引用 CSS 的方式,它们的区别如下:

- link 是 XHTML 标签,除了加载 CSS 外,还可以定义 RSS 等其他事务;@import 属于 CSS 范畴,只能加载 CSS.
- link 引用 CSS 时,在页面载入时同时加载;@import 需要页面网页完全载入以后加载.
- link 是 XHTML 标签,无兼容问题;@import 是在 CSS2.1 提出的,低版本的浏览器不支持.
- link 支持使用 Javascript 控制 DOM 去改变样式;而@import 不支持.

## 14、line-height

line-height 是相对于元素自身的字体大小来取值，但同时会被继承。

父元素: fontSize: 18px; lineHeight: 1.5em(27px，150% 同理); 它的 lineHeight 计算下来为 27px，会被子元素继承。

子元素: fontSize: 30px，子元素的 lineHeight 被继承为 27px，出现问题

某元素的 fontSize: 2rem; lineHeight: 1.5em; 此时 lineHeight 为多少像素？
fontSize = 2 _ 16 = 32px
lineHeight = 1.5 _ 32 = 48px

## 15、vertical-align

只能应用于内联元素以及 display 值为 table-cell 的元素。在 css 中，有些 css 属性是会改变元素的 display 值的，例如 float 和
position: absolute，一旦设置了这两个属性之一，元素的 display 值就是变为 block，因此，vertical-align 也就失去了作用。

1.vertical-align 必须对子元素设置，不是对父元素设置 2.必须设置 line-height，不然不会起作用
3.vertical-align 只对 inline-block 元素有效

## 16、CSS 绘制一个三角形

```css
.box {
  width: 0;
  height: 0;
  border-top: 10px solid #ccc;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
```

## 17、谷歌浏览器怎么设置小于 12px 的字体

- 使用 Webkit 的内核的-webkit-text-size-adjust 的私有 CSS 属性来解决，只要加了`-webkit-text-size-adjust:none`
  ;字体大小就不受限制了。但是 chrome 更新到 27 版本之后就不可以用了。所以高版本 chrome 谷歌浏览器已经不再支持-webkit-text-size-adjust
  样式，所以要使用时候慎用。
- 使用 css3 的 transform 缩放属性-webkit-transform:scale(0.5); 注意-webkit-transform:scale(0.75)
  ;收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用 display：block/inline-block/...；
- 使用图片：如果是内容固定不变情况下，使用将小于 12px 文字内容切出做图片，这样不影响兼容也不影响美观。

### 1px 问题

> 设备像素(物理像素)、设备独立像素(逻辑像素)、CSS 像素

设备像素比的概念（ `devicePixelRatio` 简称 dpr）。它用来描述屏幕物理像素与逻辑像素的比值。

**CSS 中的 1px 并不等于设备的 1px**

对于前端来说，在高清屏出现之前，前端代码的 `1px` 即等于手机物理像素点的 `1px`。但有了 dpr 的概念之后，由于前端代码中的使用的是
CSS 像素，手机会根据 dpr 换算成实际的物理像素大小来渲染页面。比如 iPhone6
的设备像素比 `dpr = 2` ，相当于一个 CSS 像素等于两个物理像素，即 `1px` 由 2 个物理像素点组成。

那么问题来了，以 iPhone6 为例，其 `dpr = 2`、屏幕尺寸(CSS 像素) 为 `375x667`，一般设计稿提供 2 倍图尺寸为 `750x1334`
。那么设计稿中的 `1px`，对应屏幕尺寸其实应该写成 `0.5px`
。再由 dpr 计算公式可知，`0.5 * 2 = 1px` 物理像素。

**其实设计稿本质上要实现的是 CSS 像素的 ！**

小数点像素 0.5px 的兼容性问题

PC 端浏览器的最小识别像素为 `1px`。

> 简单来说，rem 布局实现移动端适配的思想是，由于 rem 单位是根据页面根元素的 `fontSize` 来计算的，那么将 `fontSize`
> 设置成屏幕宽度 `clientWidth` 与设计稿宽度 `750`
> 的比值，那么我们按照设计稿的尺寸来重构页面的时候，使用 rem 单位即自动乘以 `fontSize` 计算出了适配不同屏幕的尺寸。

```javascript
// 以750设计稿为例，计算rem font-size
let clientWidth =
  document.documentElement.clientWidth || document.body.clientWidth;
let ft = (clientWidth / 7.5).toFixed(2);
// 设置页面根字号大小
document.documentElement.style.fontSize = ft + "px";
```

#### 如何实现 1px 的效果？

1px 问题指的是：在一些 `Retina屏幕` 的机型上，移动端页面的 1px 会变得很粗，呈现出不止 1px 的效果。原因很简单——CSS 中的 1px
并不能和移动设备上的 1px 划等号。它们之间的比例关系有一个专门的属性来描述：

```html
window.devicePixelRatio = 设备的物理像素 / CSS像素。
```

打开 Chrome 浏览器，启动移动端调试模式，在控制台去输出这个 `devicePixelRatio` 的值。这里选中 iPhone6/7/8 这系列的机型，输出的结果就是
2

这就意味着设置的 1px CSS 像素，在这个设备上实际会用 2 个物理像素单元来进行渲染，所以实际看到的一定会比 1px 粗一些。

#### 思路一：直接写 0.5px

如果之前 1px 的样式这样写：

```css
.box {
  border: 1px solid #333;
}
```

可以先在 JS 中拿到 window.devicePixelRatio 的值，然后把这个值通过 JSX 或者模板语法给到 CSS 的 data 里，达到这样的效果（这里用
JSX 语法做示范）：

```html
<div id="container" data-device="{{" window.devicePixelRatio }}></div>
```

然后就可以在 CSS 中用属性选择器来命中 devicePixelRatio 为某一值的情况，比如说这里尝试命中 devicePixelRatio 为 2 的情况：

```css
#container[data-device="2"] {
  border: 0.5px solid #333;
}
```

直接把 1px 改成 1/devicePixelRatio 后的值，这是目前为止最简单的一种方法。这种方法的缺陷在于兼容性不行，IOS 系统需要 8
及以上的版本，安卓系统则直接不兼容。

#### 思路二：伪元素先放大后缩小

这个方法的可行性会更高，兼容性也更好。唯一的缺点是代码会变多。

思路是**先放大、后缩小：\*\***在目标元素的后面追加一个 ::after 伪元素，让这个元素布局为 absolute
之后、整个伸展开铺在目标元素上，然后把它的宽和高都设置为目标元素的两倍，border 值设为 1px。接着借助 CSS
动画特效中的放缩能力，把整个伪元素缩小为原来的 50%。此时，伪元素的宽高刚好可以和原有的目标元素对齐，而 border 也缩小为了 1px
的二分之一，间接地实现了 0.5px 的效果。

代码如下：

```css
#container[data-device="2"] {
    position: relative;
}

#container[data-device="2"]::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    content: "";
    transform: scale(0.5);
    transform-origin: left top;
    box-sizing: border-box;
    border: 1px solid #333;
}


/* 通过伪元素实现*/

.border::after {
    content: "";
    box-sizing: border-box;
/*/ / 为了与原元素等大 */
position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    border: 1px solid gray;
    transform: scale(0.5);
    transform-origin: 0 0;
}

/*通过伪元素实现*/
.line::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 1px;
    background: #b3b4b8;
    transform: scale(0.5);
    transform-origin: 0 0;
}

/*dpr适配可以这样写*/

@media (-webkit-min-device-pixel-ratio: 2) {
    .line::after {
    . . . height: 1 px;
        transform: scale(0.5);
        transform-origin: 0 0;
    }
}

@media (-webkit-min-device-pixel-ratio: 3) {
    .line::after {
    . . . height: 1 px;
        transform: scale(0.333);
        transform-origin: 0 0;
    }
}

```

#### 思路三：viewport 缩放来解决

这个思路就是对 meta 标签里几个关键属性下手：

```html
<meta
  name="viewport"
  content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"
/>
```

这里针对像素比为 2 的页面，把整个页面缩放为了原来的 1/2 大小。这样，本来占用 2 个物理像素的 1px
样式，现在占用的就是标准的一个物理像素。根据像素比的不同，这个缩放比例可以被计算为不同的值，用 js 代码实现如下：

```javascript
const scale = 1 / window.devicePixelRatio;
// 这里 metaEl 指的是 meta 标签对应的 Dom
metaEl.setAttribute(
  "content",
  `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`
);
```

这样解决了，但这样做的副作用也很大，整个页面被缩放了。这时 1px
已经被处理成物理像素大小，这样的大小在手机上显示边框很合适。但是，一些原本不需要被缩小的内容，比如文字、图片等，也被无差别缩小掉了。

## 18、CSS 实现自适应正方形、等宽高比矩形

> - width 设置百分比
> - padding 撑高
> - 如果只是要相对于 body 而言的话，还可以使用 vw 和 vh
> - 伪元素设置 `margin-top: 100%`撑高

### 双重嵌套，外层 relative，内层 absolute

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .outer {
        padding-top: 50%;
        height: 0;
        background: #ccc;
        width: 50%;
        position: relative;
      }

      .inner {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: blue;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="inner">hello</div>
    </div>
  </body>
</html>
```

### padding 撑高画正方形

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .outer {
        width: 400px;
        height: 600px;
        background: blue;
      }

      .inner {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        background: red;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="inner"></div>
    </div>
  </body>
</html>
```

### 相对于视口 VW VH

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .inner {
        width: 1vw;
        height: 1vw;
        background: blue;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="inner"></div>
    </div>
  </body>
</html>
```

### 伪元素设置 margin-top

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .inner {
        width: 100px;
        overflow: hidden;
        background: blue;
      }

      .inner::after {
        content: "";
        margin-top: 100%;
        display: block;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="inner"></div>
    </div>
  </body>
</html>
```

### 参考链接

- http://www.fly63.com/article/detial/2104

## 19、问：实现两栏布局的方式：

### 左 float，然后右 margin-left（右边自适应）

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        height: 500px;
      }

      .aside {
        width: 300px;
        float: left;
        background: yellow;
      }

      .main {
        background: aqua;
        margin-left: 300px;
      }
    </style>
  </head>
  <body>
    <div class="aside"></div>
    <div class="main"></div>
  </body>
</html>
```

### 右 float，margin-right

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        height: 500px;
      }

      .aside {
        width: 300px;
        float: right;
        background: yellow;
      }

      .main {
        background: aqua;
        margin-right: 300px;
      }
    </style>
  </head>
  <body>
    <div class="aside"></div>
    <div class="main"></div>
  </body>
</html>
```

### BFC + float

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        height: 500px;
      }

      .aside {
        width: 300px;
        float: left;
        background: yellow;
      }

      .main {
        overflow: hidden;
        background: aqua;
      }
    </style>
  </head>
  <body>
    <div class="aside"></div>
    <div class="main"></div>
  </body>
</html>
```

### float + 负 margin

```
<head>
  <style>
    .left {
      width: 100%;
      float: left;
      background: #f00;
      margin-right: -200px;
    }

    .right {
      float: left;
      width: 200px;
      background: #0f0;
    }
  </style>
</head>

<div class="left"><p>hello</p></div>
<div class="right"><p>world</p></div>
```

### 圣杯布局实现两栏布局

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* div {
        height: 500px;
      } */

      /* .box {
        overflow: hidden;
      } */

      /* .container {
        padding: 0 300px 0 200px;
        border: 1px solid black;
      } */

      html,
      body {
        height: 100%;
      }

      div {
        height: 100%;
      }

      .container {
        display: flex;
      }

      .content {
        flex: 1 1;
        order: 2;
        background: #f00;
      }

      .left {
        float: left;
        width: 100%;
        background: #0f0;
      }

      .right {
        float: left;
        width: 300px;
        margin-left: -300px;
        background: #00f;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left">你好</div>
      <div class="right">我好</div>
    </div>
  </body>
</html>
```

### flex 实现两栏布局

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* div {
        height: 500px;
      } */

      /* .box {
        overflow: hidden;
      } */

      /* .container {
        padding: 0 300px 0 200px;
        border: 1px solid black;
      } */

      html,
      body {
        height: 100%;
      }

      div {
        height: 100%;
      }

      .container {
        display: flex;
      }

      .content {
        flex: 1 1;
        order: 2;
        background: #f00;
      }

      .left {
        flex: 0 0 200px;
        background: #0f0;
      }

      .right {
        flex: 1 1;
        background: #00f;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left">你好</div>
      <div class="right">我好</div>
    </div>
  </body>
</html>
```

参考链接：https://juejin.im/post/5e8d5268f265da480f0f9c6e#heading-8

### position + margin

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* div {
        height: 500px;
      } */

      /* .box {
        overflow: hidden;
      } */

      /* .container {
        padding: 0 300px 0 200px;
        border: 1px solid black;
      } */

      html,
      body {
        height: 100%;
      }

      div {
        height: 100%;
      }

      .container {
        display: flex;
        position: relative;
      }

      .content {
        flex: 1 1;
        order: 2;
        background: #f00;
      }

      .left {
        position: absolute;
        width: 300px;
        background: #0f0;
      }

      .right {
        width: 100%;
        margin-left: 300px;
        background: #00f;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left">你好</div>
      <div class="right">我好</div>
    </div>
  </body>
</html>
```

## 20、实现三列布局的方式

### position + margin-left + margin-right

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        height: 500px;
      }

      .box {
        position: relative;
      }

      .left {
        position: absolute;
        left: 0;
        top: 0;
        width: 200px;
        background: green;
      }

      .right {
        position: absolute;
        right: 0;
        top: 0;
        width: 200px;
        background: red;
      }

      .middle {
        margin-left: 200px;
        margin-right: 200px;
        background: black;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="left"></div>
      <div class="middle"></div>
      <div class="right"></div>
    </div>
  </body>
</html>
```

### 通过 float + margin

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        height: 500px;
      }

      .left {
        float: left;
        width: 200px;
        height: 200px;
        background: green;
      }

      .right {
        float: right;
        width: 200px;
        height: 200px;
        background: red;
      }

      .middle {
        margin-left: 210px;
        margin-right: 210px;
        background: black;
        height: 200px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="left"></div>
      <div class="right"></div>
      <div class="middle"></div>
    </div>
  </body>
</html>
```

### 圣杯布局

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .container {
        padding: 0 300px 0 200px;
        border: 1px solid black;
      }

      .content {
        float: left;
        width: 100%;
        background: #f00;
      }

      .left {
        width: 200px;
        background: #0f0;
        float: left;
        margin-left: -100%;
        position: relative;
        left: -200px;
      }

      .right {
        width: 300px;
        background: #00f;
        float: left;
        margin-left: -300px;
        position: relative;
        right: -300px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">中间内容</div>
      <div class="left">左侧区域</div>
      <div class="right">右侧区域</div>
    </div>
  </body>
</html>
```

### 双飞翼布局

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html,
      body {
        height: 100%;
      }

      div {
        height: 100%;
      }

      .main {
        float: left;
        width: 100%;
        background: #f00;
      }

      .main .content {
        margin-left: 200px;
        margin-right: 300px;
      }

      .left {
        width: 200px;
        background: #0f0;
        float: left;
        margin-left: -100%;
      }

      .right {
        width: 300px;
        background: #00f;
        float: left;
        margin-left: -300px;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="content">hello world</div>
    </div>
    <div class="left">你好</div>
    <div class="right">王鹏浩</div>
  </body>
</html>
```

### flex 布局

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html,
      body {
        height: 100%;
      }

      div {
        height: 100%;
      }

      .container {
        display: flex;
      }

      .content {
        flex: 1 1;
        order: 2;
        background: #f00;
      }

      .left {
        flex: 0 0 200px;
        order: 1;
        background: #0f0;
      }

      .right {
        flex: 0 0 300px;
        order: 3;
        background: #00f;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">hello world</div>
      <div class="left">你好</div>
      <div class="right">王鹏浩</div>
    </div>
  </body>
</html>
```

### 参考链接

- https://segmentfault.com/a/1190000003942591
- https://blog.csdn.net/crystal6918/article/details/55224670
- https://blog.csdn.net/zhoulei1995/article/details/80161240

## 21、居中

## 22、CSS 怎么画一个大小为父元素宽度一半的正方形？

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .outer {
        width: 400px;
        height: 600px;
        background: red;
      }

      .inner {
        width: 50%;
        padding-bottom: 50%;
        background: blue;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="inner"></div>
    </div>
  </body>
</html>
```
