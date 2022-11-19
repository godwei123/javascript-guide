# script — defer 和 async

- `async` 立即开始下载脚本，但不会阻止其他页面的动作，加载期间不应该修改 DOM（异步执行）
- `defer` 立即开始下载脚本，在文档解析和显示完成后再执行脚本（推迟执行）
- `script` 的 `src` 初始请求不受浏览器同源策略限制
- `integrity` 验证完整性

- `noscript` 浏览器不支持脚本时显示

# var、let、const

- var 声明的范围是函数作用域，let 声明的范围是块作用域

```javascript
if (true) {
  var name = "tom";
  console.log(name); // tom
}
console.log(name); //tom
```

- var 存在变量提升
- var 允许重复声明
- let 有暂时性死区
- var 全局作用域中声明的变量会成为 window 对象属性
- let 不能够条件声明
- const 声明必须初始化，不能够修改

# 数据类型

- null
- undefined
- string
- boolean
- number
- symbol
- object
- bigint

> null == undefined // true
>
> isFinite(num) //是不是有限大，即 JS 能够表示
>
> 0/0 // NaN
>
> 5/0 // Infinity
>
> NaN == NaN // false
>
> isNaN(num:any) // 不可以转换为数值返回 true
>
> null 和 undefined 没有 toString 方法
>
> String(null) //“null”
>
> String(undefined) //“undefined”
>
> 插值表达式插入的值${}会强制转为字符串

# typeof

- 对未声明的变量调用返回 undefined
- typeof null 返回 “object”
- 返回都是小写字符串
- typeof NaN // number

# Object.prototype.toString.call

# 数值转换

### 1、Number

- true 返回 1，false 返回 0
- null 返回 0
- undefined 返回 NaN
- 字符串，数字字符串返回数字，十六进制 0x 会转换为 10 进制，空字符串返回 0，其他 NaN
- 对象，调用 valueOf ，后调用 toString

### 2、parseInt

- 第二个参数 radix 可以指定进制数，按指定进制解析
- 空字符串返回 NaN
- 忽略小数点后的数
- 参数 radix 可选。表示要解析的数字的基数。**该值介于 2 ~ 36 之间**。如果省略该参数或其值为 0，则数字将以 10
  为基础来解析,如果它**以 “0x” 或 “0X” 开头，将以 16 为基数**。**如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。**
- 10 不是默认值

### 3、parseFloat

- 只有一个参数
- 忽略字符串开头的零
- 小数点后只有零返回整数
- 不会按进制解析，十六进制（“0xff”）返回 0

```js
["0x1", "0x2", "0x3"].map(parseInt)
// ["0x1", "0x2", "0x3"].map((item,index)=>{parseInt(item,index)})
// parseInt("0x1",0)  -> 0x开头，parseInt("0x1",16)  -> 1
// parseInt("0x2",1)  -> NaN
// parseInt("0x3",2)  -> 0

parseInt('77',40)
// 40 > 36 返回 NaN


1 + - + + + - + 1 的结果是 2
[ 'a', ,'b', ,].length 的结果是 4

```

# 模板字面量标签函数

- 第一个参数原始字符串数组，后面参数为每个表达式求值结果

```js
function sum(strings, a, b, c) {
  console.log(strings);
  console.log(a);
  console.log(b);
  console.log(c);
  return "res";
}
let a = 1;
let b = 2;
let data = sum`${a}+${b}=${a + b}`;
console.log(data);

// [ '', '+', '=', '' ]
// 1
// 2
// 3
// res
```

# Object

- Object.prototype.constructor()
- Object.prototype.hasOwnProperty() 当前对象是否存在给定属性
- Object.prototype.isPrototypeOf() 当前对象是不是另一个对象的原型
- Object.prototype.propertyIsEnumerable() 给定属性是否可以 for in 枚举
- Object.prototype.toLocaleString()
- Object.prototype.toString()
- Object.prototype.valueOf()

# 等于与不等于

- **null 和 undefined 不能转换为其他类型值再进行比较**
- 其中一个为布尔值，转换为数字
- 字符串和数字，字符串转换为数字
- 对象和其他，对象调用 valueOf
- NaN 和任何比较都是 false

# 垃圾回收

- 标记清理
- 引用计数（循环引用会出错）
- 垃圾回收策略周期执行

# Date

- Date 类型的 valueOf 返回日期毫秒表示
- 格式化
- 常见方法

# Regex

- 见正则表达式

# Math

- `Math.round()` 四舍五入
- `Math.floor()` 向下取整
- `Math.ceil()` 向上取整
- `Math.random()` [0,1)
- `Math.fround() ` 数值最接近的单精度浮点数表示

# String

- indexOf
- search
- slice 参数为负值，都按照（负值+字符串长度）处理
- splice
- substr。第一个参数为负值，则从后往前确定位置（负值+字符串长度），第二个负参数，转为 0
- substring。第一和第二个参数为负值，都转换为 0
- match
- replace

# JSON

- `JSON.stringify` 方法

`JSON.stringify()` 方法将一个 JavaScript 对象或值转换为 JSON 字符串，如果指定了一个 replacer 函数，则可以选择性地替换值，或者指定的
replacer 是数组，则可选择性地仅包含数组指定的属性。

## 语法

```
JSON.stringify(value[, replacer [, space]])
```

### 参数

- `value`

  将要序列化成 一个 JSON 字符串的值。

- `replacer` 可选

  如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的
  JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。

  replacer 参数可以是一个函数或者一个数组。作为函数，它有两个参数，键（key）和值（value），它们都会被序列化。

  在开始时, `replacer` 函数会被传入一个空字符串作为 `key` 值，代表着要被 `stringify` 的这个对象。随后每个对象或数组上的属性会被依次传入。

  函数应当返回 JSON 字符串中的 value, 如下所示:

  - 如果返回一个 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number),
    转换成相应的字符串作为属性值被添加入 JSON 字符串。
  - 如果返回一个 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String),
    该字符串作为属性值被添加入 JSON 字符串。
  - 如果返回一个 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
    , "true" 或者 "false" 作为属性值被添加入 JSON 字符串。
  - 如果返回任何其他对象，该对象递归地序列化成 JSON 字符串，对每个属性调用 replacer 方法。除非该对象是一个函数，这种情况将不会被序列化成
    JSON 字符串。
  - 如果返回 undefined，该属性值不会在 JSON 字符串中输出。

  **注意:** 不能用 replacer 方法，从数组中移除值（values），如若返回 undefined 或者一个函数，将会被 null 取代。

  如果 `replacer` 是一个数组，数组的值代表将被序列化成 JSON 字符串的属性名。

- `space` 可选

  指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为 10。该值若小于
  1，则意味着没有空格；如果该参数为字符串（当字符串长度超过 10 个字母，取其前 10 个字母），该字符串将被作为空格；如果该参数没有提供（或者为
  null），将没有空格。

  `space `参数用来控制结果字符串里面的间距。如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多
  10 个空格）；如果是一个字符串，则每一级别会比上一级别多缩进该字符串（或该字符串的前 10 个字符）。

### 返回值

一个表示给定值的 JSON 字符串。

### 异常

- 当在循环引用时会抛出异常[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) ("
  cyclic object value")（循环对象值）
- 当尝试去转换 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
  类型的值会抛出[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) ("
  BigInt value can't be serialized in JSON")（BigInt 值不能 JSON 序列化）.

`JSON.stringify()`将值转换为相应的 JSON 格式：

- 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。
- 如果一个被序列化的对象拥有 `toJSON` 方法，那么该 `toJSON`
  方法就会覆盖该对象默认的序列化行为：不是该对象被序列化，而是调用 `toJSON` 方法后的返回值会被序列化.
- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
- 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
- `undefined`、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 `null`
  （出现在数组中时）。**函数、undefined 被单独转换时，会返回 undefined**，如`JSON.stringify(function(){})`
  or `JSON.stringify(undefined)`.
- 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
- 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。
- Date 日期调用了 toJSON() 将其转换为了 string 字符串（同 Date.toISOString()），因此会被当做字符串处理。
- **NaN 和 Infinity 格式的数值及 null 都会被当做 null。**
- 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

# 内置对象

## Global

- isNaN
- isFinite
- parseInt
- parseFloat
- encodeURI 对整个 URI 编码，不会编码特殊字符
- encodeURIComponent 对 URI 组件部分编码，编码所有非标准字符
- decodeURI
- decodeURIComponent

# Map 和 Object

|          | Map | Object |
| -------- | --- | ------ |
| 内存占用 | 小  | 大     |
| 插入性能 | 快  |        |
| 查找速度 | 慢  |        |
| 删除性能 | 好  |        |

# WeakMap

- 键只能够是 Object 或者继承自 Object 的类型

# 迭代器和生成器

```
*function a(){}

yield  // 中间返回

yield* // 迭代一个可迭代对象

next() // yield会接受传递的参数
// 可传递参数，第一次调用next值不会被使用，因为这次调用是为了开始执行生成器函数
```

# 理解对象

## 属性

> 数据属性和访问器属性

### 数据属性

- `[[Configurable]]` 直接定义在对象上的属性默认值 true，设置为 false，则这个属性不能够从对象上删除，**
  定义为不可配置后，就不能再变回可配置**
- `[[Enumberable]]` 是否可以通过 for in 循环返回，直接定义在对象上的属性默认值 true，
- `[[Writable]]` 是否可以被修改，直接定义在对象上的属性默认值 true，
- `[[Value]]` 属性的值，默认值 undefined

### `Object.defineProperty()`

> 要修改属性默认特性，必须使用此方法

- 3 个参数，要给其添加属性的对象，属性名称，描述符对象（包含上面 4 个数据属性）

```js
let person = {};
Object.defineProperty(person, "name", {
  writable: false, //只读
  value: "tom",
});
```

- 对一个属性可以多次调用此方法，但 configurable 如果为 false，则会受到限制

- 调用`Object.defineProperty()`时，如果不指定，默认值都是 false

### 访问器属性

> getter 和 setter
>
> 典型应用场景，设置一个属性会导致一些其他的变化
>
> 获取函数和设置函数不一定都要定义。
>
> 只定义获取函数 get 意味着属性是只读的，尝试修改属性会被忽略。在严格模式下，尝试写入只定义了获取函数的属性会抛出错误。
>
> 只有一个设置函数 set 的属性是不能读取的，非严格模式下读取会返回 undefined，严格模式下会抛出错误。

- `[[Configurable]]`
- `[[Enumberable]]`
- `[[Get]]`
- `[[Set]]`

### Object.defineProperties()方法。

这个方法可以通过多个描述符一次性定义多个属性。

它接收两个参数：要为之添加或修改属性的对象和另一个描述符对象，其属性与要添加或修改的属性一一对应。

### Object.getOwnPropertyDescriptor()方法

可以取得指定属性的属性描述符。

这个方法接收两个参数：属性所在的对象和要取得其描述符的属性名。

返回值是一个对象，对于访问器属性包含 configurable、enumerable、get 和 set 属性，对于数据属性包含
configurable、enumerable、writable 和 value 属性。

### Object.getOwnPropertyDescriptors()静态方法

ECMAScript 2017 新增

这个方法实际上会在每个自有属性上调用 Object.getOwnPropertyDescriptor()并在一个新对象中返回它们。

### Object.assign()方法。

这个方法接收一个目标对象和一个或多个源对象作为参数，

然后将每个源对象中**可枚举**（Object.propertyIsEnumerable()返回 true）和**自有**（Object.hasOwnProperty()返回
true）属性复制到目标对象。以字符串和符号为键的属性会被复制。对每个符合条件的属性，这个方法会使用源对象上的[[Get]]
取得属性的值，然后使用目标对象上的[[Set]]设置属性的值。

**Object.assign()方法会修改目标对象，也会返回修改后的目标对象**

如果赋值期间出错，则操作会中止并退出，同时抛出错误。**Object.assign()没有“回滚”之前赋值的概念**，因此它是一个尽力而为、可能只会完成部分复制的方法。

### Object.is()

这个方法必须接收两个参数

这个方法与===很像

```js
Object.is(true, 1); // false
Object.is({}, {}); // false
Object.is("2", 2); // false

Object.is(+0, -0); // false
Object.is(+0, 0); // true
Object.is(-0, 0); // false

Object.is(NaN, NaN); // true ,
NaN === NaN; //false
```

1．属性值简写

2．可计算属性

3．简写方法名

4．对象解构

解构赋值不一定与对象的属性匹配。赋值的时候可以忽略某些属性，而如果引用的属性不存在，则该变量的值就是 undefined

也可以在解构赋值的同时定义默认值，这适用于前面刚提到的引用的属性不存在于源对象中的情况

解构在内部使用函数 ToObject()（不能在运行时环境中直接访问）把源数据结构转换为对象。这意味着在对象解构的上下文中，原始值会被当成对象。这也意味着（根据
ToObject()的定义）, **null 和 undefined 不能被解构**，否则会抛出错误。

解构对于引用嵌套的属性或赋值目标没有限制。为此，可以通过解构来复制对象属性

需要注意的是，涉及多个属性的解构赋值是一个输出无关的顺序化操作。**
如果一个解构表达式涉及多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分**

在函数参数列表中也可以进行解构赋值。对参数的解构赋值不会影响 arguments 对象，但可以在函数签名中声明在函数体内使用局部变量

# 创建对象

## 工厂模式

> 工厂模式虽然可以解决创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是什么类型）。

```javascript
function createPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  };
  return o;
}

let p1 = createPerson("tom", 12, "job1");
let p2 = createPerson("jerry", 18, "job2");
```

## 构造函数模式

```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
}

let p1 = new Person("tom", 12, "job1");
let p2 = new Person("jerry", 18, "job2");
```

要创建 Person 的实例，应使用 new 操作符。以这种方式调用构造函数会执行如下操作。

（1）在内存中创建一个新对象。

（2）这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。

（3）构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。

（4）执行构造函数内部的代码（给新对象添加属性）。

（5）**如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。**

> 定义自定义构造函数可以确保实例被标识为特定类型
>
> 构造函数不一定要写成函数声明的形式。赋值给变量的函数表达式也可以表示构造函数

构造函数与普通函数唯一的区别就是调用方式不同。除此之外，**构造函数也是函数**。并没有把某个函数定义为构造函数的特殊语法。任何函数只要使用
new 操作符调用就是构造函数，而不使用 new 操作符调用的函数就是普通函数。

**构造函数的主要问题在于，其定义的方法会在每个实例上都创建一遍。**要解决这个问题，可以把函数定义转移到构造函数外部.

## 原型模式

每个函数都会创建一个 prototype
属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。实际上，这个对象就是通过调用构造函数创建的对象的原型。使用原型对象的好处是，在它上面定义的属性和方法可以被对象实例共享。原来在构造函数中直接赋给对象实例的值，可以直接赋值给它们的原型，

```js
function Person() {}
Person.prototype.name = "tom";
Person.prototype.age = 12;
Person.prototype.job = "job";
Person.prototype.sayName = function () {
  console.log(this.name);
};
```

所有属性和 sayName()方法都直接添加到了 Person 的 prototype
属性上，构造函数体中什么也没有。但这样定义之后，调用构造函数创建的新对象仍然拥有相应的属性和方法。与构造函数模式不同，使用这种原型模式定义的属性和方法是由所有实例共享的。

### 理解原型

无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个 prototype 属性（指向原型对象）。默认情况下，所有原型对象自动获得一个名为
constructor 的属性，指回与之关联的构造函数。对前面的例子而言，Person.prototype.constructor 指向
Person。然后，因构造函数而异，可能会给原型对象添加其他属性和方法。

在自定义构造函数时，原型对象默认只会获得 constructor 属性，其他的所有方法都继承自
Object。每次调用构造函数创建一个新实例，这个实例的内部[[Prototype]]
指针就会被赋值为构造函数的原型对象。脚本中没有访问这个[[Prototype]]特性的标准方式，但 Firefox、Safari 和 Chrome
会在每个对象上暴露\_\_proto\_\_属性，通过这个属性可以访问对象的原型。在其他实现中，这个特性完全被隐藏了。关键在于理解这一点：实例与构造函数原型之间有直接的联系，但实例与构造函数之间没有。

![](../../public/epub_34336683_41.jpeg)

Object.create()来创建一个新对象，同时为其指定原型.

只要给对象实例添加一个属性，这个属性就会遮蔽（shadow）原型对象上的同名属性，也就是虽然不会修改它，但会屏蔽对它的访问。即使在实例上把这个属性设置为
null，也不会恢复它和原型的联系。不过，使用 delete 操作符可以完全删除实例上的这个属性，从而让标识符解析过程能够继续搜索原型对象。

hasOwnProperty()方法用于确定某个属性是在实例上还是在原型对象上。这个方法是继承自 Object 的，会在属性存在于调用它的对象实例上时返回
true

in 操作符会在可以通过对象访问指定属性时返回 true，无论该属性是在实例上还是在原型上。

```js
"name" in person1. // true
```

如果要**确定某个属性是否存在于原型上**，则可以像下面这样同时使用 hasOwnProperty()和 in 操作符

```js
function hasPropertyProperty(obj, name) {
  return !obj.hasOwnProperty(name) && name in obj;
}
// 不存在实例上，in操作符返回true
```

在 for-in 循环中使用 in 操作符时，可以通过对象访问且可以被枚举的属性都会返回，包括实例属性和原型属性。

遮蔽原型中不可枚举（[[Enumerable]]特性被设置为 false）属性的实例属性也会在 for-in 循环中返回，因为默认情况下开发者定义的属性都是可枚举的。

要获得对象上所有可枚举的实例属性，可以使用**Object.keys()方法**。这个方法接收一个对象作为参数，返回包含该对象所有可枚举属性名称的字符串数组。

如果想列出所有实例属性，无论是否可以枚举，都可以使用 Object.getOwnPropertyNames()

Object.getOwnPropertySymbols()方法与 Object.getOwnPropertyNames()类似，只是针对符号而已

Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()和 Object.assign()
的枚举顺序是确定性的。先以升序枚举数值键，然后以插入顺序枚举字符串和符号键。在对象字面量中定义的键以它们逗号分隔的顺序插入。

Object.values()返回对象值的数组，Object.entries()返回键/值对的数组。符号属性 symbol 会被忽略

通过原生对象的原型可以取得所有默认方法的引用，也可以给原生类型的实例定义新的方法。可以像修改自定义对象原型一样修改原生对象原型，因此随时可以添加方法。

> 原型模式也不是没有问题。首先，它弱化了向构造函数传递初始化参数的能力，会导致所有实例默认都取得相同的属性值。虽然这会带来不便，但还不是原型的最大问题。原型的最主要问题源自它的共享特性,来自包含引用值的属性。

# 继承

## 原型链继承

其基本思想就是通过原型继承多个引用类型的属性和方法。

重温一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针指向原型。如果原型是另一个类型的实例呢？那就意味着这个原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函数。这样就在实例和原型之间构造了一条原型链。这就是原型链的基本构想。

```js
function Parent() {
  this.parentVal = true;
}
Parent.prototype.getParentVal = function () {
  return this.parentVal;
};

function Children() {
  this.childrenVal = false;
}

Children.prototype = new Parent();

Children.prototype.getChildVal = function () {
  return this.childrenVal;
};

let instance = new Children();
console.log(instance.getParentVal()); //true
```

### 1.默认原型

实际上，原型链中还有一环。默认情况下，所有引用类型都继承自 Object，这也是通过原型链实现的。

### 2.原型与继承关系

#### instanceof

如果一个实例的原型链中出现过相应的构造函数，则 instanceof 返回 true

#### obj.prototype.isPrototypeOf(instance)

原型链中的每个原型都可以调用这个方法，只要原型链中包含这个原型，这个方法就返回 true

**以对象字面量方式创建原型方法会破坏之前的原型链，因为这相当于重写了原型链。**

#### 原型链的问题

原型链虽然是实现继承的强大工具，但它也有问题。

主要问题出现在**原型中包含引用值的时候**
。前面在谈到原型的问题时也提到过，原型中包含的引用值会在所有实例间共享，这也是为什么属性通常会在构造函数中定义而不会定义在原型上的原因。在使用原型实现继承时，原型实际上变成了另一个类型的实例。这意味着原先的实例属性摇身一变成为了原型属性。

原型链的第二个问题是，**子类型在实例化时不能给父类型的构造函数传参**
。事实上，我们无法在不影响所有对象实例的情况下把参数传进父类的构造函数。再加上之前提到的原型中包含引用值的问题，就导致原型链基本不会被单独使用。

## 盗用构造函数

在子类构造函数中调用父类构造函数。因为毕竟函数就是在特定上下文中执行代码的简单对象，所以可以使用 apply()和 call()
方法以新创建的对象为上下文执行构造函数。

```js
function Children() {
  Parent.call(this, ...args);
  this.childrenVal = false;
}
```

盗用构造函数的主要缺点，也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用。此外，子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。由于存在这些问题，盗用构造函数基本上也不能单独使用。

## 组合继承

组合继承（有时候也叫伪经典继承）综合了**原型链和盗用构造函数**
，将两者的优点集中了起来。基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

组合继承弥补了原型链和盗用构造函数的不足，是 JavaScript 中使用最多的继承模式。而且组合继承也保留了 instanceof 操作符和
isPrototypeOf()方法识别合成对象的能力。

## 原型式继承

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

本质上，object()方法是对传入的对象执行了一次浅复制

ECMAScript 5 通过增加**Object.create()方法将原型式继承的概念规范化**了。

这个方法接收两个参数：作为新对象原型的对象，以及给新对象定义额外属性的对象（第二个可选）。在只有一个参数时，Object.create()
与这里的 object()方法效果相同

Object.create()的第二个参数与 Object.defineProperties()的第二个参数一样：每个新增属性都通过各自的描述符来描述。以这种方式添加的属性会遮蔽原型对象上的同名属性。

> 原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。但要记住，属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的。

## 寄生式继承

寄生式继承背后的思路类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。

```js
function createAnother(original) {
  let clone = object(original); // 创建新对象
  clone.sayHi = function () {
    // 增强
    console.log("hello");
  };
  return clone; // 返回对象
}
```

寄生式继承同样适合主要关注对象，而不在乎类型和构造函数的场景。object()函数不是寄生式继承所必需的，任何返回新对象的函数都可以在这里使用。

**注意**：通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似。

## 寄生式组合继承

组合继承其实也存在效率问题。最主要的效率问题就是**父类构造函数始终会被调用两次**
：一次在是创建子类原型时调用，另一次是在子类构造函数中调用。本质上，子类原型最终是要包含超类对象的所有实例属性，子类构造函数只要在执行时重写自己的原型就行了。

**寄生式组合继承通过盗用构造函数继承属性**
，但使用混合式原型链继承方法。基本思路是不通过调用父类构造函数给子类原型赋值，而是取得父类原型的一个副本。说到底就是使用寄生式继承来继承父类原型，然后将返回的新对象赋值给子类原型。

```js
function inheritPrototype(subType, superType) {
  let prototype = object(superType.prototype); //创建对象
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; //赋值对象
}
```

原型链仍然保持不变，因此 instanceof 操作符和 isPrototypeOf()方法正常有效。**
寄生式组合继承可以算是引用类型继承的最佳模式。**

# 代理与反射

## 创建代理

```javascript
let proxy = new Proxy(target, handler); // 目标对象，处理程序对象
```

- 目标属性赋值会反映在两个对象上
- 代理属性赋值会反映在两个对象上
- Proxy.prototype 为 undefined
- 不能使用 instanceof，报错
- target === proxy // false

## 捕获器

每个处理程序对象可以包含零个或多个捕获器，每个捕获器都对应一种基本操作，可以直接或间接在代理对象上调用。每次在代理对象上调用这些基本操作时，代理可以在这些操作传播到目标对象之前先调用捕获器函数，从而拦截并修改相应的行为。

只有在**代理对象**上执行这些操作才会**触发捕获器**。在**目标对象**上执行这些操作仍然会产生正常的行为。

所有捕获器都可以访问相应的参数，基于这些参数可以重建被捕获方法的原始行为。比如，get()捕获器会接收到目标对象、要查询的属性和代理对象三个参数。

> 所有捕获器都可以基于自己的参数重建原始操作，但并非所有捕获器行为都像 get()
> 那么简单。因此，通过手动写码如法炮制的想法是不现实的。实际上，开发者并不需要手动重建原始行为，而是可以通过调用全局 Refect
> 对象上（封装了原始行为）的同名方法来轻松重建。

如果真想创建一个可以捕获所有方法，然后将每个方法转发给对应反射 API 的空代理，那么甚至不需要定义处理程序对象.

```js
const proxy = new proxy(target, Reflect);
```

使用捕获器几乎可以改变所有基本方法的行为，但也不是没有限制。根据 ECMAScript
规范，每个捕获的方法都知道目标对象上下文、捕获函数签名，而捕获处理程序的行为必须遵循**“捕获器不变式”**（trap
invariant）。捕获器不变式因方法不同而异，但通常都会防止捕获器定义出现过于反常的行为。比如，如果目标对象有一个不可配置且不可写的数据属性，那么在捕获器返回一个与该属性不同的值时，会抛出
TypeError

Proxy 也暴露了**revocable()方法**，这个方法支持**撤销代理对象与目标对象的关联**。撤销代理的操作是**不可逆的**
。而且，撤销函数（revoke()）是幂等的，调用多少次的结果都一样。撤销代理之后再调用代理会抛出 TypeError。

```js
const target = {
  foo: "bar",
};
const handler = {
  get() {
    return "intercepted";
  },
};
const { proxy, revoke } = Proxy.revocable(target, handler);
console.log(proxy.foo); // intercepted
console.log(proxy.foo); // bar
revoke();
console.log(proxy.foo); // TypeError
```

## 代理问题

- 代理中的 this，方法中的 this 通常指向调用这个方法的对象,WeakMap
- 代理与内部槽位

代理与内置引用类型（比如 Array）的实例通常可以很好地协同，但有些 ECMAScript 内置类型可能会依赖代理无法控制的机制，结果导致在代理上调用某些方法会出错。

一个典型的例子就是 Date 类型。根据 ECMAScript 规范，Date 类型方法的执行依赖 this 值上的内部槽位[[NumberDate]]
。代理对象上不存在这个内部槽位，而且这个内部槽位的值也不能通过普通的 get()和 set()操作访问到，于是代理拦截后本应转发给目标对象的方法会抛出
TypeError

## 代理捕获器与反射方法

### 1.get()

get()捕获器会在获取属性值的操作中被调用。

1．返回值

无限制

2．拦截的操作

- proxy.property
- proxy[property]
- Object.create(proxy)[property]
- Refect.get(proxy, property, receiver)

3．捕获器处理程序参数

- target：目标对象。
- property：引用的目标对象上的字符串键属性。
- receiver：代理对象或继承代理对象的对象。

4．捕获器不变式

如果 target.property**不可写且不可配置**，则处理程序返回的值必须与 target.property 匹配。

如果 target.property**不可配置且[[Get]]特性为 undefined**，处理程序的返回值也必须是 undefined。

### 2.set()

set()捕获器会在设置属性值的操作中被调用。

1．返回值

返回 true 表示成功；返回 false 表示失败，严格模式下会抛出 TypeError。

2．拦截的操作

- proxy.property = value
- proxy[property] = value
- Object.create(proxy)[property] = value
- Reflect.set(proxy, property, value, receiver)

3．捕获器处理程序参数

- target：目标对象。
- property：引用的目标对象上的字符串键属性。
- value：要赋给属性的值。
- receiver：接收最初赋值的对象。

4．捕获器不变式

如果 target.property 不可写且不可配置，则不能修改目标属性的值。

如果 target.property 不可配置且[[Set]]特性为 undefined，则不能修改目标属性的值。

在严格模式下，处理程序中返回 false 会抛出 TypeError。

### 3.has()

has()捕获器会在 in 操作符中被调用。

1．返回值

has()必须返回布尔值，表示属性是否存在。返回非布尔值会被转型为布尔值。

2．拦截的操作

- property in proxy
- property in Object.create(proxy)
- with(proxy) {(property); }
- Reflect.has(proxy, property)

3．捕获器处理程序参数

- target：目标对象。
- property：引用的目标对象上的字符串键属性。

4．捕获器不变式

如果 target.property 存在且不可配置，则处理程序必须返回 true。

如果 target.property 存在且目标对象不可扩展，则处理程序必须返回 true。

### 4.defineProperty()

defineProperty()捕获器会在 Object.defineProperty()中被调用

1．返回值

defineProperty()必须返回布尔值，表示属性是否成功定义。返回非布尔值会被转型为布尔值。

2．拦截的操作

Object.defineProperty(proxy, property, descriptor)

Refect.defineProperty(proxy, property, descriptor)

3．捕获器处理程序参数

target：目标对象。

property：引用的目标对象上的字符串键属性。

descriptor：包含可选的 enumerable、configurable、writable、value、get 和 set 定义的对象。

4．捕获器不变式

如果目标对象不可扩展，则无法定义属性。

如果目标对象有一个可配置的属性，则不能添加同名的不可配置属性。

如果目标对象有一个不可配置的属性，则不能添加同名的可配置属性。

### 5.getOwnPropertyDescription()

getOwnPropertyDescriptor()捕获器会在 Object.getOwnPropertyDescriptor()中被调用。

1．返回值

getOwnPropertyDescriptor()必须返回对象，或者在属性不存在时返回 undefined。

2．拦截的操作

Object.getOwnPropertyDescriptor(proxy, property)

Refect.getOwnPropertyDescriptor(proxy, property)

3．捕获器处理程序参数

target：目标对象。

property：引用的目标对象上的字符串键属性。

4．捕获器不变式

如果自有的 target.property 存在且不可配置，则处理程序必须返回一个表示该属性存在的对象。

如果自有的 target.property 存在且可配置，则处理程序必须返回表示该属性可配置的对象。

如果自有的 target.property 存在且 target 不可扩展，则处理程序必须返回一个表示该属性存在的对象。

如果 target.property 不存在且 target 不可扩展，则处理程序必须返回 undefined 表示该属性不存在。

如果 target.property 不存在，则处理程序不能返回表示该属性可配置的对象。

### 6.deleteProperty()

deleteProperty()捕获器会在 delete 操作符中被调用。

1．返回值

deleteProperty()必须返回布尔值，表示删除属性是否成功。返回非布尔值会被转型为布尔值。

2．拦截的操作

delete proxy.property

delete proxy[property]

Reflect.deleteProperty(proxy, property)

3．捕获器处理程序参数

target：目标对象。

property：引用的目标对象上的字符串键属性。

4．捕获器不变式

如果自有的 target.property 存在且不可配置，则处理程序不能删除这个属性。

### 7.ownKeys()

ownKeys()捕获器会在 Object.keys()及类似方法中被调用。

1．返回值

ownKeys()必须返回包含字符串或符号的可枚举对象。

2．拦截的操作

Object.getOwnPropertyNames(proxy)

Object.getOwnPropertySymbols(proxy)

Object.keys(proxy)

Refect.ownKeys(proxy)

3．捕获器处理程序参数

- target：目标对象。

4．捕获器不变式

返回的可枚举对象必须包含 target 的所有不可配置的自有属性。

如果 target 不可扩展，则返回可枚举对象必须准确地包含自有属性键。

### 8.getPrototypeOf()

getPrototypeOf()捕获器会在 Object.getPrototypeOf()中被调用

### 9.setPrototypeOf()

setPrototypeOf()捕获器会在 Object.setPrototypeOf()中被调用

### 10.isExtensible()

isExtensible()捕获器会在 Object.isExtensible()中被调用

### 11.preventExtensions()

preventExtensions()捕获器会在 Object.preventExtensions()中被调用

### 12.apply()

apply()捕获器会在调用函数时中被调用。

### 13.construct()

construct()捕获器会在 new 操作符中被调用。

## 代理模式

- 跟踪属性访问 get，set
- 隐藏属性 has
- 属性验证
- 函数与构造函数参数验证，apply，construct
- 数据绑定与可观察对象

# 函数

箭头函数不能使用 arguments、super 和 new.target，也不能用作构造函数。此外，箭头函数也没有 prototype 属性。

即使函数没有名称，也会如实显示成空字符串。如果它是使用 Function 构造函数创建的，则会标识成"anonymous"

如果函数是一个获取函数、设置函数，或者使用 bind()实例化，那么标识符前面会加上一个前缀

arguments 对象可以跟命名参数一起使用

arguments 对象的另一个有意思的地方就是，它的值始终会与对应的命名参数同步

如果函数是使用箭头语法定义的，那么传给函数的参数将不能使用 arguments 关键字访问，而只能通过定义的命名参数访问。

没有重载。

在使用默认参数时，arguments 对象的值不反映参数的默认值，只反映传给函数的参数

这里的默认参数会按照定义它们的顺序依次被初始化；后定义默认值的参数可以引用先定义的参数

因为收集参数的结果可变，所以只能把它作为最后一个参数：

箭头函数虽然不支持 arguments 对象，但支持收集参数的定义方式

因为函数声明会在任何代码执行之前先被读取并添加到执行上下文。这个过程叫作**函数声明提升**

函数表达式不会声明提升，需定义完以后才可以调用，否则出错

arguments 对象其实还有一个 callee 属性，是一个指向 arguments 对象所在函数的指针。将函数与名称解耦，

特殊的对象是 this，它在标准函数和箭头函数中有不同的行为。

在标准函数中，this 引用的是把函数当成方法调用的上下文对象，这时候通常称其为 this 值（在网页的全局上下文中调用函数时，this 指向
windows）

在箭头函数中，this 引用的是定义箭头函数的上下文

在事件回调或定时回调中调用某个函数时，this 值指向的并非想要的对象。此时将回调函数写成箭头函数就可以解决问题。这是因为箭头函数中的
this 会保留定义该函数时的上下文。

```js
function King() {
  this.name = "tom";
  setTimeout(() => {
    console.log(this.name); //tom
  }, 1000);
}
function King() {
  this.name = "tom";
  setTimeout(function () {
    console.log(this.name); // undefined
  }, 1000);
}
```

函数对象一个属性：caller,这个属性引用的是调用当前函数的函数，或者如果是在全局作用域中调用的则为 null。

ECMAScript 中的函数始终可以作为构造函数实例化一个新对象，也可以作为普通函数被调用。

ECMAScript 6 新增了**检测函数是否使用 new 关键字调用的 new.target 属性**。如果函数是正常调用的，则 new.target 的值是
undefined；如果是使用 new 关键字调用的，则 new.target 将引用被调用的构造函数。

ECMAScript 中的函数是对象，因此有属性和方法。**每个函数都有两个属性：length 和 prototype。**其中，length
属性保存函数定义的命名参数的个数.prototype 属性也许是 ECMAScript 核心中最有趣的部分。prototype 是保存引用类型所有实例方法的地方，这意味着
toString()、valueOf()等方法实际上都保存在 prototype 上，进而由所有实例共享。这个属性在自定义类型时特别重要。（相关内容已经在第
8 章详细介绍过了。）在 ECMAScript 5 中，prototype 属性是不可枚举的，因此使用 for-in 循环不会返回这个属性。

函数还有两个方法：apply()和 call()。这两个方法都会以指定的 this 值来调用函数，即会设置调用函数时函数体内 this
对象的值。apply()方法接收两个参数：函数内 this 的值和一个参数数组。第二个参数可以是 Array 的实例，但也可以是 arguments 对象。

创建函数并赋值给变量的能力也可以用于在一个函数中把另一个函数当作值返回

使用 IIFE 可以模拟块级作用域，即在一个函数表达式内部声明变量，然后立即调用这个函数。这样位于函数体作用域的变量就像是在块级作用域中一样。

**IIFE 用途的一个实际的例子，就是可以用它锁定参数值。**

可以访问私有变量的公共方法叫作特权方法。

# Promise

期约是一个有状态的对象，可能处于如下 3 种状态之一：

- 待定（pending）
- 兑现（fulfilled，有时候也称为“解决”, resolved）
- 拒绝（rejected）

通过调用 Promise.resolve()静态方法，可以实例化一个解决的期约。

Promise.reject()会实例化一个拒绝的期约并抛出一个异步错误（这个错误不能通过 try/catch 捕获，而只能通过拒绝处理程序捕获）

传给 then()的任何非函数类型的参数都会被静默忽略。如果想只提供 onRejected 参数，那就要在 onResolved 参数的位置上传入
undefined。

正常情况下，在通过 throw()关键字抛出错误时，JavaScript 运行时的错误处理机制会停止执行抛出错误之后的任何指令.

但是，在期约中抛出错误时，因为错误实际上是从消息队列中异步抛出的，所以并不会阻止运行时继续执行同步指令.
