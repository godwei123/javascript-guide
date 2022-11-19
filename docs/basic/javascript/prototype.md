# 原型

JavaScript 中的对象有一个特殊的[[Prototype]]内置属性，其实就是对于其他对象的引用。几乎所有的对象在创建时[[Prototype]]
属性都会被赋予一个非空的值。

Object.create(..)的原理，它会创建一个对象并把这个对象的[[Prototype]]关联到指定的对象。

使用 for..in 遍历对象时原理和查找[[Prototype]]链类似，任何可以通过原型链访问到（并且是 enumerable）的属性都会被枚举。

使用 in 操作符来检查属性在对象中是否存在时，同样会查找对象的整条原型链**（无论属性是否可枚举）**

对原型链上层属性赋值存在 3 种情况：

- 该属性只读，不可赋值，严格模式报错，非严格模式忽略该操作
- 该属性存在 setter，调用 setter 赋值
- 如果不是以上两种情况，在下层创建同名的属性并赋值，屏蔽上层属性。

**隐式屏蔽**

```javascript
let another = {
  a: 2,
};
let myObj = Object.create(another);

console.log(another.a); // 2
console.log(myObj.a); // 2
console.log(another.hasOwnProperty("a")); // true
console.log(myObj.hasOwnProperty("a")); // false

myObj.a++; // 隐式屏蔽

console.log(another.a); // 2
console.log(myObj.a); // 3
console.log(another.hasOwnProperty("a")); // true
console.log(myObj.hasOwnProperty("a")); // true
```

所有的函数默认都会拥有一个名为 prototype 的公有并且不可枚举的属性，它会指向另一个对象。

继承意味着复制操作，JavaScript（默认）并不会复制对象属性。相反，JavaScript 会在两个对象之间创建一个关联，这样一个对象就可以通过委托访问另一个对象的属性和函数。

实际上，函数本身并不是构造函数，然而，当你在普通的函数调用前面加上 new 关键字之后，就会把这个函数调用变成一个“构造函数调用”。实际上，new
会劫持所有普通函数并用构造对象的形式来调用它。

换句话说，在 JavaScript 中对于“构造函数”最准确的解释是，所有带 new 的函数调用。函数不是构造函数，但是当且仅当使用 new
时，函数调用会变成“构造函数调用”。

## call

**.call.call** 到底在为谁疯狂打 call？

```js
function fn1() {
  console.log(1);
}

function fn2() {
  console.log(2);
}

fn1.call.call(fn2); // 2
```

所以 **fn1.call.call(fn2)** 等效于 `fn2.call(undefined)`。而且无论您加多少个 **.call**，效果也是一样的。

`fn.call === Function.call // true`

1:这个方法是在哪开始执行的 call(fn2);
2:执行后的结果是什么 call(fn2) 前面的 this 改成了 fn2 前面方法照常执行;
3:call(fn2) 前面是什么，改变 this 后会怎样 call(fn2) 前面是 fn1.call 改变 this 后 由于 fn1 是这次的行为主体(this)，是他执行了
call 方法，所以 fn1 被 call(fn2) 变成了 fn2，所以接下来执行的就是 fn2.call();
4:输出 fn2 this: [object Window].

1. 前面的一串 `fn.call.call.call.call` 并没有调用，只是获取对象的 call 属性，所以，这一串的结果是 Function.call 属性。
2. 所以那一串就是 `Function.call.call(fn2)`；还可以解理为 fn3.call(fn2)。
3. 根据 call 的原理（可参考上面的 call 模拟），在 fn3 执行 call，其实际是这样执行的 `fn2.fn3()`。
4. 由于 fn3 实际上就是 call 函数，所以, fn2.fn3() 等价于 `fn2.call()`。
5. 所以，上面那一串代码的最终结果，就是调用 fn2，所以结果输出 2.

### 实例后的对象也能再次实例吗？

```javascript
function People() {}

const lili = new People(); // People {}
const lucy = new tom.constructor(); // People {}
```

es6 函数带默认参数时将生成**声明作用域**

函数表达式（非函数声明）中的函数名不可覆盖。

```js
const c = function CC() {
  CC = 123;
  return CC;
};

c(); // Function
```

当然，如果设置 `var CC = 123` ，加声明关键词是可以覆盖的。

# 继承

```
Object.setPrototypeOf(Bar.prototype,Foo.prototype)

Bar.prototype = Object.create(Foo.prototype)

```

如果使用内置的．bind(..)函数来生成一个硬绑定函数的话，该函数是没有 prototype 属性的

instanceof

Foo.prototype.isPrototypeOf(a) // a 的整条[[Prototype]]是否出现过 Foo.prototype

Object.getPrototypeOf(obj) 获取一个对象的[[Prototype]]链

Object.setPrototypeOf(obj1,obj2) 设置属性

Object.create(..)会创建一个新对象（bar）并把它关联到我们指定的对象（foo），这样我们就可以充分发挥[[Prototype]]
机制的威力（委托）并且避免不必要的麻烦（比如使用 new 的构造函数调用会生成．prototype 和．constructor 引用）。

Object.create(null)会创建一个拥有空（或者说 null）[[Prototype]]链接的对象，这个对象无法进行委托。由于这个对象没有原型链，所以
instanceof 操作符（之前解释过）无法进行判断，因此总是会返回 false。这些特殊的空[[Prototype]]
对象通常被称作“字典”，它们完全不会受到原型链的干扰，因此非常适合用来存储数据。

Object.create(..)的第二个参数指定了需要添加到新对象中的属性名以及这些属性的属性描述符。

```javascript
Object.create = function (o) {
  function F() {}

  F.prototype = o;
  return new F();
};
```

### `class` 语法糖

`class` 语法糖到底是怎么继承的？

```
function Super() {
  this.a = 1;
}

function Child() {
  // 属性继承
  Super.call(this);
  this.b = 2;
}
// 原型继承
Child.prototype = new Super();

const child = new Child();
child.a;  // 1
```

正式代码的原型继承，不会直接实例父类，而是实例一个空函数，避免重复声明动态属性

```
const extends = (Child, Super) => {
  const fn = function () {};

  fn.prototype = Super.prototype;
  Child.prototype = new fn();
  Child.prototype.constructor = Child;
};
```

### **ES5 有几种方式可以实现继承？分别有哪些优缺点？**

##### 1. 原型链继承

原型链继承的基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

![图片](/docs/public/640-20220731210952948.jpeg)

缺点：

1. 通过原型来实现继承时，原型会变成另一个类型的实例，原先的实例属性变成了现在的原型属性，该原型的引用类型属性会被所有的实例共享。
2. 在创建子类型的实例时，没有办法在不影响所有对象实例的情况下给超类型的构造函数中传递参数。

##### 2. 借用构造函数

**借用构造函数**的技术，其基本思想为:

在子类型的构造函数中调用超类型构造函数。

![图片](/docs/public/640-20220731211005039.jpeg)

优点:

1. 可以向超类传递参数
2. 解决了原型中包含引用类型值被所有实例共享的问题

缺点:

1. 方法都在构造函数中定义，函数复用无从谈起，另外超类型原型中定义的方法对于子类型而言都是不可见的。

##### 3. 组合继承(原型链 + 借用构造函数)

组合继承指的是将原型链和借用构造函数技术组合到一块，从而发挥二者之长的一种继承模式。基本思路：

使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承，既通过在原型上定义方法来实现了函数复用，又保证了每个实例都有自己的属性。

![图片](/docs/public/640-20220731211042445.jpeg)

缺点:

- 无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。

优点:

- 可以向超类传递参数
- 每个实例都有自己的属性
- 实现了函数复用

##### 4. 原型式继承

原型继承的基本思想：

借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

![图片](/docs/public/640-20220731211107908.jpeg)

在 `object()`
函数内部，先穿甲一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例，从本质上讲， `object()`
对传入的对象执行了一次浅拷贝。

ECMAScript5 通过新增 `Object.create()`
方法规范了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象(
可以覆盖原型对象上的同名属性)，在传入一个参数的情况下， `Object.create()` 和 `object()` 方法的行为相同。

![图片](https://mmbiz.qpic.cn/mmbiz_png/nnic7Ckj9Nq0zXqZ0Q1e2sUkKsRLQcwn5w5xjuwSNcwNxibl5v5eI18VraG9B6xHDCM4nibm2M2E2Ebue7RIVmAgw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

在没有必要创建构造函数，仅让一个对象与另一个对象保持相似的情况下，原型式继承是可以胜任的。

缺点:

同原型链实现继承一样，包含引用类型值的属性会被所有实例共享。

##### 5. 寄生式继承

寄生式继承是与原型式继承紧密相关的一种思路。寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部已某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

![图片](/docs/public/640-20220731211201809.jpeg)

基于 `person` 返回了一个新对象 -—— `person2`，新对象不仅具有 `person` 的所有属性和方法，而且还有自己的 `sayHi()`
方法。在考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。

缺点：

- 使用寄生式继承来为对象添加函数，会由于不能做到函数复用而效率低下。
- 同原型链实现继承一样，包含引用类型值的属性会被所有实例共享。

##### 6. 寄生组合式继承

所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法，基本思路：

不必为了指定子类型的原型而调用超类型的构造函数，我们需要的仅是超类型原型的一个副本，本质上就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。寄生组合式继承的基本模式如下所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/nnic7Ckj9Nq0zXqZ0Q1e2sUkKsRLQcwn59eJo9qQWjQQAiauRvo7ezc2ILiayI7uUTj4rLxYBz989k42Lj87pqRdg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

- 第一步：创建超类型原型的一个副本
- 第二步：为创建的副本添加 `constructor` 属性
- 第三步：将新创建的对象赋值给子类型的原型

至此，我们就可以通过调用 `inheritPrototype` 来替换为子类型原型赋值的语句：

![图片](https://mmbiz.qpic.cn/mmbiz_png/nnic7Ckj9Nq0zXqZ0Q1e2sUkKsRLQcwn5G4zK1DvgwSiaO6hl7TDmslABvXPhVhLrg4qWYbl9lm5uVSC5MQ7LayQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

优点:

只调用了一次超类构造函数，效率更高。避免在 `SuberType.prototype`上面创建不必要的、多余的属性，与其同时，原型链还能保持不变。

因此寄生组合继承是引用类型最理性的继承范式。

## 委托

委托行为意味着某些对象在找不到属性或者方法引用时会把这个请求委托给另一个对象。

匿名函数没有 name 标识符，这会导致：
1．调试栈更难追踪；
2．自我引用（递归、事件（解除）绑定，等等）更难；
3．代码（稍微）更难理解。

使用简洁方法时一定要小心这一点。如果你需要自我引用的话，那最好使用传统的具名函数表达式来定义对应的函数（· baz: function
baz(){..}·），不要使用简洁方法。

行为委托认为对象之间是兄弟关系，互相委托，而不是父类和子类的关系。JavaScript 的[[Prototype]]机制本质上就是行为委托机制。也就是说，我们可以选择在
JavaScript 中努力实现类机制，也可以拥抱更自然的[[Prototype]]委托机制。

#### 描述下 JavaScript 中 Scope（作用域）、Closure（闭包）、Prototype（原型） 概念

**作用域**负责收集和维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。

- 全局作用域
- 函数作用域
- 块级作用域

##### 闭包的定义

《JavaScript 高级程序设计》:闭包是指有权访问另一个函数作用域中的变量的函数

《JavaScript 权威指南》：从技术的角度讲，所有的 JavaScript 函数都是闭包：它们都是对象，它们都关联到作用域链。

《你不知道的 JavaScript》：当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。

##### 闭包的作用

- 能够访问函数定义时所在的词法作用域(阻止其被回收)。
- 私有化变量
- 模拟块级作用域
- 创建模块

## 说明 JavaScript 封装、继承实现原理

### **2. 如何正确判断 this 的指向？**

如果用一句话说明 this 的指向，那么即是: 谁调用它，this 就指向谁。

但是仅通过这句话，我们很多时候并不能准确判断 this 的指向。因此我们需要借助一些规则去帮助自己：

this 的指向可以按照以下顺序判断:

#### 全局环境中的 this

浏览器环境：无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象 `window`;

node 环境：无论是否在严格模式下，在全局执行环境中（在任何函数体外部），this 都是空对象 `{}`;

#### 是否是 `new` 绑定

如果是 `new` 绑定，并且构造函数中没有返回 function 或者是 object，那么 this 指向这个新对象。如下:

构造函数返回值不是 function 或 object。 `newSuper()` 返回的是 this 对象。

构造函数返回值是 function 或 object， `newSuper()`是返回的是 Super 种返回的对象。

#### 函数是否通过 call,apply 调用，或者使用了 bind 绑定，如果是，那么 this 绑定的就是指定的对象【归结为显式绑定】。

这里同样需要注意一种**特殊**情况，如果 call,apply 或者 bind 传入的第一个参数值是 `undefined`或者 `null`，严格模式下 this
的值为传入的值 null /undefined。非严格模式下，实际应用的默认绑定规则，this 指向全局对象(node 环境为 global，浏览器环境为
window)

#### 隐式绑定，函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的隐式调用为: `xxx.fn()`

#### 默认绑定，在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用。

非严格模式：node 环境，执行全局对象 global，浏览器环境，执行全局对象 window。

严格模式：执行 undefined

#### 箭头函数的情况：

箭头函数没有自己的 this，继承外层上下文绑定的 this。
