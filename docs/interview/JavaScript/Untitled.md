> 语法、数据类型、运算、对象、function、继承、闭包、作用域、原型链、事件、RegExp、JSON、Ajax、DOM、BOM、内存泄漏、跨域、异步加载、模板引擎、前端 MVC、前端 MVVM、路由、模块化、Http、Canvas、jQuery、EMCAScript、ES6、NodeJS、Vue、React

## 1、变量及变量提升

- 变量声明

有三种：var、let、const

- 变量名

区分大小写，必须以字母、下划线（\_）或者美元符号（$）开头，后续可以是数字或字母

- 变量的作用域

声明在所有函数之外的叫全局作用域，可以被这个模块中的所有代码访问。
声明在函数内部的叫局部作用域，只能被该函数内部访问

### 变量声明提升

```js
console.log(a); //undefined
var a = 1;
```

这里就是变量提升的效果，其实相当于发生了以下过程：

```
var a;
console.log(a)
a = 1;
```

**仅对 var 有效**

### 函数提升

定义一个函数有两种方式，一个是**函数声明**，还有一个是**函数表达式**。而**只有函数声明会被提升到顶部，不包括函数表达式。**

```js
// 函数声明

foo(); //bar
function foo() {
  console.log("bar");
}

//函数表达式
var baz = function () {
  console.log("baz");
};
```

## 2、数据类型

**六个原始类型和一个复杂数据类型**

- 原始类型：Null、Undefined、Boolean、Number、String、Symbol

- 复杂类型：Object

**另外的区分方式**

- 值类型：五种原始类型（string,number,boolean,null,undefined）
- 引用类型：数组、函数、对象等

对于 JavaScript 中，对于参数传递、构造函数带 return 等情况都是按值传递的，对于引用类型，其实传的是对象的地址。

## 3、运算符

运算符分类：赋值运算符、比较运算符、算数运算符、位运算符、逻辑运算符、字符串运算符、条件运算符、逗号运算符、一元运算符、关系运算符

- 解构：这是 es6 中出现的一种更加复杂的赋值运算。
- 短路操作

```js
false && anything; //返回false
true || anything; //返回true
true && anything; //anything
false || anything; //anything
```

## 4、对象

### JS 对象和属性

一个 JS 的对象可以有很多属性。我们来举个例子：

```js
var myCar = new Object();
myCar.make = "Ford";
myCar.model = "Mustang";
myCar.year = 1969;
```

当一个属性未赋值时值为 undefined；

```js
console.log(myCar.noProperty); //undefined
```

当然属性的访问不仅只有点的形式，还可以使用方括号

```js
myCar["make"] = "Ford";
```

### 枚举一个对象的所有属性

原生的三种方法：

- for...in 循环：遍历对象中可枚举的属性。
- Object.keys(o)：返回一个对象 o 自身含有(不包括原型中)的所有属性的名称的数组。
- Object.getOwnPropertyNames：该方法返回一个数组，它包含了对象 o 所有的属性名称(包括不可枚举)。

### 创建一个新的对象

- 使用构造函数

- 直接定义

- 使用 Object.create 方法

  ```js
  //创建一个原型为null的空对象
  var o = Object.create(null);
  //创建一个原型为空对象的，拥有属性值p，值为24
  var o = Object.create({}, { p: { value: 24 } });
  console.log(o.p); //24
  //该属性值是只可读，不可写、不可枚举、不可配置

  //以下对象的p属性是可读可写可配置可枚举。
  var o2 = Object.create(
    {},
    {
      p: {
        value: 24,
        writable: true,
        enumerable: true,
        configurable: true,
      },
    }
  );
  ```

### getters 和 setters

getter 是一个获取对象某个值的方法，而 setters 是一个设置对象某个值的方法。

```js
var o = {
  a: 7,
  get b() {
    return this.a + 1;
  },
  set c(d) {
    this.a = d / 2;
  },
};

console.log(o.a); //7
console.log(o.b); //8
o.c = 50;
console.log(o.a); //25
```

当我们想用 getter 和 setter 来设定对象的某一个值的时候我们可以使用 Object.defineProperty 这个方法。

```js
var o = { a: 0 };

Object.defineProperties(o, {
  b: {
    get: function () {
      return this.a + 1;
    },
  },
  c: {
    set: function (x) {
      this.a = x / 2;
    },
  },
});

o.c = 10;
console.log(o.b);
```

### 比较对象

对象是一个引用类型，两个独立声明的对象永远不可能相等，即使值相同也是

## 5、函数

> 函数的定义中有两种函数声明和函数表达式

### 函数声明

```js
function name([param[,param[,...param]]]){statements}
```

### 函数表达式

不以 function 开头的就是函数表达式。

```js
var myFunction = function () {
  statements;
};
```

当函数只使用一次时，一般使用 IIFE，如以下这种形式

```js
(function () {
  statements;
})();
```

IIFE 是在函数声明后立即调用的函数表达式。

### 函数声明 vs 函数表达式

```js
//函数声明
function foo() {}
//函数表达式
var foo = function () {};
```

方法一和方法二都是创建一个函数，且都是命名为 foo，但是两者还是有区别的，js 解析器中存在一种变量（函数）声明被提升的机制，也就是说变量（函数）声明会被提升到最前端，即使写在最后面的也会被提升到最前方。

我们可以看个例子:

```js
console.log(foo); // function foo() {}
console.log(bar); // undefined
function foo() {}
var bar = function bar_fn() {};
console.log(foo); // function foo() {}
console.log(bar); // function bar_fn() {}
```

### 箭头函数

```js
//第一种
([param][, param]) => {statements}
//第二种
param => expression
```
