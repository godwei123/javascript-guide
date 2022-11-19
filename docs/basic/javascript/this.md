# this

**《你不知道的 javascript》**

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
