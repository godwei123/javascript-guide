# basic-shape

`<basic-shape>` 是一种表现基础图形的 CSS 数据类型，作用于`clip-path` 与 `shape-outside` 属性中。

当构建一个图形时，运用了 `<basic-shape>` 值的属性就会定义一个相关的盒模型。基础图形使用的坐标系统即设置相关的盒模型左上角顶点为原点，该坐标轴的 x 轴正方向为右、y 轴的正方向为下。所有以百分比定义的长度将通过相关盒模型与使用的维度重定义。

图形函数

- inset()

定义了一个长方形。

```text
inset( <shape-arg>{1,4} [round <border-radius>]? )
```

上式的前四个参数分别代表了插进的长方形与相关盒模型上，右，下与左边界和顶点的偏移量。这些参数遵循边际速记语法（the syntax of the margin shorthand），所以给予一个、两个、或四个值都能设置四个偏移量。
可选参数`<border-radius>`用于定义插进长方形顶点的圆弧角度，该参数同上遵循边际速记语法（the syntax of the margin shorthand），给予一个、两个、或四个值都能设置四个偏移量。
如果一对插进图形在通过堆叠产生的高于当前使用维度的维度中（例如，左右插进图像相叠 75%）将会定义一个包围不了任何区域的图形。这种情况会在元素中产生一个空白且平坦的区域。

- circle()

  使用一个半径和一个位置定义一个圆形。

```text
circle( [<shape-radius>]? [at <position>]? )
```

`<shape-radius>` 参数代表了 _r，_ 即圆形的半径，不接受负数作为该参数的值。一个以百分比表示的值将以公式 `sqrt(width^2+height^2)/sqrt(2)`计算，其中 width 与 height 为相关盒模型的宽与高。

position 参数定义了圆心的位置。省缺值为盒模型的中心。

- ellipse()

  使用两个半径和一个位置定义一个椭圆。

```text
ellipse( [<shape-radius>{2}]? [at <position>]? )
```

`<shape-radius>` 参数代表了 rx 与 ry，其中 rx 代表了 x 轴方向的半径，ry 代表了 y 轴方向的半径。该参数不接受负数值。以百分比表示的长度将把盒模型的宽与高作为参照，宽作为 rx 的参照值，高作为 ry 的参照值。

`<position>`参数定义了椭圆形圆心的位子。其省缺值为盒模型的中心。

- polygon()

  使用一个 SVG `fill-rule` 和一组顶点定义一个多边形.

```text
polygon( [<fill-rule>,]? [<shape-arg> <shape-arg>]# )
```

`<fill-rule>` 代表了填充规则 filling rule，即，如何填充该多边形。可选值为 non zero 和 even odd。该参数的省缺值为 nonzero。

每一对在列表中的参数都代表了多边形顶点的坐标，_xi_ 与 _yi_，i 代表顶点的编号，即，第 i 个顶点。

- path()

  使用一个 SVG `fill-rule` 和 SVG 路径定义来定义一个形状。

```text
path( [<fill-rule>,]? <string>)
```

可选的 `<fill-rule>` 表示 `fill-rule` 填充规则。可选 `nonzero`（非零环绕规则）和 `evenodd`（奇偶规则）。如果省略，则默认是 `nonzero`。

参数 `<string>` 是用引号包含的 SVG Path 字符串

```text
<shape-arg> = <length> | <percentage>
<shape-radius> = <length> | <percentage> | closest-side | farthest-side
```

为一个圆形或椭圆形定义一个半径。其省缺值为 `closest-side`。

`closest-side` 即图形中心到盒模型最近一条边之间的距离。对于圆形，该值在任意维度都表示最近的一条边。对于椭圆形，该值为半径维度最近的一条边。

`farthest-side` 取图形中心到盒模型最远一条边之间的距离作为值。对于圆形，该值在任意维度都是最远的一条边。对于椭圆形，该值为半径维度最远的一条边。

在 `<basic-shape>` 函数中的值通过指定的方式计算，但是有下列情况会出现错误：

- 遗漏值（omitted values）参与到了省缺值的计算中。
- 在 `circle()` 或 `ellipse()` 函数中的 position 值被作为一对（水平的或垂直的）从左上原点的偏移值，每一次这样的计算将会给出绝对长度与百分比的结合。
- 一个在 `inset()`中的 border-radius 值，往往被当作一个扩展列表来计算，所有八个 length 值或百分比代表的值都是如此。
