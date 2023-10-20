import { ListOption } from "./interface";

const blendModeLists: Array<ListOption> = [
  {
    id: 1,
    label: "normal  --正常",
    value: "normal",
    description:
      "最终颜色永远是顶层颜色，无论底层颜色是什么。 其效果类似于两张不透明的纸重叠（overlapping）在一起。",
  },
  {
    id: 2,
    label: "multiply  --正片叠底",
    value: "multiply",
    description:
      "最终颜色为顶层颜色与底层颜色相乘的结果。 如果叠加黑色层，则最终层必为黑色层，叠加白色层不会造成变化。 其效果类似于在透明薄膜上重叠印刷的两个图像。",
  },
  {
    id: 3,
    label: "screen  --滤色",
    value: "screen",
    description:
      "最终的颜色是反转顶层颜色和底层颜色，将反转后的两个颜色相乘，再反转相加得到的和得到的结果。 黑色层不会造成变化，白色层导致白色最终层。 其效果类似于（被投影仪）投射到投影屏幕上的两个图像。",
  },
  {
    id: 4,
    label: "overlay  --叠加",
    value: "overlay",
    description:
      "如果底层颜色比顶层颜色深，则最终颜色是 multiply 的结果，如果底层颜色比顶层颜色浅，则最终颜色是 screen 的结果。 此混合模式相当于顶层与底层互换后的 hard-light。",
  },
  {
    id: 5,
    label: "darken  --变暗",
    value: "darken",
    description:
      "最终颜色是由每个颜色通道下，顶底两层颜色中的最暗值所组成的颜色。",
  },
  {
    id: 6,
    label: "lighten  --变亮",
    value: "lighten",
    description:
      "最终颜色是每个颜色通道下，顶底两层颜色中的最亮值所组成的颜色。",
  },
  {
    id: 7,
    label: "color-dodge  --颜色减淡",
    value: "color-dodge",
    description:
      "最终颜色是将底部颜色除以顶部颜色的反色的结果。 黑色前景不会造成变化。前景如果是背景的反色，会得到白色（fully lit color，完全亮起的颜色，应当为白色）。 此混合模式类似于 screen，但是，前景只需要和背景的反色一样亮，最终图像就会变为全白。",
  },
  {
    id: 8,
    label: "color-burn  --颜色加深",
    value: "color-burn",
    description:
      "最终颜色是**反转底部颜色，将反转后的值除以顶部颜色，再反转除以后的值**得到的结果。 白色的前景不会导致变化，前景如果是背景的反色，会得到黑色。 此混合模式类似于 multiply，但是，前景只需要和背景的反色一样暗，最终图像就会变为全黑。",
  },
  {
    id: 9,
    label: "hard-light  --强光",
    value: "hard-light",
    description:
      "如果顶层颜色比底层颜色深，则最终颜色是 multiply 的结果，如果顶层颜色比底层颜色浅，则最终颜色是 screen 的结果。 此混合模式相当于顶层与底层互换后的 overlay。 其效果类似于在背景层上（用前景层）打出一片刺眼的聚光灯。",
  },
  {
    id: 10,
    label: "soft-light  --柔光",
    value: "soft-light",
    description:
      "最终颜色类似于 hard-light 的结果，但更加柔和一些。 此混合模式的表现类似 hard-light。 其效果类似于在背景层上（用前景层）打出一片发散的聚光灯。",
  },
  {
    id: 11,
    label: "difference  --差值",
    value: "difference",
    description:
      "最终颜色是两种颜色中较浅的颜色 减去 两种颜色中较深的颜色 得到的结果。 黑色层不会造成变化，而白色层会反转另一层的颜色。",
  },
  {
    id: 12,
    label: "exclusion  --排除",
    value: "exclusion",
    description:
      "最终颜色类似于 difference，但对比度更低一些。 和 difference 相同，黑色层不会造成变化，而而白色层会反转另一层的颜色。",
  },
  {
    id: 13,
    label: "hue  --色相",
    value: "hue",
    description: "最终颜色由顶部颜色的色调和底部颜色的饱和度与亮度组成。",
  },
  {
    id: 14,
    label: "saturation  --饱和度",
    value: "saturation",
    description:
      "最终颜色由顶部颜色的色调和底部颜色的饱和度与发光度组成。 饱和度为零的纯灰色背景层不会造成变化。",
  },
  {
    id: 15,
    label: "color  --颜色",
    value: "color",
    description:
      "最终颜色由顶部颜色的色调与饱和度和底部颜色的亮度组成。 此效果保留了灰度级别，可用于为前景着色。",
  },
  {
    id: 16,
    label: "luminosity  --亮度",
    value: "luminosity",
    description:
      "最终颜色由顶部颜色的亮度和底部颜色的色调和饱和度组成。 此混合模式相当于顶层与底层互换后的 color。",
  },
];

const filterLists: Array<ListOption> = [
  {
    id: 1,
    label: "url",
    filterValue: "#change",
    description:
      "获取指向 SVG 滤镜的 URI，该 SVG filter 可以嵌入到外部 XML 文件中。",
  },
  {
    id: 2,
    label: "blur",
    filterValue: "5px",
    description:
      "blur 函数将高斯模糊应用于输入图像。radius 定义了高斯函数的标准偏差值，或者屏幕上有多少像素相互融合，因此，较大的值将产生更多的模糊。若没有设置值，默认为 0。该参数可以指定为 CSS 长度，但不接受百分比值。",
  },
  {
    id: 3,
    label: "brightness",
    filterValue: "0.6",
    description:
      "brightness 函数将线性乘法器应用于输入图像，使其看起来或多或少地变得明亮。值为 0% 将创建全黑图像。值为 100% 会使输入保持不变。其他值是效果的线性乘数。如果值大于 100% 提供更明亮的结果。若没有设置值，默认为 1。",
  },
  {
    id: 4,
    label: "contrast",
    filterValue: "2",
    description:
      "contrast 函数可调整输入图像的对比度。值是 0% 的话，图像会全黑。值是 100%，图像不变。值可以超过 100%，意味着会运用更低的对比。若没有设置值，默认是 1。",
  },
  {
    id: 5,
    label: "drop-shadow",
    filterValue: "16px 16px 20px red",
    description:
      "drop-shadow 函数对输入图像应用阴影效果。阴影可以设置模糊度的，以特定颜色画出的遮罩图的偏移版本，最终合成在图像下面。函数接受 shadow（在 CSS3 背景中定义）类型的值，除了 inset 和 spread 关键字。该函数与已有的 box-shadow 属性很相似；不同之处在于，通过滤镜，一些浏览器为了更好的性能会提供硬件加速。",
  },
  {
    id: 6,
    label: "grayscale",
    filterValue: "0.9",
    description:
      "grayscale 函数将改变输入图像灰度。amount 的值定义了转换的比例。值为 100% 则完全转为灰度图像，值为 0% 图像无变化。值在 0% 到 100% 之间，则是效果的线性乘数。若未设置值，默认是 0。",
  },
  {
    id: 7,
    label: "hue-rotate",
    filterValue: "90deg",
    description:
      "hue-rotate 函数在输入图像上应用色相旋转。angle 一值设定图像会被调整的色环角度值。值为 0deg，则图像无变化。若值未设置值，默认为 0deg。该值虽然没有最大值，超过 360deg 的值相当于又绕一圈。",
  },
  {
    id: 8,
    label: "invert",
    filterValue: "75%",
    description:
      "invert 函数反转输入图像。amount 的值定义转换的比例。值为 100% 则图像完全反转。值为 0% 则图像无变化。值在 0% 和 100% 之间，则是效果的线性乘数。若未设置值，则默认为 0。",
  },
  {
    id: 9,
    label: "opacity",
    filterValue: "0.7",
    description:
      "opacity 转化图像的透明程度。amount 的值定义转换的比例。值为 0% 则是完全透明，值为 100% 则图像无变化。值在 0% 和 100% 之间，则是效果的线性乘数。也相当于图像样本乘以数量。若未设置值，则默认为 1。该函数与已有的 opacity 属性很相似，不同之处在于通过 filter，一些浏览器为了提升性能会提供硬件加速。",
  },
  {
    id: 10,
    label: "saturate",
    filterValue: "30%",
    description:
      "saturate 函数转换图像饱和度。amount 的值定义转换的比例。值为 0% 则是完全不饱和，值为 100% 则图像无变化。其他值是效果的线性乘数。超过 100% 则有更高的饱和度。若未设置值，则默认为 1.",
  },
  {
    id: 11,
    label: "sepia",
    filterValue: "60%",
    description:
      "sepia 函数将图像转换为深褐色。amount 的值定义转换的比例。值为 100% 则完全是深褐色的，值为 0% 图像无变化。值在 0% 到 100% 之间，值是效果的线性乘数。若未设置值，则默认为 0。",
  },
];

const backdropFilterLists: Array<ListOption> = [
  {
    id: 1,
    label: "url",
    backdropFilterValue: "#change",
    description:
      "获取指向 SVG 滤镜的 URI，该 SVG filter 可以嵌入到外部 XML 文件中。",
  },
  {
    id: 2,
    label: "blur",
    backdropFilterValue: "15px",
    description:
      "blur 函数将高斯模糊应用于输入图像。radius 定义了高斯函数的标准偏差值，或者屏幕上有多少像素相互融合，因此，较大的值将产生更多的模糊。若没有设置值，默认为 0。该参数可以指定为 CSS 长度，但不接受百分比值。",
  },
  {
    id: 3,
    label: "brightness",
    backdropFilterValue: "60%",
    description:
      "brightness 函数将线性乘法器应用于输入图像，使其看起来或多或少地变得明亮。值为 0% 将创建全黑图像。值为 100% 会使输入保持不变。其他值是效果的线性乘数。如果值大于 100% 提供更明亮的结果。若没有设置值，默认为 1。",
  },
  {
    id: 4,
    label: "contrast",
    backdropFilterValue: "40%",
    description:
      "contrast 函数可调整输入图像的对比度。值是 0% 的话，图像会全黑。值是 100%，图像不变。值可以超过 100%，意味着会运用更低的对比。若没有设置值，默认是 1。",
  },
  {
    id: 5,
    label: "drop-shadow",
    backdropFilterValue: "4px 4px 10px blue",
    description:
      "drop-shadow 函数对输入图像应用阴影效果。阴影可以设置模糊度的，以特定颜色画出的遮罩图的偏移版本，最终合成在图像下面。函数接受 shadow（在 CSS3 背景中定义）类型的值，除了 inset 和 spread 关键字。该函数与已有的 box-shadow 属性很相似；不同之处在于，通过滤镜，一些浏览器为了更好的性能会提供硬件加速。",
  },
  {
    id: 6,
    label: "grayscale",
    backdropFilterValue: "0.9",
    description:
      "grayscale 函数将改变输入图像灰度。amount 的值定义了转换的比例。值为 100% 则完全转为灰度图像，值为 0% 图像无变化。值在 0% 到 100% 之间，则是效果的线性乘数。若未设置值，默认是 0。",
  },
  {
    id: 7,
    label: "hue-rotate",
    backdropFilterValue: "180deg",
    description:
      "hue-rotate 函数在输入图像上应用色相旋转。angle 一值设定图像会被调整的色环角度值。值为 0deg，则图像无变化。若值未设置值，默认为 0deg。该值虽然没有最大值，超过 360deg 的值相当于又绕一圈。",
  },
  {
    id: 8,
    label: "invert",
    backdropFilterValue: "70%",
    description:
      "invert 函数反转输入图像。amount 的值定义转换的比例。值为 100% 则图像完全反转。值为 0% 则图像无变化。值在 0% 和 100% 之间，则是效果的线性乘数。若未设置值，则默认为 0。",
  },
  {
    id: 9,
    label: "opacity",
    backdropFilterValue: "40%",
    description:
      "opacity 转化图像的透明程度。amount 的值定义转换的比例。值为 0% 则是完全透明，值为 100% 则图像无变化。值在 0% 和 100% 之间，则是效果的线性乘数。也相当于图像样本乘以数量。若未设置值，则默认为 1。该函数与已有的 opacity 属性很相似，不同之处在于通过 filter，一些浏览器为了提升性能会提供硬件加速。",
  },
  {
    id: 10,
    label: "saturate",
    backdropFilterValue: "4",
    description:
      "saturate 函数转换图像饱和度。amount 的值定义转换的比例。值为 0% 则是完全不饱和，值为 100% 则图像无变化。其他值是效果的线性乘数。超过 100% 则有更高的饱和度。若未设置值，则默认为 1.",
  },
  {
    id: 11,
    label: "sepia",
    backdropFilterValue: "80%",
    description:
      "sepia 函数将图像转换为深褐色。amount 的值定义转换的比例。值为 100% 则完全是深褐色的，值为 0% 图像无变化。值在 0% 到 100% 之间，值是效果的线性乘数。若未设置值，则默认为 0。",
  },
];

export { blendModeLists, filterLists, backdropFilterLists };
