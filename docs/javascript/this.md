# this

## 误解

### 1、this 理解成指向函数自身

> 这是错误的

### 2、this 指向函数的作用域。

> this 在任何情况下都不指向函数的词法作用域。
>
> 在 JavaScript 内部，作用域确实和对象类似，可见的标识符都是它的属性。但是作用域“对象”无法通过 JavaScript 代码访问，它存在于 JavaScript 引擎内部。

```javascript
function foo() {
  var a = 2;
  this.bar();
}

function bar() {
  console.log(this.a);
}

foo(); // undefined
```

**总结：this 既不指向函数自身也不指向函数的词法作用域**

## this 解析

> 每个函数的 this 是在调用时被绑定的，完全取决于函数的调用位置（也就是函数的调用方法）。(不全面)

### 1、调用位置

在理解 this 的绑定过程之前，首先要理解调用位置：调用位置就是函数在代码中被调用的位置（而不是声明的位置）

最重要的是要分析调用栈（就是为了到达当前执行位置所调用的所有函数）。我们关心的调用位置就在当前正在执行的函数的前一个调用中。

### 2、绑定规则

#### 2.1、默认绑定

最常用的函数调用方式：独立函数调用。

```javascript
function foo() {
  console.log(this.a);
}

var a = 2;

foo(); // 2
```

#### 2.2、隐式绑定

另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含。

```javascript
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

obj.foo(); // 2
```

**无论是直接在 obj 中定义还是先定义再添加为引用属性，这个函数严格来说都不属于 obj 对象.**然而，调用位置会使用 obj 上下文来引用函数。

对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。

```javascript
function foo() {
  console.log(this.a);
}

var obj2 = {
  a: 42,
  foo: foo,
};

var obj1 = {
  a: 2,
  obj2: obj2,
};

obj1.obj2.foo(); // 42
```

**隐式丢失**

一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，使用默认绑定。

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

var bar = obj.foo;

var a = "global";

bar(); // global
```

虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的 bar()其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

在传入回调函数时，参数传递是一种隐式赋值。

#### 2.3、显示绑定

call

apply

bind

#### 2.4、new 绑定

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1．创建（或者说构造）一个全新的对象。
2．这个新对象会被执行[[Prototype]]连接。
3．这个新对象会绑定到函数调用的 this。
4．如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

#### 2.5、优先级

new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定

#### 2.6、特殊情况

- 如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。
- 在 javascript 中创建一个空对象最简单的方法是 Object.create(null)
- 间接引用，调用函数会应用默认绑定规则。（间接引用最容易在赋值时发生）

注意：对于默认绑定来说，决定 this 绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，this 会被绑定到 undefined，否则 this 会被绑定到全局对象。

### 3、箭头函数

箭头函数不使用 this 四种规则，而是根据外层（函数或全局）作用域决定 this。

https://mp.weixin.qq.com/s?__biz=MzAxODE4MTEzMA==&mid=2650095868&idx=1&sn=9dd294de6874c257d147d3cb7c09ce96&chksm=83dbdd99b4ac548f6748501e2883134857085d6b08d64c0f71fdc27de0103bc6a3cf7c34654d&scene=21#wechat_redirect

http://mp.weixin.qq.com/s?__biz=MzAxODE4MTEzMA==&mid=2650086530&idx=1&sn=8d753027f923e4860294f9bcd3d4b843&chksm=83db81e7b4ac08f1f316c8afc0a5016fa2fa3ae521dc0e160492ded9b7ddfa5fe938f36757d6&scene=21#wechat_redirect

https://mp.weixin.qq.com/s?__biz=MzAxODE4MTEzMA==&mid=2650095648&idx=1&sn=ef90aa87af4dffda10c2ae36e9206d35&chksm=83dbdd45b4ac545306307d1443604bf0993c2677ca71b89cafc8647303224333406ba70a38fe&scene=21#wechat_redirect

## 深入理解 this 的绑定规则

### 默认绑定

#### 全局环境中，this 默认绑定到 window

```javascript
console.log(this === window); //true
//函数独立调用时，this默认绑定到window
function foo() {
  console.log(this === window);
}
foo(); //true
```

被嵌套的函数独立调用时，this 默认绑定到 window

```js
var a = 0;
var obj = {
  a: 2,
  foo: function () {
    function test() {
      console.log(this.a);
    }
    test();
  },
};
obj.foo(); //0
//虽然test()函数被嵌套在obj.foo()函数中，但test()函数是独立调用，而不是方法调用。所以this默认绑定到window
```

#### 自执行函数【IIFE】

IIFE 立即执行函数*实际上*是**函数声明后直接调用**执行

```js
var a = 0;
function foo() {
  (function test() {
    console.log(this.a);
  })();
}
var obj = {
  a: 2,
  foo: foo,
};
obj.foo(); //0

//等价于上例
var a = 0;
var obj = {
  a: 2,
  foo: function () {
    function test() {
      console.log(this.a);
    }
    test();
  },
};
obj.foo(); //0
```

#### 【闭包】

类似地，test()**函数是独立调用**，而**不是方法调用**，所以**this 默认绑定到 window**

[注意]函数共有 4 种调用方式

```js
var a = 0;
function foo() {
  // 闭包
  function test() {
    console.log(this.a);
  }
  return test;
}
var obj = {
  a: 2,
  foo: foo,
};
obj.foo()(); //0
```

由于闭包的 this 默认绑定到 window 对象，但又常常需要访问嵌套函数的 this，所以常常在嵌套函数中使用 var that = this，然后在闭包中使用 that 替代 this，使用作用域查找的方法来找到嵌套函数的 this 值

```javascript
var a = 0;
function foo() {
  var that = this;
  function test() {
    console.log(that.a);
  }
  return test;
}
var obj = {
  a: 2,
  foo: foo,
};
obj.foo()(); //2
```

隐式绑定，一般地，被直接对象所包含的函数调用时，也称为方法调用，this 隐式绑定到该直接对象

```js
function foo() {
  console.log(this.a);
}
var obj1 = {
  a: 1,
  foo: foo,
  obj2: {
    a: 2,
    foo: foo,
  },
};

//foo()函数的直接对象是obj1，this隐式绑定到obj1
obj1.foo(); //1

//foo()函数的直接对象是obj2，this隐式绑定到obj2
obj1.obj2.foo(); //2
```

### 隐式丢失

隐式丢失是指被隐式绑定的函数丢失绑定对象，从而默认绑定到 window。这种情况容易出错却又常见。

#### 【函数别名】

```js
var a = 0;
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};

//把obj.foo赋予别名bar，造成了隐式丢失，因为只是把foo()函数赋给了bar，而bar与obj对象则毫无关系
var bar = obj.foo;
bar(); //0
//等价于
var a = 0;
var bar = function foo() {
  console.log(this.a);
};
bar(); //0
```

#### 【参数传递】

```javascript
var a = 0;
function foo() {
  console.log(this.a);
}
function bar(fn) {
  fn();
}
var obj = {
  a: 2,
  foo: foo,
};

//把obj.foo当作参数传递给bar函数时，有隐式的函数赋值fn=obj.foo。与上例类似，只是把foo函数赋给了fn，而fn与obj对象则毫无关系
bar(obj.foo); //0
//等价于
var a = 0;
function bar(fn) {
  fn();
}
bar(function foo() {
  console.log(this.a);
});
```

#### 【内置函数】

内置函数与上例类似，也会造成隐式丢失

```js
var a = 0;
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};
setTimeout(obj.foo, 100); //0

//等价于
var a = 0;
setTimeout(function foo() {
  console.log(this.a);
}, 100); //0
```

#### 【间接引用】

函数的"间接引用"一般都在无意间创建，最容易在赋值时发生，会造成隐式丢失

```js
function foo() {
  console.log(this.a);
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3

//将o.foo函数赋值给p.foo函数，然后立即执行。相当于仅仅是foo()函数的立即执行
(p.foo = o.foo)(); // 2

//将o.foo函数赋值给p.foo函数，之后p.foo函数再执行，是属于p对象的foo函数的执行
p.foo = o.foo;
p.foo(); //4
```

#### 【其他情况】

在 javascript 引擎内部，obj 和 obj.foo 储存在两个内存地址，简称为 M1 和 M2。只有 obj.foo()这样调用时，是从 M1 调用 M2，因此 this 指向 obj。但是，下面三种情况，都是直接取出 M2 进行运算，然后就在全局环境执行运算结果（还是 M2），因此 this 指向全局环境

```js
var a = 0;
var obj = {
  a: 2,
  foo: foo,
};
function foo() {
  console.log(this.a);
}

(obj.foo = obj.foo)(); //0
(false || obj.foo)(); //0
(1, obj.foo)(); //0
```

### 显式绑定

通过 call()、apply()、bind()方法把对象绑定到 this 上，叫做显式绑定。对于被调用的函数来说，叫做间接调用

```js
var a = 0;
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
};
foo(); //0
foo.call(obj); //2
```

普通的显式绑定无法解决隐式丢失问题

```js
var a = 0;
function foo() {
  console.log(this.a);
}
var obj1 = {
  a: 1,
};
var obj2 = {
  a: 2,
};
foo.call(obj1); //1
foo.call(obj2); //2
```

#### 【硬绑定】

硬绑定是显式绑定的一个变种，使 this 不能再被修改

```js
var a = 0;
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
};
var bar = function () {
  foo.call(obj);
};
//在bar函数内部手动调用foo.call(obj)。因此，无论之后如何调用函数bar，它总会手动在obj上调用foo
bar(); //2
setTimeout(bar, 100); //2
bar.call(window); //2
```

**这其实就是 bind 的实现原理**，与 `call`，`apply` 不同，`bind` 调用后不会执行，而是会**返回一个硬绑定的函数**，所以通过 `bind` 可以解决绑定丢失的问题。`bind` 也是显式绑定

#### 【API】

javascript 中新增了许多内置函数，具有显式绑定的功能，如数组的 5 个迭代方法：map()、forEach()、filter()、some()、every()

```javascript
var id = "window";
function foo(el) {
  console.log(el, this.id);
}
var obj = {
  id: "fn",
};
[1, 2, 3].forEach(foo); //1 "window" 2 "window" 3 "window"
[1, 2, 3].forEach(foo, obj); //1 "fn" 2 "fn" 3 "fn"
```

### new 绑定

#### new 原理

```js
function _new() {
  let obj = new Object(); // 1. 创建一个空对象
  let Con = [].shift.call(arguments); // 2. 获得构造函数
  obj.__proto__ = Con.prototype; // 3. 链接到原型
  let result = Con.apply(obj, arguments); // 4. 绑定 this，执行构造函数
  return typeof result === "object" ? result : obj; // 5. 返回 new 出来的对象
}
```

如果函数或者方法调用之前带有关键字 new，它就构成构造函数调用。对于 this 绑定来说，称为 new 绑定.

【1】构造函数通常不使用 return 关键字，它们通常初始化新对象,当构造函数的函数体执行完毕时，它会显式返回。在这种情况下，构造函数调用表达式的计算结果就是这个新对象的值

```js
function fn() {
  this.a = 2;
}
var test = new fn();
console.log(test); //{a:2}
```

【2】如果构造函数使用 return 语句但没有指定返回值，或者返回一个原始值，那么这时将忽略返回值，同时使用这个新对象作为调用结果

```js
function fn() {
  this.a = 2;
  return;
}
var test = new fn();
console.log(test); //{a:2}
```

【3】如果构造函数显式地使用 return 语句返回一个对象，那么调用表达式的值就是这个对象

```js
var obj = { a: 1 };
function fn() {
  this.a = 2;
  return obj;
}
var test = new fn();
console.log(test); //{a:1}
```

[注意]尽管有时候构造函数看起来像一个方法调用，它依然会使用这个新对象作为 this。也就是说，在表达式 new o.m()中，this 并不是 o

```js
var o = {
  m: function () {
    return this;
  },
};
var obj = new o.m();
console.log(obj, obj === o); //{} false
console.log(obj.constructor === o.m); //true
```

### 严格模式

【1】严格模式下，独立调用的函数的 this 指向 undefined

```js
function fn() {
  "use strict";
  console.log(this); //undefined
}
fn();

function fn() {
  console.log(this); //window
}
fn();
```

【2】在非严格模式下，使用函数的 call()或 apply()方法时，null 或 undefined 值会被转换为全局对象。而在严格模式下，函数的 this 值始终是指定的值

```js
var color = "red";
function displayColor() {
  console.log(this.color);
}
displayColor.call(null); //red

var color = "red";
function displayColor() {
  "use strict";
  console.log(this.color);
}
displayColor.call(null); //TypeError: Cannot read property 'color' of null
```

### 总结

this 的四种绑定规则：

默认绑定---调用方式：独立调用

隐式绑定---调用方式：方法调用

显式绑定---调用方式：间接调用

new 绑定---调用方式：构造函数调用。

**new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定**

根据绑定规则和优先级，我们可以总结出 `this` 判断的通用模式，

1. 函数是否通过 new 调用？
2. 是否通过 call，apply，bind 调用？
3. 函数的调用位置是否在某个上下文对象中？
4. 是否是箭头函数？
5. 函数调用是在严格模式还是非严格模式下？
6. **箭头函数中的 this 继承至它外层第一个不是箭头函数的函数**
