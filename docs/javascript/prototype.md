# 原型与原型链

## 原型

JavaScript 中的对象有一个特殊的`[[Prototype]]`内置属性，其实就是对于其他对象的引用，几乎所有的对象在创建时`[[Prototype]]`属性都会被赋予一个非空的值。每个函数都有一个 prototype 属性，除了 Function.prototype.bind()，该属性指向原型。

每个对象都有一个 `__proto__` 属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 `[[prototype]]`，但是 `[[prototype]]` 是内部属性，我们并不能访问到，所以使用 `_proto_` 来访问。对象可以通过 `__proto__` 来寻找不属于该对象的属性，`__proto__` 将对象连接起来组成了原型链。

- 函数(function)：函数是一种特殊的对象，函数的原型存放在 prototype 属性上。
- 对象(Object): 普通对象的原型是存放到内置属性`[[Prototype]]`上，可以通过对象的`__proto__`来访问对象的原型。
- 数组(Array): 数组也是一种特殊的对象，但与函数不同的是它的原型和普通对象一样，也是存放到内置属性`[[Prototype]]`上，可以通过数组的`__proto__`来访问数组的原型。

## 原型链

原型链的作用是：当访问一个对象的属性时，如果这个对象本身没有这个属性，那么就会去它的 `__proto__`（即它的构造函数的 prototype）中去寻找。

## 构造函数

构造函数是一种特殊的函数，主要用来创建对象时初始化对象，即为对象成员变量赋初始值，总与 new 运算符一起使用在创建对象的语句中。

## 原型对象

原型对象就是通过调用构造函数而创建的那个对象实例的原型，换句话说，那个对象实例的原型就是它的构造函数的 prototype 属性。

## 关系图

![img.png](../public/16154757484208d724d.png)

## 继承

继承是 OO 语言中的一个重要特性，它可以使子类具有父类的属性和方法。

JavaScript 中的继承是通过原型链来体现的，其实现原理如下：

```js
function Parent() {
  this.name = "kevin";
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child() {}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName()); // kevin
```

## `for..in`

遍历对象时原理和查找[[Prototype]]链类似，任何可以通过原型链访问到（并且是 enumerable）的属性都会被枚举。

## `in`操作符

来检查属性在对象中是否存在时，同样会查找对象的整条原型链**（无论属性是否可枚举）**

## instanceof

Foo.prototype.isPrototypeOf(a) // a 的整条[[Prototype]]是否出现过 Foo.prototype

Object.getPrototypeOf(obj) 获取一个对象的[[Prototype]]链

Object.setPrototypeOf(obj1,obj2) 设置属性

## Object.create(..)

它会创建一个对象并把这个对象的[[Prototype]]关联到指定的对象。

> Object.create(null)会创建一个拥有空（或者说 null）[[Prototype]]链接的对象，这个对象无法进行委托。由于这个对象没有原型链，所以 instanceof 操作符（之前解释过）无法进行判断，因此总是会返回 false。这些特殊的空[[Prototype]]对象通常被称作“字典”，它们完全不会受到原型链的干扰，因此非常适合用来存储数据。

```javascript
Object.create = function (o) {
  function F() {}

  F.prototype = o;
  return new F();
};
```

## call

> _.call.call_

```js
function fn1() {
  console.log(1);
}

function fn2() {
  console.log(2);
}

fn1.call.call(fn2); // 2
```

所以 `fn1.call.call(fn2)` 等效于 `fn2.call(undefined)`。而且无论您加多少个 **.call**，效果也是一样的。`fn.call === Function.call // true`

```text
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

```

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
