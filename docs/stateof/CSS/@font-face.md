# @font-face

`@font-face` CSS 指定一个用于显示文本的自定义字体；字体能从远程服务器或者用户本地安装的字体加载。它允许网页开发者为其网页指定在线字体。通过这种作者自备字体的方式，`@font-face` 可以消除对用户电脑字体的依赖。 `@font-face` 不仅可以放在在 CSS 的最顶层，也可以放在 @规则 的条件规则组中。

如果提供了 local()函数，指定要在用户计算机上查找的字体名称，如果用户代理找到匹配项，则使用该本地字体。否则，将下载并使用使用 url()函数指定的字体资源。

通过允许作者提供自己的字体，@font-face 使设计内容成为可能，而不会局限于所谓的“网络安全”字体（即非常常见的字体，以至于它们被认为是普遍可用的）。能够指定要查找和使用本地安装的字体的名称，因此可以在基础之外自定义字体，同时无需依赖互联网连接即可这样做。

通常同时使用 url()和 local()，以便使用用户安装的字体副本（如果有），如果在用户的设备上找不到字体副本，则返回到下载字体副本。

- ascent-override

  定义字体的上升指标。

- descent-override

  定义字体的下降指标。

- font-display

  根据字体面是否以及何时下载并准备使用来确定字体面的显示方式。

- font-family

  指定一个名称，该名称将用作字体属性的字体面值。所指定的字体名字将会被用于 font 或 font-family 属性

- src

  远程字体文件位置的 URL 或者用户计算机上的字体名称，可以使用 local 语法通过名称指定用户的本地计算机上的字体 (src:local('Arial'); )。如果找不到该字体，将会尝试其他来源，直到找到它。

  指定包含字体数据的资源。这可以是远程字体文件位置的 URL，也可以是用户计算机上字体的名称。

  为了向浏览器提供有关字体资源格式的提示——以便它可以选择合适的格式——可以在`format()`函数中包含格式类型：可用的类型是 "woff","woff2","truetype","opentype","embedded-opentype" 和"svg"

- font-variant

  字体变体描述符已于 2018 年从规范中删除。支持 font-variant 值属性，但没有描述符等价物。

- font-stretch

  font-stretch 值。接受两个值来指定字体面支持的范围，例如 font-stretch: 50% 200%;

- font-style

  font-style 值。接受两个值来指定字体面支持的范围，例如 font-style: oblique 20deg 50deg;

- font-weight

  font-weight 值。接受两个值来指定字体面支持的范围，例如 font-weight: 100 400;

- font-feature-settings
  允许控制 OpenType 字体中的高级排版功能。

- font-variation-settings

  通过指定要变化的特征的四个字母轴名称及其变化值，允许对 OpenType 或 TrueType 字体变体进行低级控制。

- line-gap-override

  定义字体的行间隙度量。

- size-adjust

  定义与此字体关联的字形轮廓和指标的乘数。当以相同的字体大小渲染时，这使协调各种字体的设计变得更加容易。

- unicode-range

  在该 @font-face 中定义的 unicode 字体范围

## 注意

- 这里使用的 Web fonts 仍然受到同域限制 (字体文件必须和调用它的网页同一域), 但可以使用 HTTP access controls 解除这一限制。

- 因为这里没有为 TrueType(ttf), OpenType(otf) 和 Web Open File Format(WOFF) 字体定义 MIME，因此不能为这些字体类型设置特定的 MIME（实际上 WOFF 的 MIME 将会是 application/font-woff，但浏览器对此 MIME 的识别还不统一，其它字体情况也类似，可暂时使用 application/octet-stream）。

- 你不能在一个 CSS 选择器中定义 @font-face。
