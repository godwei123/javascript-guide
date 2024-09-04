<script setup>
import FlexVisual from '~/pages/css/flex-visual.vue'
</script>

# flex

<ClientOnly><flex-visual/></ClientOnly>

## 容器属性

首先，实现 flex 布局需要先指定一个容器，任何一个容器都可以被指定为 flex 布局，这样容器内部的元素就可以使用 flex 来进行布局。

```css
/* 可以有两种取值 */
.container {
  display: flex;
  display: inline-flex;
}
```

> **需要注意的是**: 当时设置 flex 布局之后,子元素的 float、clear、vertical-align 的属性将会失效.

下面六种属性可以设置在容器上,它们分别是:

1. flex-direction
2. flex-wrap
3. flex-flow
4. justify-content
5. align-items
6. align-content

### flex-direction

> 决定主轴的方向 (即项目的排列方向)

```css
/* 
row:             主轴为水平方向,起点在左端.默认值
row-reverse:     主轴为水平方向,起点在右端
column:          主轴为垂直方向,起点在上沿
column-reverse:  主轴为垂直方向,起点在下沿
*/
.container {
  flex-direction: row;
  flex-direction: row-reverse;
  flex-direction: column;
  flex-direction: column-reverse;
}
```

### flex-wrap

> 决定容器内项目是否可换行

```css
/* 
默认情况下,项目都排在主轴线上,使用 flex-wrap 可实现项目的换行.
nowrap:       不换行, 默认值
wrap:         项目主轴总尺寸超出容器时换行,第一行在上方
wrap-reverse: 换行,第一行在下方
*/
.container {
  flex-wrap: nowrap;
  flex-wrap: wrap;
  flex-wrap: wrap-reverse;
}
```

### flex-flow

> flex-direction 和 flex-wrap 的简写形式

```css
/* 
默认值为: row nowrap(这里是分开的两个属性哦)
 */
.container {
  flex-flow: < flex-direction > < flex-wrap >;
}
```

### justify-content

> 定义了项目在主轴的对齐方式

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

### align-items

> 定义了项目在交叉轴上的对齐方式

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

### align-content

> 定义了多根轴线的对齐方式,如果项目只有一根轴线,那么该属性将不起作用

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

## 子容器属性

上述讲的是一个容器可以设置的属性,下面讲的是容器内的子容器

1、order 属性: order 越小，越往前排

2、flex-grow 属性: 定义子元素或者子容器的放大比例,默认为 0,即如果存在剩余空间,也不放大.

3、flex-shrink 属性: 定义了项目的缩小比例,默认为 1,即如果空间不足,该项目将缩小.

4、flex-basis 属性: 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto,即项目的本来大小。

5、align-self 属性: 当前子容器在交叉轴对齐方式

6、flex 属性：简写形式，由 `<flex-grow> <flex-shrink> <flex-basis> ` 组成

## flex 简写

第一个数值是 flex-grow。赋值为正数的话是让元素增加所占空间。

第二个数值是 flex-shrink 正数可以让它缩小所占空间，但是只有在 flex 元素总和超出主轴才会生效。

最后一个数值是 flex-basis；flex 元素是在这个基准值的基础上缩放的。

flex 简写属性在下面有三个值的定义 默认值为 0 1 auto;

- flex-grow : 定义项目的放大比例,默认为 0
- flex-shrink : 定义项目的缩小比例,默认为 1
- flex-basis : 定义项目在分配多余的空间之前,项目占据的主轴空间。默认为 auto（item 本来大小）,如果设置为具体值，**优先级大于元素本身设置的宽度**。

### flex: initial

flex: initial 是把 flex 元素重置为的初始值，它相当于 flex: 0 1 auto。

### flex: positive-number

完整形式: `flex:1` 相当于 `flex: positive-number 1 0;`

flex:1 在父元素尺寸不足的时候,会优先最小化内容尺寸. 使用场景:当我们希望元素可以充分的利用剩余的空间,同时不会很多的占用其他同级元素的空间的时候使用.

flex:0 通常表现为内容最小化宽度 使用场景:当希望元素 item 占用最小化的内容宽度的时候

### flex:auto

flex: auto 等同于 flex: 1 1 auto，flex 元素在需要的时候既可以拉伸也可以收缩。 在父元素尺寸不足的时候,会优先最大化内容尺寸. 使用场景:当我们希望元素充分的使用剩余的空间,各自元素按照各自内容进行分配的时候使用.

### flex: none

flex: none 可以把 flex 元素设置为不可伸缩。它和设置为 flex: 0 0 auto 是一样的。 元素既不能拉伸或者收缩，但是元素会按具有 flex-basis: auto 属性的 flexbox 进行布局。
