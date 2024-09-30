---
create_time: 2024-09-09 22:03:55
author: god_wei
---

# css 变量 var

## CSS 变量

> 带有前缀`--`的属性名，比如`--example--name`，表示的是带有值的自定义属性，其可以通过 var 函数在全文档范围内复用的。CSS 自定义属性是可以级联的：每一个自定义属性可以多次出现，并且变量的值将会借助级联算法和自定义属性值运算出来。

声明一个自定义属性，属性名需要以两个减号（--）开始，属性值则可以是任何有效的 CSS 值。和其他属性一样，自定义属性也是写在规则集之内的。

```css
.element {
  --main-bg-color: #ccc;
}

:root {
  --main-bg-color: #ccc;
}
```

**备注：**

- 自定义属性名是大小写敏感的，`--my-color` 和 `--My-color` 会被认为是两个不同的自定义属性。
- CSS 变量不能是属性名
- 避免循环依赖

> 自定义属性会继承。这意味着如果在一个给定的元素上，没有为这个自定义属性设置值，在其父元素上的值会被使用。 局部作用域是优先于全局作用域的。

```html
<div class="one">
  <div class="two">
    <div class="three"></div>
    <div class="four"></div>
  </div>
</div>
```

```css
.two {
  --test: 10px;
}

.three {
  --test: 2em;
}
```

在这个情况下， var(--test) 的结果分别是：

- 对于元素 class="two" ：10px
- 对于元素 class="three" ：2em
- 对于元素 class="four" ：10px （继承自父属性）
- 对于元素 class="one" ：非法值，会变成自定义属性的默认值

注意，这些是自定义属性，并不是你在其他编程语言中遇到的实际的变量。这些值仅当需要的时候才会计算，而并不会按其他规则进行保存。比如，你不能为元素设置一个属性，然后让它从兄弟或旁支子孙规则上获取值。属性仅用于匹配当前选择器及其子孙。

::: tip
**var 函数**

var() 函数可以定义多个备用值(fallback value)，当给定值未定义时将会用备用值替换。这对于 Custom Elements 和 Shadow DOM 都很有用。

备用值并不是用于实现浏览器兼容性的，如果浏览器不支持 CSS 自定义属性，备用值也没什么用。它仅对支持 CSS 自定义属性的浏览器提供了一个备份机制，该机制仅当给定值未定义或是无效值的时候生效。

:::

```css
.two {
  width: var(--test, red);
  background-color: var(--my-var, var(--my-background, pink));
}
```

传统的 CSS 概念里，有效性和属性是绑定的，这对自定义属性来说并不适用。当自定义属性值被解析，浏览器不知道它们什么时候会被使用，所以必须认为这些值都是有效的。

不幸的是，即便这些值是有效的，但当通过 var() 函数调用时，它在特定上下文环境下也可能不会奏效。属性和自定义变量会导致无效的 CSS 语句，这引入了一个新的概念：计算时有效性。

```css
:root {
  --text-color: 16px;
}
p {
  color: blue;
}
p {
  color: var(--text-color);
}
```

毫不意外，浏览器将 --text-color 的值替换给了 var(--text-color)，但是 16px 并不是 color 的合法属性值。代换之后，该属性不会产生任何作用。浏览器会执行如下两个步骤：

检查属性 color 是否为继承属性。是，但是 `<p>` 没有任何父元素定义了 color 属性。转到下一步。将该值设置为它的默认初始值，比如 black。

**备注：**

当 CSS 属性的值对中存在语法错误，该行则会被忽略。然而如果自定义属性的值无效，它并不会被忽略，从而会导致该值被覆盖为默认值。

因此对于 CSS 变量的备用值，在替换的过程中，会有四种可能：

- 浏览器不支持 CSS 变量，带有 var()的代码行将会被忽略，将使用浏览器的默认值；
- 浏览器支持变量，并且该变量设置为正确值，则直接使用该变量；
- 浏览器支持变量，并且变量未设置为任何值，则直接使用备用值；
- 浏览器支持变量，并且该变量设置为无效值，则使用浏览器的默认值。

## JavaScript 操作 CSS 变量

```javascript
// 获取一个 Dom 节点上的 CSS 变量
// <p style="--my-var: red"></p>
element.style.getPropertyValue("--my-var");

// 获取任意 Dom 节点上的 CSS 变量
// p { --my-var: red;}
getComputedStyle(element).getPropertyValue("--my-var");

// 修改一个 Dom 节点上的 CSS 变量
element.style.setProperty("--my-var", jsVar + 4);
```

## CSS 变量应用

> 封装一个按钮，通过传入不同的 type，显示不同的颜色。

```html
<button class="btn" data-type="primary">按钮一</button>
<button class="btn" data-type="danger">按钮二</button>
<button class="btn" data-type="success">按钮三</button>
```

```css
:root {
  --btn-primary: #4e7bea;
  --btn-danger: #f31818;
  --btn-success: #43f848;
}

.btn {
  padding: 10px 20px;
  color: black;
}
button.btn.primary {
  background-color: var(--btn-primary);
}
button.btn.danger {
  background-color: var(--btn-danger);
}
button.btn.success {
  background-color: var(--btn-success);
}
```

```javascript
const elements = document.querySelectorAll(".btn");
for (let ele of elements) {
  let type = ele.dataset.type;
  ele.classList.add(type);
}
```
