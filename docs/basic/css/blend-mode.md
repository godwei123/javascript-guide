# blend-mode

<script setup lang="ts">
import BlendModeVisual from "../../../packages/pages/basic/blend-mode-visual.vue";
</script>

<ClientOnly>
<BlendModeVisual/>
</ClientOnly>

## MDN

**`<blend-mode>`** 是一种 CSS 数据类型，用于描述当元素重叠时，颜色应当如何呈现。它被用于 `background-blend-mode ` 和 `mix-blend-mode` 属性。

当层重叠时，混合模式是计算像素最终颜色值的方法，每种混合模式采用前景和背景的颜色值，执行其计算并返回最终的颜色值。最终的可见层是对混合层中的每个重叠像素执行混合模式计算的结果。

`<blend-mode> = normal | multiply | screen | overlay | darken | lighten | color-dodge |color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity`

`<blend-mode>` 数据类型被定义为下列关键词中的任意一个。

- normal

  最终颜色永远是顶层颜色，无论底层颜色是什么。 其效果类似于两张不透明的纸重叠（overlapping）在一起。

- multiply

  最终颜色为顶层颜色与底层颜色相乘的结果。 如果叠加黑色层，则最终层必为黑色层，叠加白色层不会造成变化。 其效果类似于在透明薄膜上重叠印刷的两个图像。

- screen

  最终的颜色是**反转顶层颜色和底层颜色，将反转后的两个颜色相乘，再反转相加得到的和**得到的结果。 黑色层不会造成变化，白色层导致白色最终层。 其效果类似于（被投影仪）投射到投影屏幕上的两个图像。

- overlay

  如果底层颜色比顶层颜色深，则最终颜色是 `multiply` 的结果，如果底层颜色比顶层颜色浅，则最终颜色是 `screen` 的结果。 此混合模式相当于顶层与底层互换后的 `hard-light`。

- darken

  最终颜色是由每个颜色通道下，顶底两层颜色中的最暗值所组成的颜色。

- lighten

  最终颜色是每个颜色通道下，顶底两层颜色中的最亮值所组成的颜色。

- color-dodge

  最终颜色是将底部颜色除以顶部颜色的反色的结果。 黑色前景不会造成变化。前景如果是背景的反色，会得到白色（fully lit color，完全亮起的颜色，应当为白色）。 此混合模式类似于 `screen`，但是，前景只需要和背景的反色一样亮，最终图像就会变为全白。

- color-burn

  最终颜色是**反转底部颜色，将反转后的值除以顶部颜色，再反转除以后的值**得到的结果。 白色的前景不会导致变化，前景如果是背景的反色，会得到黑色。 此混合模式类似于 `multiply`，但是，前景只需要和背景的反色一样暗，最终图像就会变为全黑。

- hard-light

  如果顶层颜色比底层颜色深，则最终颜色是 `multiply` 的结果，如果顶层颜色比底层颜色浅，则最终颜色是 `screen` 的结果。 此混合模式相当于顶层与底层互换后的 `overlay`。 其效果类似于在背景层上（用前景层）打出一片*刺眼*的聚光灯。

- soft-light

  最终颜色类似于 `hard-light` 的结果，但更加柔和一些。 此混合模式的表现类似 `hard-light`。 其效果类似于在背景层上（用前景层）打出一片*发散*的聚光灯。

- difference

  最终颜色是 两种颜色中较浅的颜色 减去 两种颜色中较深的颜色 得到的结果。 黑色层不会造成变化，而白色层会反转另一层的颜色。

- exclusion

  最终颜色类似于 `difference`，但对比度更低一些。 和 `difference` 相同，黑色层不会造成变化，而而白色层会反转另一层的颜色。

- hue

  最终颜色由顶部颜色的*色调*和底部颜色的*饱和度*与*亮度*组成。

- saturation

  最终颜色由顶部颜色的*色调*和底部颜色的*饱和度*与*发光度*组成。 饱和度为零的纯灰色背景层不会造成变化。

- color

  最终颜色由顶部颜色的*色调*与*饱和度*和底部颜色的*亮度*组成。 此效果保留了灰度级别，可用于为前景着色。

- luminosity

  最终颜色由顶部颜色的亮度和底部颜色的色调和饱和度组成。 此混合模式相当于顶层与底层互换后的 `color`。

```cpp
mix-blend-mode: normal;          //正常
mix-blend-mode: multiply;        //正片叠底
mix-blend-mode: screen;          //滤色
mix-blend-mode: overlay;         //叠加
mix-blend-mode: darken;          //变暗
mix-blend-mode: lighten;         //变亮
mix-blend-mode: color-dodge;     //颜色减淡
mix-blend-mode: color-burn;      //颜色加深
mix-blend-mode: hard-light;      //强光
mix-blend-mode: soft-light;      //柔光
mix-blend-mode: difference;      //差值
mix-blend-mode: exclusion;       //排除
mix-blend-mode: hue;             //色相
mix-blend-mode: saturation;      //饱和度
mix-blend-mode: color;           //颜色
mix-blend-mode: luminosity;      //亮度
```

- multiply 混合后通常颜色会加深，多用在白色背景图片和其他元素的混合，以及彩色纹理的合并上。
- screen 混合后颜色会减淡，非常适合实现霓虹灯光效果，适合黑色背景素材和其他元素混合，非常实用。
- overlay 在颜色值暗的时候，采用了类似“正片叠底”的算法，而颜色亮的时候，采用了类似“滤色”的算法。此混合模式比较适合实现文字水印效果。
- darken 表示哪个颜色暗使用哪个颜色，在 web 开发中，给图形或文字着色会很实用。
- lighten 是哪个颜色浅就表现为哪个颜色，在 web 开发中，给图形或文字着色会很实用。
- color-dodge 颜色减淡混合模式可以用来保护底图的高光，适合处理高光下的人物照片。
- color-burn 颜色加深混合模式可以用来保护底图的阴影，适合处理幽深秘境一类的照片，通过和特定的色彩进行混合，可以营造更加幽深的意境。
- hard-light 的效果是强光，最终的混合效果就好像耀眼的聚光灯照射过来，表现为图像亮的地方更亮，暗的地方更暗。多用在图像表现处理上。
- soft-light 的效果是柔光，最终的混合效果就好像发散的光源弥漫过来，表现效果和 hard-light 有类似之处，只是表现没有那么强烈。给图像着色的时候常用此混合模式。
- difference 是差值效果，可以实现颜色的反色效果。
- exclusion 的效果是排除，最终的混合效果和 difference 模式是类似的，区别在于 exclusion 的对比度要更低一些。
  接下来要介绍的 4 种混合模式都属于颜色系混合模式，在 web 开发中不常用，还是传统的图像表现处理领域用的较多。
- hue 表示色调混合，最终的效果是混合后的颜色使用底层元素的亮度和饱和度，而使用上层元素的色调。
- saturation 表示饱和度混合，混合后的颜色保留底图的亮度和色调，使用顶图的饱和度。
- color 表示颜色混合，混合后的颜色保留底图的亮度，使用顶图的色调和饱和度。
- luminosity 表示亮度混合，混合后的颜色保留底图的色调和饱和度，使用顶图的亮度，和 color 模式正好是相反的。

## 资料来源

https://developer.mozilla.org/zh-CN/docs/Web/CSS/blend-mode

https://www.w3.org/TR/compositing-1/#mix-blend-mode

https://caniuse.com/?search=blend-modes
