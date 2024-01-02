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

instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

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
