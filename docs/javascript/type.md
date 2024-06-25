# 类型和语法

## JS 数据类型

**基本类型:** Number、Boolean、String、Null、Undefined、Symbol、BigInt

**引用类型:** Object

## typeof

typeof 运算符返回一个字符串，表示未经计算的操作数的类型。

变量未持有值时为 undefined ，此时 typeof 返回 undefined.

```js
typeof undefined === "undefined"; // true
typeof true === "boolean"; // true
typeof 42 === "number"; // true
typeof "42" === "string"; // true
typeof { life: 42 } === "object"; // true
typeof Symbol() === "symbol"; // true
typeof null === "object"; // true
typeof function a() {} === "function"; // true
typeof NaN === "number"; // true
```

## instanceof

instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。基本类型不能使用 instanceof 运算符。

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car("Honda", "Accord", 1998);
console.log(auto instanceof Car); // true
console.log(auto instanceof Object); // true

let date = new Date();
date instanceof Date; // true
date instanceof Object; // true
date instanceof Array; // false
```

## Object.prototype.toString.call()

Object.prototype.toString.call() 方法：这是一种更准确的类型判断方法，可以判断出更多类型的数据，但是使用起来不太方便，需要借助 call 或者 apply 来调用。

```js
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call("2"); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(function () {}); // "[object Function]"
Object.prototype.toString.call(new Date()); // "[object Date]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call(/abc/); // "[object RegExp]"
Object.prototype.toString.call(new Error()); // "[object Error]"
```

## Array.isArray()

Array.isArray() 方法：用于确定传递的值是否是一个 Array。

```js
Array.isArray([1, 2, 3]); // true
Array.isArray({ foo: 123 }); // false
Array.isArray("foobar"); // false
Array.isArray(undefined); // false
```

## constructor

constructor 属性：返回对创建此对象的数组函数的引用。

```js
let arr = [1, 2, 3];
arr.constructor === Array; // true

let num = 1;
num.constructor === Number; // true

let str = "Hello";
str.constructor === String; // true
```

## Null & Undefined

undefined 类型只有一个值，即 undefined。null 类型也只有一个值，即 null。 它们的名称既是类型也是值。undefined 和 null 常被用来表示“空的”值或“不是值”的值。二者之间有一些细微的差别。

例如：

• null 指空值（empty value）

• undefined 指没有值（missing value）

或者：

• undefined 指从未赋值

• null 指曾赋过值，但是目前没有值

null 是一个特殊关键字，不是标识符，我们不能将其当作变量来使用和赋值。

然而 undefined 却是一个标识符，可以被当作变量来使用和赋值。

## NaN

NaN 非自反 NaN !== NaN => true

全局工具函数 isNaN(...) 判断一个值是否是 NaN. (不建议使用),从 ES6 开始我们可以使用工具函数 Number.isNaN(..)。

```js
isNaN(a); //true
isNaN("foo"); //true
Number.isNaN(a); //true
Number.isNaN("foo"); //false

Infinity / Infinity; //  NaN
```

**我们应该尽量使用 Number.isNaN(..)这样可靠的方法**

## 原生函数

原生函数可以被当作构造函数来使用. 例如: new Array(1, 2, 3) 会构造出 [1, 2, 3] 数组.

原生函数有很多种, 例如:

- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()

## 类型转换

[类型转换](./type-conversion.md)

## 问：`symbol` 有什么用处

可以用来表示一个独一无二的变量防止命名冲突。

可以利用 `symbol` 不会被常规的方法（除了 `Object.getOwnPropertySymbols` 外）遍历到，所以可以用来模拟私有变量。

主要用来提供遍历接口，布置了 `symbol.iterator` 的对象才可以使用 `for···of` 循环，可以统一处理数据结构。调用之后回返回一个遍历器对象，包含有一个 next 方法，使用 next 方法后有两个返回值 value 和 done 分别表示函数当前执行位置的值和是否遍历完毕。

Symbol.for() 可以在全局访问 symbol 变量，Symbol.keyFor() 可以获取到全局 symbol 变量的 key。

## 问：new 一个构造函数，如果函数返回 `return {}` 、 `return null` ， `return 1`， `return true` 会发生什么情况？

如果函数返回一个对象，那么 new 这个函数调用返回这个函数的返回对象，否则返回 new 创建的新对象

## (3)箭头函数和普通函数有啥区别？箭头函数能当构造函数吗？

- 普通函数通过 function 关键字定义， this 无法结合词法作用域使用，在运行时绑定，只取决于函数的调用方式，在哪里被调用，调用位置。（取决于调用者，和是否独立运行）

- 箭头函数使用被称为 “胖箭头” 的操作 `=>` 定义，箭头函数不应用普通函数 this 绑定的四种规则，而是根据外层（函数或全局）的作用域来决定 this，且箭头函数的绑定无法被修改（new 也不行）。

- - 一个函数内部有两个方法：[[Call]] 和 [[Construct]]，在通过 new 进行函数调用时，会执行 [[construct]] 方法，创建一个实例对象，然后再执行这个函数体，将函数的 this 绑定在这个实例对象上
- 当直接调用时，执行 [[Call]] 方法，直接执行函数体
- 箭头函数没有 [[Construct]] 方法，不能被用作构造函数调用，当使用 new 进行函数调用时会报错。
- 箭头函数常用于回调函数中，包括事件处理器或定时器
- 箭头函数和 var self = this，都试图取代传统的 this 运行机制，将 this 的绑定拉回到词法作用域
- 没有原型、没有 this、没有 super，没有 arguments，没有 new.target
- 不能通过 new 关键字调用

```
function foo() {
  return (a) => {
    console.log(this.a);
  }
}

var obj1 = {
  a: 2
}

var obj2 = {
  a: 3
}

var bar = foo.call(obj1);
bar.call(obj2);
```

### 参考资料

- https://segmentfault.com/a/1190000015162781

## isNaN 和 Number.isNaN 函数的区别？

## var、let、const

- var 声明的范围是函数作用域，let 声明的范围是块作用域
- var 存在变量提升
- var 允许重复声明
- let 有暂时性死区
- var 全局作用域中声明的变量会成为 window 对象属性
- let 不能够条件声明
- const 声明必须初始化，不能够修改

## Array 常见方法

| 方法        | 方法          | 方法         | 方法             | 方法         |
| ----------- | ------------- | ------------ | ---------------- | ------------ |
| concat()    | every()       | fill()       | filter()         | find()       |
| findIndex() | flat()        | flatMap()    | forEach()        | Array.from() |
| Array.of()  | includes()    | indexOf()    | isArray()        | join()       |
| keys()      | lastIndexOf() | map()        | pop()            | push()       |
| reduce()    | reduceRight() | reverse()    | shift()          | slice()      |
| some()      | sort()        | splice()     | toLocaleString() | toString()   |
| unshift()   | values()      | copyWithin() | lastIndexOf()    | fill()       |

### Array.from() & Array.of()

`Array.from()` 和 `Array.of()` 是 JavaScript 中的两个数组方法，它们的主要区别在于它们的用途和参数。

`Array.from()` 方法从类数组对象或可迭代对象创建一个新的数组实例。类数组对象包括具有 length 属性和可索引元素的对象，或者可迭代对象如 Set 和 Map。例如：

```javascript
let set = new Set(["a", "b", "c"]);
let arrFromSet = Array.from(set);
console.log(arrFromSet); // Output: ['a', 'b', 'c']
```

`Array.of()` 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。例如：

```javascript
let arrOfNumbers = Array.of(1, 2, 3);
console.log(arrOfNumbers); // Output: [1, 2, 3]
```

所以，`Array.from()` 主要用于将类数组对象或可迭代对象转换为数组，而 `Array.of()` 主要用于创建一个新的数组实例。

### other

使用 delete 运算符可以将单元从数组中删除，但是请注意，单元删除后，数组的 length 属性并不会发生变化。删除的位置变为 <1 empty
item>

```js
let nums = [];
nums[0] = 1;
nums[2] = 3;
console.log(nums[1]); //undefined
```

其中的“空白单元”（empty slot）可能会导致出人意料的结果。a[1]的值为 undefined，但这与将其显式赋值为 undefined（a[1]
=undefined）还是有所区别。

如果字符串键值能够被强制类型转换为十进制数字的话，它就会被当作数字索引来处理。`a['13']=2; a.length => 14`

类数组 => 数组

```js
Array.from(arguments);

Array.prototype.slice.call(arguments);
```

## String 常见方法

| 方法                  | 方法                   | 方法          | 方法          |
| --------------------- | ---------------------- | ------------- | ------------- |
| charAt()              | charCodeAt()           | codePointAt() | concat()      |
| String.fromCharCode() | String.fromCodePoint() | includes()    | indexOf()     |
| localeCompare()       | match()                | matchAll()    | normalize()   |
| padStart()            | String.raw()           | repeat()      | replace()     |
| search()              | slice()                | split()       | startsWith()  |
| toLocaleLowerCase()   | toLocaleUpperCase()    | toLowerCase() | toString()    |
| trim()                | trimEnd()              | trimStart()   | valueOf()     |
| endsWith()            | endsWith()             | lastIndexOf() | padEnd()      |
| padEnd()              | replaceAll()           | substring()   | toUpperCase() |

## Object.defineProperty()

**要注意有一个小小的例外：即便属性是 configurable:false，我们还是可以把 writable 的状态由 true 改为 false，但是无法由 false 改为 true。**

configurable:false 会禁止删除这个属性

writable:false,configurable:false 可以创建一个常量属性。

如果你想禁止一个对象添加新属性并且保留已有属性，可以使用 Object.preventExtensions(obj)

## Object.seal(..)

会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用 Object.preventExtensions(..)并把所有现有属性标记为 configurable:false。（不能添加新属性，不能重新配置或删除属性，**但可以修改属性值**）

## Object.freeze(..)

会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 Object.seal(..)并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们的值。（浅层）

obj.hasOwnProperty("ab")判断对象是否存在这个属性。（只检查当前对像）

## in 操作符

注意：看起来 in 操作符可以检查容器内是否有某个值，但是它实际上检查的是某个属性名是否存在。对于数组来说这个区别非常重要，4 in [2, 4, 6]的结果并不是你期待的 True，因为[2, 4, 6]这个数组中包含的属性名是 0、1、2，没有 4。

## obj.propertyIsEnumerable("ab")

会检查给定的属性名是否直接存在于对象中（而不是在原型链上）并且满足 enumerable:true。

## Object.keys(..)

返回一个数组，包含所有可枚举属性

## Object.getOwnPropertyNames(..)

返回一个数组，包含所有属性，无论它们是否可枚举。

对象不可以使用 for...of 遍历，但是可以自定义迭代器实现

## 问：如何判断一个对象是不是空对象？
