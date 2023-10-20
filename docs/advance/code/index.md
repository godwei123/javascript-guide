# 代码输出

## 其他

### 1、代码输出结果

```js
function side(arr) {
  arr[0] = arr[2];
}
function a(a, b, c = 3) {
  c = 10;
  side(arguments);
  return a + b + c;
}
a(1, 1, 1);
```

::: details 答案

```txt
12
```

function a(a, b, c = 3) 这里的 c，因为 a 函数加了默认值，所以就按 ES 的方式解析，函数中的参数就不会变了

```js
function side(arr) {
  arr[0] = arr[2];
}
function a(a, b, c = 3) {
  c = 10;
  console.log(arguments);
  side(arguments); // 这里 a，c的值不管怎么改变都是不会改变的
  return a + b + c;
}
a(1, 1, 1); //12
```

但是，如果是

```js
function side(arr) {
  arr[0] = arr[2];
}
function a(a, b, c) {
  c = 10;
  console.log(arguments);
  side(arguments); // 这里 a，c的值不管怎么改变都是不会改变的
  return a + b + c;
}
a(1, 1, 1); // 21
```

:::

### 2、代码输出结果

```js
var min = Math.min();
max = Math.max();
console.log(min < max);
```

::: details 答案

```txt
false
```

Math.min 的参数是 0 个或者多个，如果多个参数很容易理解，返回参数中最小的。如果没有参数，则返回 Infinity，无穷大。

而 Math.max 没有传递参数时返回的是-Infinity.所以输出 false
:::

### 3、代码输出结果

```js
var a = 1;
(function a() {
  a = 2;
  console.log(a);
})();
```

::: details 答案

```txt
ƒ  a () {
      a = 2;
      console.log(a);
 }
```

立即调用的函数表达式（IIFE） 有一个 自己独立的 作用域，如果函数名称与内部变量名称冲突，就会永远执行函数本身；所以上面的结果输出是函数本身；

立即执行的函数表达式(IIFE)的函数名称跟内部变量名称重名后，函数名称优先，因为函数名称是不可改变的，内部会静默失败，在严格模式下会报错

:::

### 4、代码输出结果

```js
(function () {
  var a = (b = 5);
})();
console.log(b);
console.log(a);
// 写出执行结果，并解释原因
```

::: details 答案

```txt
5
Error, a is not defined
```

在这个立即执行函数表达式（IIFE）中包括两个赋值操作，其中 a 使用 var 关键字进行声明，因此其属于函数内部的局部变量（仅存在于函数中），相反，b 被分配到全局命名空间。

另一个需要注意的是，这里没有在函数内部使用严格模式(use strict;)。如果启用了严格模式，代码会在输出 b 时报错 Uncaught ReferenceError: b is not defined,需要记住的是，严格模式要求你显式的引用全局作用域。

```js
(function () {
  "use strict";
  var a = (b = 5);
})();

console.log(b); //Uncaught ReferenceError: b is not defined

/*---------------------------*/

(function () {
  "use strict";
  var a = (window.b = 5);
})();

console.log(b); // 5
```

:::

### 5、代码输出结果

```js
var company = {
  address: "beijing",
};
var yideng = Object.create(company);
delete yideng.address;
console.log(yideng.address);
// 写出执行结果，并解释原因
```

::: details 答案

```txt
beijing
```

解析
这里的 yideng 通过 prototype 继承了 company 的 address。yideng 自己并没有 address 属性。所以 delete 操作符的作用是无效的。

知识点
1.delete 使用原则：delete 操作符用来删除一个对象的属性。
2.delete 在删除一个不可配置的属性时在严格模式和非严格模式下的区别:
（1）在严格模式中，如果属性是一个不可配置（non-configurable）属性，删除时会抛出异常;
（2）非严格模式下返回 false。
3.delete 能删除隐式声明的全局变量：这个全局变量其实是 global 对象(window)的属性
4.delete 能删除的：
（1）可配置对象的属性（2）隐式声明的全局变量 （3）用户定义的属性 （4）在 ECMAScript 6 中，通过 const 或 let 声明指定的 "temporal dead zone" (TDZ) 对 delete 操作符也会起作用
delete 不能删除的：
（1）显式声明的全局变量 （2）内置对象的内置属性 （3）一个对象从原型继承而来的属性
5.delete 删除数组元素：
（1）当你删除一个数组元素时，数组的 length 属性并不会变小，数组元素变成 undefined
（2）当用 delete 操作符删除一个数组元素时，被删除的元素已经完全不属于该数组。
（3）如果你想让一个数组元素的值变为 undefined 而不是删除它，可以使用 undefined 给其赋值而不是使用 delete 操作符。此时数组元素是在数组中的
6.delete 操作符与直接释放内存（只能通过解除引用来间接释放）没有关系。

7.其它例子
（1）下面代码输出什么？

```js
var output = (function (x) {
  delete x;
  return x;
})(0);
console.log(output);
```

答案：0，delete 操作符是将 object 的属性删去的操作。但是这里的 x 是并不是对象的属性， delete 操作符并不能作用。

（2）下面代码输出什么？

```js
var x = 1;
var output = (function () {
  delete x;
  return x;
})();
console.log(output);
```

答案：输出是 1。delete 操作符是将 object 的属性删去的操作。但是这里的 x 是并不是对象的属性， delete 操作符并不能作用。

（3）下面代码输出什么?

```js
x = 1;
var output = (function () {
  delete x;
  return x;
})();
console.log(output);
```

答案：报错 VM548:1 Uncaught ReferenceError: x is not defined,

（4）下面代码输出什么？

```js
var x = { foo: 1 };
var output = (function () {
  delete x.foo;
  return x.foo;
})();
console.log(output);
```

答案：输出是 undefined。x 虽然是全局变量，但是它是一个 object。delete 作用在 x.foo 上，成功的将 x.foo 删去。所以返回 undefined
:::

### 6、代码输出结果

```js
var foo = function bar() {
  return 12;
};
console.log(typeof bar());
// 写出执行结果，并解释原因
```

::: details 答案

```txt
输出是抛出异常，bar is not defined。
```

解析
这种命名函数表达式函数只能在函数体内有效

```js
typeof bar; // "undefined"
typeof foo(); // "number"
typeof foo; // "function"
typeof bar(); // Uncaught ReferenceError: bar is not defined
```

:::

### 7、代码输出结果

```js
var x = 1;
if (function f() {}) {
  x += typeof f;
}
console.log(x);
// 写出执行结果，并解释原因
```

::: details 答案

```txt
1undefined
```

解析
条件判断为假的情况有：0，false，''，null，undefined，未定义对象。函数声明写在运算符中，其为 true，**但放在运算符中的函数声明在执行阶段是找不到的。**另外，对未声明的变量执行 typeOf 不会报错，会返回 undefined
:::

### 8、代码输出结果

```js
["1", "2", "3"].map(parseInt);
```

::: details 答案

```txt
[1,NaN,NaN]
```

解析

1）Array.prototype.map()

array.map(callback[, thisArg])

callback 函数的执行规则

参数：自动传入三个参数

- currentValue（当前被传递的元素）；

- index（当前被传递的元素的索引）；

- array（调用 map 方法的数组）

2）parseInt 方法接收两个参数

第三个参数["1", "2", "3"]将被忽略。parseInt 方法将会通过以下方式被调用

parseInt("1", 0)

parseInt("2", 1)

parseInt("3", 2)

3）parseInt 的第二个参数 radix 为 0 时，ECMAScript5 将 string 作为十进制数字的字符串解析；

parseInt 的第二个参数 radix 为 1 时，解析结果为 NaN；

parseInt 的第二个参数 radix 在 2—36 之间时，如果 string 参数的第一个字符（除空白以外），不属于 radix 指定进制下的字符，解析结果为 NaN。

parseInt("3", 2)执行时，由于"3"不属于二进制字符，解析结果为 NaN。

:::

### 9、代码输出结果

```js
[typeof null, null instanceof Object];
```

::: details 答案

```txt
[object, false]
```

:::

### 10、代码输出结果

```js
function f() {}
const a = f.prototype,
  b = Object.getPrototypeOf(f);
console.log(a === b);
```

::: details 答案

```txt
false
```

f.prototype 是使用使用 new 创建的 f 实例的原型. 而 Object.getPrototypeOf 是 f 函数的原型.

a === Object.getPrototypeOf(new f()) // true

b === Function.prototype // true
:::

### 11、代码输出结果

```js
function showCase(value) {
  switch (value) {
    case "A":
      console.log("Case A");
      break;
    case "B":
      console.log("Case B");
      break;
    case undefined:
      console.log("undefined");
      break;
    default:
      console.log("Do not know!");
  }
}
showCase(new String("A"));
```

::: details 答案

```txt
Do not know!
```

switch 是严格比较, String 实例和 字符串不一样.

```js
var str1 = "str";
var str2 = new String("str");
console.log(typeof str1); // "string"
console.log(typeof str2); //"object"
```

:::

### 12、代码输出结果

```js
console.log([2, 1, 0].reduce(Math.pow));
console.log([].reduce(Math.pow));
console.log([1, 0].reduce(Math.pow));
console.log([3].reduce(Math.pow));
console.log([].reduce(Math.pow, 3));
```

::: details 答案

```txt
1
在没有初始值的空数组上调用 reduce 将报错。
1
3
3
```

:::

### 13、代码输出结果

```js
var arr = [0, 1];
arr[5] = 5;
newArr = arr.filter(function (x) {
  return x === undefined;
});
console.log(newArr.length);
```

::: details 答案

```txt
0
```

filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或等价于 true 的值的元素创建一个新数组。callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。
:::

### 14、代码输出结果

```js
// a 在什么情况下会打印 1
var a; // ?;
if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}
```

::: details 答案

```txt
//  方法1 -------------
var a = {
  i: 1,
  toString: function () {
    return a.i++;
  }
  // or
  valueOf() {
    return this.i++;
  }
}
//  方法2 -------------
var a = [1,2,3];
a.join = a.shift;
```

:::

### 15、代码输出结果

```js
const obj = {
  2: 3,
  3: 4,
  length: 2,
  splice: Array.prototype.splice,
  push: Array.prototype.push,
};
obj.push(1);
obj.push(2);
console.log(obj);
```

::: details 答案

```txt
Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
```

:::

### 16、代码输出结果

```js
const num = parseInt("2*4", 10);
console.log(num);
```

::: details 答案

```txt
2
```

只返回了字符串中第一个字母. 设定了 进制 后 (也就是第二个参数，指定需要解析的数字是什么进制: 十进制、十六机制、八进制、二进制等等), parseInt 检查字符串中的字符是否合法. 一旦遇到一个在指定进制中不合法的字符后，立即停止解析并且忽略后面所有的字符。 \*就是不合法的数字字符。所以只解析到 2，并将其解析为十进制的 2. num 的值即为 2
:::

### 17、代码输出结果

```js
const company = { name: "tom" };
Object.defineProperty(company, "address", { value: "北京" });
console.log(company);
console.log(Object.keys(company));
```

::: details 答案

```txt
{name: 'tom', address: '北京'}
['name']
```

通过 defineProperty 方法，我们可以给对象添加一个新属性，或者修改已经存在的属性。而我们使用 defineProperty 方法给对象添加了一个属性之后，属性默认为 不可枚举(not enumerable).

Object.keys 方法仅返回对象中 可枚举(enumerable) 的属性，因此只剩下了 name

用 defineProperty 方法添加的属性默认不可变。你可以通过 writable, configurable 和 enumerable 属性来改变这一行为。这样的话， 相比于自己添加的属性， defineProperty 方法添加的属性有了更多的控制权。
:::

### 18、代码输出结果

```js
let num = 10;
const increaseNumber = () => num++;
const increasePassedNumber = (number) => number++;
const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);
console.log(num1);
console.log(num2);
console.log(num);
```

::: details 答案

```txt
10
10
11
```

a++ 与 ++a 的区别
:::

### 19、代码输出结果

```js
const value = { number: 10 };
const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};
multiply();
multiply();
multiply(value);
multiply(value);
```

::: details 答案

```txt
20
20
20
40

/*
在ES6中，我们可以使用默认值初始化参数。如果没有给函数传参，或者传的参值为 "undefined" ，那么参数的值将是默认值。上述例子中，我们将 value 对象进行了解构并传到一个新对象中，因此 x 的默认值为 {number：10} 。

默认参数在调用时才会进行计算，每次调用函数时，都会创建一个新的对象。我们前两次调用 multiply 函数且不传递值，那么每一次 x 的默认值都为 {number：10} ，因此打印出该数字的乘积值为 20。

第三次调用 multiply 时，我们传递了一个参数，即对象 value。*=运算符实际上是 x.number=x.number*2的简写，我们修改了 x.number的值，并打印出值 20。

第四次，我们再次传递 value对象。x.number之前被修改为 20，所以 x.number*=2打印为 40。
*/
```

:::

### 20、代码输出结果

```js
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```

::: details 答案

```txt
1 2
undefined 3
undefined 4
```

:::

### 21、代码输出结果

```js
// index.js
console.log("running index.js");
import { sum } from "./sum.js";
console.log(sum(1, 2));

// sum.js
console.log("running sum.js");
export const sum = (a, b) => a + b;
```

::: details 答案

```txt
running sum.js
running index.js
3
```

import 命令是编译阶段执行的，在代码运行之前。因此这意味着被导入的模块会先运行，而导入模块的文件会后执行。
这是 CommonJS 中 require（）和 import 之间的区别。使用 require()，可以在运行代码时根据需要加载依赖项。

如果我们使用 require 而不是 import，则 running index.js、running sum.js、 3 会被依次打印。
:::

### 22、代码输出结果

```js
function addToList(item, list) {
  return list.push(item);
}
const result = addToList("company", ["yideng"]);
console.log(result);
```

::: details 答案

```txt
2
```

push()方法返回新数组的长度。一开始，数组包含一个元素（字符串 "yideng"），长度为 1。 在数组中添加字符串 "company"后，长度变为 2，并将从 addToList 函数返回。

push 方法修改原始数组，如果你想从函数返回数组而不是数组长度，那么应该在 push item 之后返回 list。
开发中一不小心会导致错误的地方
:::

### 23、写出解决方式

```js
var obj = { x: 1, y: 2, z: 3 };
[...obj]; // TypeError
// 能否以某种方式为上面的语句使用展开运算而不导致类型错误
// 如果可以，写出解决方式
```

::: details 答案

展开语法和 for-of 语句遍历 iterabl 对象定义要遍历的数据。Arrary 和 Map 是具有默认迭代行为的内置迭代器。对象不是可迭代的，但是可以通过使用 iterable 和 iterator 协议使它们可迭代。

在 Mozilla 文档中，如果一个对象实现了@iterator 方法，那么它就是可迭代的，这意味着这个对象(或者它原型链上的一个对象)必须有一个带有@iterator 键的属性，这个键可以通过常量 Symbol.iterator 获得。

```js
obj[Symbol.iterator] = function () {
  const _this = this;
  //也可使用: keys = Object.getOwnPropertyNames(this)
  const keys = Object.keys(this);
  let index = 0;
  return {
    next() {
      return {
        value: _this[keys[index++]],
        done: index > keys.length,
      };
    },
  };
};

obj[Symbol.iterator] = function* () {
  const values = Object.values(this);
  for (const value of values) {
    yield value;
  }
};
```

:::

### 24、代码输出结果

```js
function foo() {
  console.log(length);
}
function bar() {
  var length = "京程一灯";
  foo();
}
bar();
```

::: details 答案

```txt
0
```

输出结果是 0，因为 foo 函数是由 window 对象调用，打印的 length 是 window 对象下的 length 属性 0。foo 只是在 bar 函数内部调用，并不是在 bar 函数内部声明，所以无法获取到 bar 函数声明的 length 变量
:::

### 25、代码输出结果

```js
let ydObject = { ...null, ...undefined };
console.log(ydObject);
let ydArray = [...null, ...undefined];
console.log(ydArray);
```

::: details 答案

```txt
第一个打印一个空对象
第二个打印报错，是因为在数组和函数中使用展开语法时，只能用于可迭代对象
```

:::

### 26、代码输出结果

```js
const arrLike = {
  length: 4,
  0: 0,
  1: 1,
  "-1": 2,
  3: 3,
  4: 4,
};
console.log(Array.from(arrLike));
console.log(Array.prototype.slice.call(arrLike));
```

::: details 答案

```txt
[0, 1, undefined, 3]
[0, 1, 空白, 3]
```

:::

## 约瑟夫环

## 函数柯里化

## 合并有序数组

## 最长无重复子串

## 最长回文子串

## 斐波那契数列（尾递归优化）

## 翻转二叉树

## 最小栈,螺旋打印矩阵

## 根据 id 比较数组的差异

```javascript
// 根据 id 比较数组的差异，返回差异项，要求找出增加项，删除项，变更项
// id 不一定是有序的
const arr1 = [
  { id: 1, value: 100 },
  { id: 2, value: 400 },
  { id: 3, value: 200 },
];
const arr2 = [
  { id: 1, value: 100 },
  { id: 2, value: 200 },
  { id: 5, value: 200 },
  { id: 3, value: 300 },
  { id: 4, value: 700 },
];
```

手写题：LRU 的实现

场景题：长字符串在长文本的模式匹配，要求时间复杂度尽可能低（归并查找 + 模式匹配）
