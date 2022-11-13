# Filter

CSS 属性 filter 将模糊或颜色偏移等图形效果应用于元素。滤镜通常用于调整图像、背景和边框的渲染。

CSS 标准里包含了一些已实现预定义效果的函数。你也可以参考一个 SVG 滤镜，通过一个 URL 链接到 SVG 滤镜元素。

```
filter: <filter-function> [<filter-function>]* | none

filter: url(file.svg#filter-element-id)
```

使用 CSS 滤镜属性，你需要设定下面某一函数的值。如果该值无效，函数返回 `none`。除特殊说明外，函数的值如果接受百分比值（如 `34%`），那么该函数也接受小数值（如 `0.34`）。

当单个 `filter` 属性具有两个或多个函数时，其结果将不同于把两个或多个 `filter` 属性分别应用于相同的函数时的结果。

## SVG filter

### url()

获取指向 SVG 滤镜的 URI，该 SVG filter 可以嵌入到外部 XML 文件中。

```
filter: url(resources.svg#c1)
```

## Filter 函数

### blur()

blur() 函数将高斯模糊应用于输入图像。radius 定义了高斯函数的标准偏差值，或者屏幕上有多少像素相互融合，因此，较大的值将产生更多的模糊。若没有设置值，默认为 0。该参数可以指定为 CSS 长度，但不接受百分比值。

### brightness()

brightness() 函数将线性乘法器应用于输入图像，使其看起来或多或少地变得明亮。值为 0% 将创建全黑图像。值为 100% 会使输入保持不变。其他值是效果的线性乘数。如果值大于 100% 提供更明亮的结果。若没有设置值，默认为 1。

### contrast()

contrast() 函数可调整输入图像的对比度。值是 0% 的话，图像会全黑。值是 100%，图像不变。值可以超过 100%，意味着会运用更低的对比。若没有设置值，默认是 1。

### drop-shadow()

drop-shadow() 函数对输入图像应用阴影效果。阴影可以设置模糊度的，以特定颜色画出的遮罩图的偏移版本，最终合成在图像下面。函数接受 `<shadow>`（在 CSS3 背景中定义）类型的值，除了 inset 和 spread 关键字。该函数与已有的 box-shadow 属性很相似；不同之处在于，通过滤镜，一些浏览器为了更好的性能会提供硬件加速。`<shadow>` 参数如下：

`<offset-x> <offset-y>`（必须）
这是设置阴影偏移量的两个`<length>` 值。 `<offset-x>` 设定水平方向距离，负值会使阴影出现在元素左边。 <offset-y> 设定垂直距离，负值会使阴影出现在元素上方。查看`<length>`了解可能的单位。 如果两个值都是 0，则阴影出现在元素正后面（如果设置了`<blur-radius>`且/或 `<spread-radius>` 也会有模糊效果）。

`<blur-radius> `可选
这是第三个 `<length>` 值。值越大，越模糊，所以阴影可以变得更大或更淡。不允许负值。若未设定，默认是 0（则阴影的边界很锐利）。

`<color>` 可选
查看 `<color>`了解该值可能的关键字和标记。若未设定，颜色值基于浏览器 —— 通常是 `<color>` 属性的值，但请注意，在这种情况下，Safari 当前会绘制透明阴影。

### grayscale()

grayscale() 函数将改变输入图像灰度。amount 的值定义了转换的比例。值为 100% 则完全转为灰度图像，值为 0% 图像无变化。值在 0% 到 100% 之间，则是效果的线性乘数。若未设置值，默认是 0。

### hue-rotate()

hue-rotate() (en-US) 函数在输入图像上应用色相旋转。angle 一值设定图像会被调整的色环角度值。值为 0deg，则图像无变化。若值未设置值，默认为 0deg。该值虽然没有最大值，超过 360deg 的值相当于又绕一圈。

### invert()

invert() 函数反转输入图像。amount 的值定义转换的比例。值为 100% 则图像完全反转。值为 0% 则图像无变化。值在 0% 和 100% 之间，则是效果的线性乘数。若未设置值，则默认为 0。

### opacity()

opacity() 转化图像的透明程度。amount 的值定义转换的比例。值为 0% 则是完全透明，值为 100% 则图像无变化。值在 0% 和 100% 之间，则是效果的线性乘数。也相当于图像样本乘以数量。若未设置值，则默认为 1。该函数与已有的 opacity 属性很相似，不同之处在于通过 filter，一些浏览器为了提升性能会提供硬件加速。

### saturate()

saturate() 函数转换图像饱和度。amount 的值定义转换的比例。值为 0% 则是完全不饱和，值为 100% 则图像无变化。其他值是效果的线性乘数。超过 100% 则有更高的饱和度。若未设置值，则默认为 1。

### sepia()

sepia() 函数将图像转换为深褐色。amount 的值定义转换的比例。值为 100% 则完全是深褐色的，值为 0% 图像无变化。值在 0% 到 100% 之间，值是效果的线性乘数。若未设置值，则默认为 0。

## 复合函数

你可以组合任意数量的函数来控制渲染。例如可时增强图像的对比度和亮度。

## backdrop-filter

backdrop-filter CSS 属性可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。因为它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明。