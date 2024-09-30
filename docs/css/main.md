# CSS Example

:::tip
This is a collection of CSS snippets that I have found useful.
:::

## blend-mode

**`<blend-mode>`** 是一种 CSS 数据类型，用于描述当元素重叠时，颜色应当如何呈现。它被用于 `background-blend-mode ` 和 `mix-blend-mode` 属性。 当层重叠时，混合模式是计算像素最终颜色值的方法，每种混合模式采用前景和背景的颜色值，执行其计算并返回最终的颜色值。最终的可见层是对混合层中的每个重叠像素执行混合模式计算的结果。

:::preview
url=../../packages/pages/css/blend-mode-visual.vue
:::

## Filter 函数

### blur()

blur() 函数将高斯模糊应用于输入图像。radius 定义了高斯函数的标准偏差值，或者屏幕上有多少像素相互融合，因此，较大的值将产生更多的模糊。若没有设置值，默认为 0。该参数可以指定为 CSS 长度，但不接受百分比值。

```css
.a {
  filter: blur(5px);
}
```

### brightness()

brightness() 函数将线性乘法器应用于输入图像，使其看起来或多或少地变得明亮。值为 0% 将创建全黑图像。值为 100% 会使输入保持不变。其他值是效果的线性乘数。如果值大于 100% 提供更明亮的结果。若没有设置值，默认为 1。

```css
.a {
  filter: brightness(0.4);
}
```

### contrast()

contrast() 函数可调整输入图像的对比度。值是 0% 的话，图像会全黑。值是 100%，图像不变。值可以超过 100%，意味着会运用更低的对比。若没有设置值，默认是 1。

```css
.a {
  filter: contrast(200%);
}
```

### drop-shadow()

drop-shadow() 函数对输入图像应用阴影效果。阴影可以设置模糊度的，以特定颜色画出的遮罩图的偏移版本，最终合成在图像下面。函数接受 `<shadow>`（在 CSS3 背景中定义）类型的值，除了 inset 和 spread 关键字。该函数与已有的 box-shadow 属性很相似；不同之处在于，通过滤镜，一些浏览器为了更好的性能会提供硬件加速。

```css
.a{
  filter: drop-shadow(16px 16px 20px blue);
}
}
```

### grayscale()

grayscale() 函数将改变输入图像灰度。amount 的值定义了转换的比例。值为 100% 则完全转为灰度图像，值为 0% 图像无变化。值在 0% 到 100% 之间，则是效果的线性乘数。若未设置值，默认是 0。

常见应用：将整个网站变灰。

```css
.a {
  filter: grayscale(50%);
}
```

### hue-rotate()

hue-rotate() (en-US) 函数在输入图像上应用色相旋转。angle 一值设定图像会被调整的色环角度值。值为 0deg，则图像无变化。若值未设置值，默认为 0deg。该值虽然没有最大值，超过 360deg 的值相当于又绕一圈。

```css
.a {
  filter: hue-rotate(90deg);
}
```

### invert()

invert() 函数反转输入图像。amount 的值定义转换的比例。值为 100% 则图像完全反转。值为 0% 则图像无变化。值在 0% 和 100% 之间，则是效果的线性乘数。若未设置值，则默认为 0。

```css
.a {
  filter: invert(75%);
}
```

### opacity()

opacity() 转化图像的透明程度。amount 的值定义转换的比例。值为 0% 则是完全透明，值为 100% 则图像无变化。值在 0% 和 100% 之间，则是效果的线性乘数。也相当于图像样本乘以数量。若未设置值，则默认为 1。该函数与已有的 opacity 属性很相似，不同之处在于通过 filter，一些浏览器为了提升性能会提供硬件加速。

```css
.a {
  filter: opacity(25%);
}
```

### saturate()

saturate() 函数转换图像饱和度。amount 的值定义转换的比例。值为 0% 则是完全不饱和，值为 100% 则图像无变化。其他值是效果的线性乘数。超过 100% 则有更高的饱和度。若未设置值，则默认为 1。

```css
.a {
  filter: saturate(30%);
}
```

### sepia()

sepia() 函数将图像转换为深褐色。amount 的值定义转换的比例。值为 100% 则完全是深褐色的，值为 0% 图像无变化。值在 0% 到 100% 之间，值是效果的线性乘数。若未设置值，则默认为 0。

```css
.a {
  filter: sepia(60%);
}
```

## backdrop-filter

backdrop-filter CSS 属性可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。因为它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明。
