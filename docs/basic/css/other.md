## 2、选择器权重值和优先级

!important > 内联 > #id > .class/属性选择器/:伪类 > 标签/::伪元素 > \* > 继承

对于选择器的优先级:

- 标签选择器、伪元素选择器:1;
- 类选择器、伪类选择器、属性选择器:10;
- id 选择器:100;
- 内联样式:1000;

注意事项:

- !important 声明的样式的优先级最高;
- 如果优先级相同,则最后出现的样式生效;
- 继承得到的样式的优先级最低;
- 通用选择器（\*）、子选择器（>）和相邻同胞选择器（+）并不在这四个等级中,所以它们的权值都为 0 ;
- 样式表的来源不同时,优先级顺序为:内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式.

## 3、盒模型

CSS3 中的盒模型有以下两种:标准盒子模型、IE 盒子模型

盒模型都是由四个部分组成的,分别是 margin、border、padding 和 content.
![标准盒子模型](/public/20200715170108916.png)

![IE 盒子模型](/public/20200715170121834.png)

标准盒模型和 IE 盒模型的区别在于设置 width 和 height 时,所对应的范围不同:

- 标准盒模型的 width 和 height 属性的范围只包含了 content,
- IE 盒模型的 width 和 height 属性的范围包含了 border、padding 和 content.

可以通过修改元素的 box-sizing 属性来改变元素的盒模型:

- box-sizing: content-box 表示标准盒模型（默认值）
- box-sizing: border-box 表示 IE 盒模型（怪异盒模型）

## 4、block、inline 和 inline-block

(1) block:会独占一行,多个元素会另起一行,可以设置 width、height、margin 和 padding 属性;

(2) inline:元素不会独占一行,设置 width、height 属性无效.但可以设置水平方向的 margin 和 padding 属性,不能设置垂直方向的
padding 和 margin;

(3) inline-block:将对象设置为 inline 对象,但对象的内容作为 block 对象呈现,之后的内联对象会被排列在同一行内.

对于行内元素和块级元素,其特点如下:

(1) 行内元素

- 设置宽高无效;
- 可以设置水平方向的 margin 和 padding 属性,不能设置垂直方向.

(2) 块级元素

- 可以设置宽高;
- 设置 margin 和 padding 都有效;
- 可以自动换行,多个块状,默认排列从上到下.

## 5、伪类和伪元素

伪元素 : 在内容元素的前后插入额外的元素或样式,但是这些元素实际上并不在文档中生成.它们只在外部显示可见,但不会在文档的源代码中找到它们,因此,称为“伪”元素.伪元素类似于增添一个新的
DOM 节点到 DOM
树中,而不是改变元素的状态.注意了,这里是类似,而不是真的增加一个节点,这也是其被称为伪元素的原因（实质上,元素被创建在文档外）.

伪类 : 将特殊的效果添加到特定选择器上.它是已有元素上添加类别的,不会产生新的元素.伪类就是一个选择处于特定状态的元素的选择器,比如某一个
clsss 的第一个元素,某个被 hover 的元素等等,我们可以理解成一个特定的 CSS
类,但与普通的类不一样,它只有处于 DOM 树无法描述的状态下才能为元素添加样式,所以将其称为伪类.

总结：（1）伪类是通过在元素选择器上加⼊伪类改变元素状态,⽽伪元素通过对元素的操作进⾏对元素的改变.（2）伪类是操作文档中已有的元素,而伪元素是创建了一个文档外的元素.（3）为了书写
CSS 时进行区分,一般伪类是单冒号,如:
hover,而伪元素是双冒号::before.

## 8、display 和 visibility

## 17、CSS 可继承与不可继承属性

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

## 18、link 和 @import

两者都是外部引用 CSS 的方式,它们的区别如下:

- link 是 XHTML 标签,除了加载 CSS 外,还可以定义 RSS 等其他事务;@import 属于 CSS 范畴,只能加载 CSS.
- link 引用 CSS 时,在页面载入时同时加载;@import 需要页面网页完全载入以后加载.
- link 是 XHTML 标签,无兼容问题;@import 是在 CSS2.1 提出的,低版本的浏览器不支持.
- link 支持使用 Javascript 控制 DOM 去改变样式;而@import 不支持.

## 20、line-height

line-height 是相对于元素自身的字体大小来取值，但同时会被继承。

父元素: fontSize: 18px; lineHeight: 1.5em(27px，150% 同理); 它的 lineHeight 计算下来为 27px，会被子元素继承。

子元素: fontSize: 30px，子元素的 lineHeight 被继承为 27px，出现问题

某元素的 fontSize: 2rem; lineHeight: 1.5em; 此时 lineHeight 为多少像素？
fontSize = 2 _ 16 = 32px
lineHeight = 1.5 _ 32 = 48px

## 21、vertical-align

只能应用于内联元素以及 display 值为 table-cell 的元素。在 css 中，有些 css 属性是会改变元素的 display 值的，例如 float 和
position: absolute，一旦设置了这两个属性之一，元素的 display 值就是变为 block，因此，vertical-align 也就失去了作用。

1.vertical-align 必须对子元素设置，不是对父元素设置 2.必须设置 line-height，不然不会起作用
3.vertical-align 只对 inline-block 元素有效

## CSS 实现简单图形

### 绘制一个三角形

```css
.box {
  width: 0;
  height: 0;
  border-top: 10px solid #ccc;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
```

## CSS3 的更新

### 选择器

css3 中新增了一些选择器，主要为如下图所示：

![](/public/fe90770f1154.png)

### 边框

css3 新增了三个边框属性，分别是：

border-radius：创建圆角边框

box-shadow：为元素添加阴影

border-image：使用图片来绘制边框

#### box-shadow

设置元素阴影，设置属性如下：

水平阴影,垂直阴影,模糊距离(虚实),阴影尺寸(影子大小),阴影颜色,内/外阴影

其中水平阴影和垂直阴影是必须设置的

### 背景

新增了几个关于背景的属性，分别是 background-clip、background-origin、background-size 和 background-break

#### background-clip

用于确定背景画区，有以下几种可能的属性：

background-clip: border-box; 背景从 border 开始显示

background-clip: padding-box; 背景从 padding 开始显示

background-clip: content-box; 背景显 content 区域开始显示

background-clip: no-clip; 默认属性，等同于 border-box

通常情况，背景都是覆盖整个元素的，利用这个属性可以设定背景颜色或图片的覆盖范围

#### background-origin

当我们设置背景图片时，图片是会以左上角对齐，但是是以 border 的左上角对齐还是以 padding 的左上角或者 content 的左上角对齐?
border-origin 正是用来设置这个的

background-origin: border-box; 从 border 开始计算 background-position

background-origin: padding-box; 从 padding 开始计算 background-position

background-origin: content-box; 从 content 开始计算 background-position

默认情况是 padding-box，即以 padding 的左上角为原点

#### background-size

background-size 属性常用来调整背景图片的大小，主要用于设定图片本身。有以下可能的属性：

background-size: contain; 缩小图片以适合元素（维持像素长宽比）

background-size: cover; 扩展元素以填补元素（维持像素长宽比）

background-size: 100px 100px; 缩小图片至指定的大小

background-size: 50% 100%; 缩小图片至指定的大小，百分比是相对包 含元素的尺寸

#### background-break

元素可以被分成几个独立的盒子（如使内联元素 span 跨越多行），background-break 属性用来控制背景怎样在这些不同的盒子中显示

background-break: continuous; 默认值。忽略盒之间的距离（也就是像元素没有分成多个盒子，依然是一个整体一样）

background-break: bounding-box; 把盒之间的距离计算在内；

background-break: each-box; 为每个盒子单独重绘背景

### 文字

#### word-wrap

语法：word-wrap: normal|break-word

normal：使用浏览器默认的换行

break-all：允许在单词内换行

#### text-overflow

text-overflow 设置或检索当当前行超过指定容器的边界时如何显示，属性有两个值选择：

clip：修剪文本

ellipsis：显示省略符号来代表被修剪的文本

#### text-shadow

text-shadow 可向文本应用阴影。能够规定水平阴影、垂直阴影、模糊距离，以及阴影的颜色

#### text-decoration

CSS3 里面开始支持对文字的更深层次的渲染，具体有三个属性可供设置：

text-fill-color: 设置文字内部填充颜色

text-stroke-color: 设置文字边界填充颜色

text-stroke-width: 设置文字边界宽度

### 颜色

css3 新增了新的颜色表示方式 rgba 与 hsla

rgba 分为两部分，rgb 为颜色值，a 为透明度

hala 分为四部分，h 为色相，s 为饱和度，l 为亮度，a 为透明度

### transition 过渡

transition 属性可以被指定为一个或多个 CSS 属性的过渡效果，多个属性之间用逗号进行分隔，必须规定两项内容：过度效果,持续时间

语法如下：

transition： CSS 属性，花费时间，效果曲线(默认 ease)，延迟时间(默认 0)
上面为简写模式，也可以分开写各个属性

transition-property: width;
transition-duration: 1s;
transition-timing-function: linear;
transition-delay: 2s;

### transform 转换

transform 属性允许你旋转，缩放，倾斜或平移给定元素

transform-origin：转换元素的位置（围绕那个点进行转换），默认值为(x,y,z):(50%,50%,0)

使用方式：

transform: translate(120px, 50%)：位移

transform: scale(2, 0.5)：缩放

transform: rotate(0.5turn)：旋转

transform: skew(30deg, 20deg)：倾斜

### animation 动画

动画这个平常用的也很多，主要是做一个预设的动画。和一些页面交互的动画效果，结果和过渡应该一样，让页面不会那么生硬

animation 也有很多的属性

animation-name：动画名称

animation-duration：动画持续时间

animation-timing-function：动画时间函数

animation-delay：动画延迟时间

animation-iteration-count：动画执行次数，可以设置为一个整数，也可以设置为 infinite，意思是无限循环

animation-direction：动画执行方向

animation-paly-state：动画播放状态

animation-fill-mode：动画填充模式

### 渐变

颜色渐变是指在两个颜色之间平稳的过渡，css3 渐变包括

#### linear-gradient：线性渐变

background-image: linear-gradient(direction, color-stop1, color-stop2, ...);

#### radial-gradient：径向渐变

linear-gradient(0deg, red, green);

### 其他

关于 css3 其他的新特性还包括 flex 弹性布局、Grid 栅格布局

除此之外，还包括多列布局、媒体查询、混合模式等等......

## 谷歌浏览器怎么设置小于 12px 的字体

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
border: 1 px solid #333;
```

可以先在 JS 中拿到 window.devicePixelRatio 的值，然后把这个值通过 JSX 或者模板语法给到 CSS 的 data 里，达到这样的效果（这里用
JSX 语法做示范）：

```javascript
<div id="container" data-device={{ window.devicePixelRatio }}></div>
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

}


/
/
通过伪元素实现

0.5
px border
.border::after {
    content: "";
    box-sizing: border-box;
/ / 为了与原元素等大 position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    border: 1px solid gray;
    transform: scale(0.5);
    transform-origin: 0 0;
}

/
/
通过伪元素实现

0.5
px 细线
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

/
/
dpr适配可以这样写

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
