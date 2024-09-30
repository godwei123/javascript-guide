# 类型和语法

## JS 数据类型

**基本类型:** Number、Boolean、String、Null、Undefined、Symbol、BigInt

**引用类型:** Object

## typeof

typeof 运算符返回一个字符串，表示未经计算的操作数的类型。变量未持有值时为 undefined ，此时 typeof 返回 undefined.

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

## 类型转换

[类型转换](./type-conversion.md)

## `symbol`

可以用来表示一个独一无二的变量防止命名冲突。 可以利用 `symbol` 不会被常规的方法（除了 `Object.getOwnPropertySymbols` 外）遍历到，所以可以用来模拟私有变量。 主要用来提供遍历接口，布置了 `symbol.iterator` 的对象才可以使用 `for···of` 循环，可以统一处理数据结构。调用之后回返回一个遍历器对象，包含有一个 next 方法，使用 next 方法后有两个返回值 value 和 done 分别表示函数当前执行位置的值和是否遍历完毕。

Symbol.for() 可以在全局访问 symbol 变量，Symbol.keyFor() 可以获取到全局 symbol 变量的 key。

## Array.from() & Array.of()

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

## Object.defineProperty()

**要注意有一个小小的例外：即便属性是 configurable:false，我们还是可以把 writable 的状态由 true 改为 false，但是无法由 false 改为 true。**

configurable:false 会禁止删除这个属性

writable:false,configurable:false 可以创建一个常量属性。

如果你想禁止一个对象添加新属性并且保留已有属性，可以使用 Object.preventExtensions(obj)

## Object.seal(..)

会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用 Object.preventExtensions(..)并把所有现有属性标记为 configurable:false。（不能添加新属性，不能重新配置或删除属性，**但可以修改属性值**）

## Object.freeze(..)

会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 Object.seal(..)并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们的值。（浅层）

## obj.propertyIsEnumerable("ab")

会检查给定的属性名是否直接存在于对象中（而不是在原型链上）并且满足 enumerable:true。

## Object.getOwnPropertyNames()

返回一个数组，包含所有属性，无论它们是否可枚举。

对象不可以使用 for...of 遍历，但是可以自定义迭代器实现
