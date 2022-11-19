# 代码输出

:::tip
异步编程、事件循环、this 指向、作用域、变量提升、闭包、原型、继承。

知识点往往不是单独出现的，而是在同一段代码中包含多个知识点。

此处为题目，具体知识点见相应文档
:::

## 异步编程、事件循环

### 1、代码输出结果

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
```

::: details 答案

```text
1
2
4
```

promise.then 是微任务，它会在所有的宏任务执行完之后才会执行，同时需要 promise 内部的状态发生变化，因为这里内部没有发生变化，一直处于 pending 状态，所以不输出 3。
:::

### 2、代码输出结果

```js
const promise1 = new Promise((resolve, reject) => {
  console.log("promise1");
  resolve("resolve1");
});
const promise2 = promise1.then((res) => {
  console.log(res);
});
console.log("1", promise1);
console.log("2", promise2);
```

::: details 答案

```text
promise1
1 Promise {<fulfilled>: 'resolve1'}
2 Promise {<pending>}
resolve1
```

需要注意的是，直接打印 promise1，会打印出它的状态值和参数。

代码执行过程如下：

1. script 是一个宏任务，按照顺序执行这些代码；
2. 首先进入 Promise，执行该构造函数中的代码，打印 promise1；
3. 碰到 resolve 函数, 将 promise1 的状态改变为 resolved, 并将结果保存下来；
4. 碰到 promise1.then 这个微任务，将它放入微任务队列；
5. promise2 是一个新的状态为 pending 的 Promise；
6. 执行同步代码 1， 同时打印出 promise1 的状态是 resolved；
7. 执行同步代码 2，同时打印出 promise2 的状态是 pending；
8. 宏任务执行完毕，查找微任务队列，发现 promise1.then 这个微任务且状态为 resolved，执行它。

:::

### 3、代码输出结果

```js
console.log(1);
setTimeout(() => {
  console.log(2);
  process.nextTick(() => {
    console.log(3);
  });
  new Promise((resolve) => {
    console.log(4);
    resolve();
  }).then(() => {
    console.log(5);
  });
});
new Promise((resolve) => {
  console.log(7);
  resolve();
}).then(() => {
  console.log(8);
});
process.nextTick(() => {
  console.log(6);
});
setTimeout(() => {
  console.log(9);
  process.nextTick(() => {
    console.log(10);
  });
  new Promise((resolve) => {
    console.log(11);
    resolve();
  }).then(() => {
    console.log(12);
  });
});
```

::: details 答案

node>=11

```text
1
7
6
8
2
4
3
5
9
11
10
12
```

:::

### 4、代码输出结果

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");
```

::: details 答案

```text
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

:::

### 5、代码输出结果

```js
function getName() {
  for (let i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
  return;
  {
    name: "京程一灯";
  }
}
console.log(getName());
```

::: details 答案

```text
undefined
0
1
2
3
4
```

:::

### 6、代码输出结果

```js
function yideng(n, o) {
  console.log(o); // ？
  return {
    yideng: function (m) {
      return yideng(m, n);
    },
  };
}
const a = yideng(0);
a.yideng(1);
a.yideng(2);
a.yideng(3);
const b = yideng(0).yideng(1).yideng(2).yideng(3);
const c = yideng(0).yideng(1);
c.yideng(2);
c.yideng(3);
```

::: details 答案

```text
undefined
0
0
0
undefined
0
1
2
undefined
0
1
1
```

闭包

:::

## this 指向

### 1、代码输出结果

```js
var fullname = "a";
var obj = {
  fullname: "b",
  prop: {
    fullname: "c",
    getFullname: function () {
      return this.fullname;
    },
  },
};

console.log(obj.prop.getFullname());
var test = obj.prop.getFullname;
console.log(test());
```

::: details 答案

```text
c
a
```

原因在于 this 指向的是函数的执行环境，this 取决于其被谁调用了，而不是被谁定义了。

对第一个 console.log()语句而言，getFullName()是作为 obj.prop 对象的一个方法被调用的，因此此时的执行环境应该是这个对象。

另一方面，但 getFullName()被分配给 test 变量时，此时的执行环境变成全局对象（window），原因是 test 是在全局作用域中定义的。因此，此时的 this 指向的是全局作用域的 fullname 变量，即 a。

:::

### 2、代码输出结果

```js
var foo = {
  bar: function () {
    return this.baz;
  },
  baz: 1,
};
console.log(typeof (f = foo.bar)());
```

::: details 答案

```text
"undefined"
```

这里并不是因为赋值给 f ，相当于 f()，所以 this 指向 window 的。
不然试试下面代码也会打印 undefined

```js
var foo = {
  bar: function () {
    return this.baz;
  },
  baz: 1,
};
console.log(typeof (foo.bar = foo.bar)());
```

下面简单从规范的角度判断这个 this 指向，可以分以下几个步骤：

1.计算 MemberExpression 的结果赋值给 ref

2.判断 ref 是不是一个 Reference 类型

2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)

2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么 this 的值为 ImplicitThisValue(ref)

2.3 如果 ref 不是 Reference，那么 this 的值为 undefined

解释下这两个步骤：
1、MemberExpression 我们可以简单理解为括号前的部分，针对这题就是 (f=foo.bar) 这部分。

2、Reference 是规范类型的一种。如果通过 GetValue 方法从 Reference 类型中获取值，则该 MemberExpression 返回结果不再是 Reference 类型。
这里的关键就是判断 MemberExpression 的返回结果是不是 Reference 类型。
由于 f=foo.bar 存在赋值操作符，根据规范 11.13.1 Simple Assignment ( = ) 规定，其第三步使用了 GetValue(ref)，故返回值不是 Reference 类型。
对照上述 2.3 的规范，如果表达式返回值不是 Reference 类型，那么 this 的值为 undefined，在非严格模式下，被隐式转换为全局对象 window。
:::

### 3、代码输出结果

```js
const num = {
  a: 10,
  add() {
    return this.a + 2;
  },
  reduce: () => this.a - 2;
}
console.log(num.add());
console.log(num.reduce());
```

::: details 答案

```text
12
NaN
```

注意，add 是普通函数，而 reduce 是箭头函数。对于箭头函数，this 关键字指向是它所在上下文（定义时的位置）的环境，与普通函数不同！ 这意味着当我们调用 reduce 时，它不是指向 num 对象，而是指其定义时的环境（window）。没有值 a 属性，返回 undefined。

:::

### 4、代码输出结果

```js
const person = { name: "yideng" };

function sayHi(age) {
  return `${this.name} is ${age}`;
}
console.log(sayHi.call(person, 21));
console.log(sayHi.bind(person, 21));
```

::: details 答案

```text
yideng is 21
ƒ sayHi(age) {return ${this.name} is ${age};}
```

使用两者，我们可以传递我们想要 this 关键字引用的对象。

.call 方法会立即执行！

.bind 方法会返回函数的拷贝值，但带有绑定的上下文！它不会立即执行。

:::

### 5、代码输出结果

```js
let length = 10;
function fn() {
  console.log(this.length);
}
var obj = {
  length: 5,
  method: function (fn) {
    fn();
    arguments[0]();
  },
};
obj.method(fn, 1);
```

::: details 答案

```text
0
2
```

1）fn()知识点
①fn()知识点，任意函数里如果嵌套了 非箭头函数，那这个时候 嵌套函数里的 this 在未指定的情况下，应该指向的是 window 对象，所以这里执行 fn 会打印 window.length,但是 let 声明的变量会形成块级作用域，且不存在声明提升，而 var 存在声明提升。所以当使用 let 声明变量时，不存在声明提升，length 属性实际上并没有添加到 window 对象中。
// 例如在浏览器控制台
let a = 1;
window.a // undefined
var b = 1;
window.b // 1
但是这里为什么输出 0 呢，因为 window 对象原先上有 length 属性，所以输出的是原先的值 0

②arguments 知识点
在方法调用（如果某个对象的属性是函数，这个属性就叫方法，调用这个属性，就叫方法调用）中，执行函数体的时候，作为属性访问主体的对象和数组便是其调用方法内 this 的指向。（通俗的说，调用谁的方法 this 就指向谁；
arguments\[0]指向 fn,所以 arguments\[0]() 是作为 arguments 对象的属性\[0]来调用 fn 的，所以 fn 中的 this 指向属性访问主体的对象 arguments；这里 this 指向 arguments。
因为 fn 作为一个参数存储在 arg 对象里，argumengts 的长度为 2，所以输出 2
// 例如
\[function fn(){console.log(this.length)}]\[0]; // 1
// 数组也是对象，只不过数组对象的整型属性会计入 length 属性中，并被区别对待，这里就是调用数组对象的 0 属性，函数作为数组对象的属性调用，函数中的 this 当然指向这个数组，所以返回数组的 length

:::

### 6、代码输出结果

```text
var a = 10;
var foo = {
    a: 20,
    bar: function () {
        var a = 30;
        return this.a;
    },
};
console.log(foo.bar());
console.log((foo.bar)());
console.log((foo.bar = foo.bar)());
console.log((foo.bar, foo.bar)());
```

::: details 答案

```text
20
20
10
10
```

:::

## 变量提升、作用域

### 1、代码输出结果

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
```

::: details 答案

```text
0 1 2
3 3 3
```

:::

### 2、代码输出结果

```js
let a = { n: 1 };
let b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);
```

::: details 答案

```text
undefined
{n:2}

```

点号的运算优先级大于等于号
赋值操作从右向左
所以, a.x=a={n:2} 可以表示为 a.x=(a={n:2}). a.x 的值是先计算的,此时 a 的指向依然是对象{n:1}. a.x 的值是括号里的返回值, 所以是在对象{n:1}上添加了 x 这个属性,属性值为{n:2}. 然后是变量 a 被重新赋值,指向了对象{n:2}. 但变量 b 的指向依然是原先的对象.
所以, a.x 的值是 undefined, b.x 的值是{n:2}.
:::

### 3、代码输出结果

```js
var a1 = {},
  b1 = "123",
  c1 = 123;
a1[b1] = "b";
a1[c1] = "c";
console.log(a1[b1]); // c
var a2 = {},
  b2 = Symbol("123"),
  c2 = Symbol("123");
a2[b2] = "b";
a2[c2] = "c";
console.log(a2[b2]); // b
var a3 = {},
  b3 = { key: "123" },
  c3 = { key: "456" };
a3[b3] = "b";
a3[c3] = "c";
console.log(a3[b3]); // c
```

::: details 答案

```text
c
b
c

```

数字做对象的 key 会转成字符串, 所以 a1 = { '123': 'c' }
a2 = { Symbol(123): 'b', Symbol(123): 'c' }, Symbol 是唯一的, 所以 a2[b2] = b
a3 = { [object Object]: 'c' } obj 做 key 会调用 toString 方法
:::

### 4、代码输出结果

```js
let x, y;
try {
  throw new Error();
} catch (x) {
  x = 1;
  y = 2;
  console.log(x);
}
console.log(x);
console.log(y);
```

::: details 答案

```text
1
undefined
2
```

需要注意的是 catch 的作用域，其实并不是常见的块作用域，并不能绑定自己的内部声明的变量。catch 创建的块作用域，只对 catch 的参数有效。对于在内部声明的变量，catch 并没有创建一个新的作用域，只是一个普通的代码块。
:::

### 5、代码输出结果 ✨

```js
var a = 0;
if (true) {
  a = 10;
  console.log(a, window.a);
  function a() {}
  console.log(a, window.a);
  a = 20;
  console.log(a, window.a);
}
console.log(a);
```

::: details 答案

```text
10 0
10 10
20 10
10

```

:::

### 6、代码输出结果

```js
const lowerCaseOnly = /^[a-z]+$/;
console.log(lowerCaseOnly.test("yideng"));
console.log(lowerCaseOnly.test(null));
console.log(lowerCaseOnly.test());
```

::: details 答案

```text
true
true
true
```

test 方法的参数会被调用 toString 强制转换成字符串
:::

## 原型链,继承

### 1、代码输出结果

```js
function f() {
  return f;
}
console.log(new f() instanceof f);
```

::: details 答案

```text
false
```

解析
a instanceof b 用于检测 a 是不是 b 的实例。如果题目 f 中没有 return f,则答案明显为 true;而在本题中 new f()其返回的结果为 f 的函数对象，其并不是 f 的一个实例。

```js
function f() {}
console.log(new f() instanceof f);
// 答案：true
```

:::

### 2、代码输出结果

```js
function Foo() {
  Foo.a = function () {
    console.log(1);
  };
  this.a = function () {
    console.log(2);
  };
}
Foo.prototype.a = function () {
  console.log(3);
};
Foo.a = function () {
  console.log(4);
};
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
```

::: details 答案

```text
4
2
1
```

```js
首先，

function Foo() {
Foo.a = function() {console.log(1)}
this.a = function() {console.log(2)}
}
上面这段代码执行完之后，我们有了一个名为 Foo 的函数，虽然函数里面也有一些代码，但此时它们还不会被执行，接下来

Foo.prototype.a = function() {console.log(3)}

到这里，我们知道了这个函数所有的实例都会有一个叫做 a 的方法，执行这个方法之后会输出 3，再往下看

Foo.a = function() {console.log(4)}

我们又给 Foo 函数添加了一个静态方法，也叫做 a，执行这个方法时会输出 4，继续看接下来的代码

Foo.a();
毫无疑问，调用了 Foo 函数的静态方法 a，刚才也说了会输出 4，所以这里会输出一个 4

let obj = new Foo();
然后我们使用 new 操作符以 Foo 构造函数创建了一个实例叫做 obj，创建实例时会执行构造函数的代码，也就是 Foo 里面的代码被执行了。首先，

Foo.a = function() {console.log(1)}

Foo 函数的静态方法 a 被修改了，原来是输出 4，修改之后会输出 1。接着

this.a = function() {console.log(2)}

使用 new 操作符创建实例时，构造函数中的 this 会指向新创建的实例，在这里新创建的实例就是 obj，因此 obj 有了一个方法叫做 a，执行这个方法会输出 2。同时，在 obj 的原型链上存在一个同样叫做 a 的方法，那个方法执行时会输出 3，也就是上面通过

Foo.prototype.a = function() {console.log(3)}

声明的方法，显而易见，对于 obj 来说，自身的方法 a 会覆盖原型链上的同名方法，因此，在下面的代码中调用 obj.a();时会输出 2。
最后，再次调用 Foo.a();时，由于刚在在创建 obj 实例时，Foo 函数的静态方法 a 已经被修改了，因此这里执行的是修改后的函数，所以会输出 1。
综上所述，最终的输出结果为
```

:::

### 3、代码输出结果

```js
function user(obj) {
  obj.name = "aaa";
  obj = new Object();
  obj.name = "bbb";
}
let person = new Object();
user(person);
console.log(person.name);
```

::: details 答案

```text
aaa
```

```js
function user(obj) {
  // obj传入的是引用
  obj.name = "aaa"; // 修改引用的值
  obj = new Object(); // obj 指向了一个新地址
  obj.name = "bbb"; //  修改的是新对象，没法改变传入的对象
}
```

:::

### 4、代码输出结果

```js
function fn() {
  getValue = function () {
    console.log(1);
  };
  return this;
}
fn.getValue = function () {
  console.log(2);
};
fn.prototype.getValue = function () {
  console.log(3);
};
var getValue = function () {
  console.log(4);
};
function getValue() {
  console.log(5);
}

//请写出以下输出结果：
getValue();
fn().getValue();
getValue();
new fn.getValue();
new fn().getValue();
```

::: details 答案

```text
4
1
1
2
3
```

1. 变量提升

```js
var getValue = function () {
  console.log(4);
};
function getValue() {
  console.log(5);
}

//  相当于下面代码，所以第一个输出 4
function getValue() {
  console.log(5);
}
var getValue;
getValue = function () {
  console.log(4);
};

// ======
function fn() {
  getValue = function () {
    console.log(1);
  };
  return this;
}
fn().getValue();
//执行fn()函数，将getValue重新赋值，返回this,this 指向 window，
// 执行window.getValue() 如下代码，输出 1
getValue = function () {
  console.log(1);
};
// ====

getValue(); // 输出 1

// ====
fn.getValue = function () {
  console.log(2);
};

new fn.getValue(); // 输出 2

// ====
fn.prototype.getValue = function () {
  console.log(3);
};
new fn().getValue(); //创建一个实例，调用getValue方法，输出 3
```

:::

### 5、代码输出结果

```js
function test() {}
const a = {},
  b = Object.prototype;
console.log(a.prototype === b);
console.log(Object.getPrototypeOf(a) === b);
console.log(test.prototype === Object.getPrototypeOf(test));
```

::: details 答案

```text
false
true
false
```

prototype 属性是只有函数才特有的属性，当你创建一个函数时，js 会自动为这个函数加上 prototype 属性，值是一个空对象。而实例对象是没有 prototype 属性的。所以 a.prototype 是 undefined

Object 实际上是一个构造函数（typeof Object 的结果为"function"）,使用字面量创建对象和 new Object 创建对象是一样的，所以 a.\_\_proto\_\_也就是 Object.prototype，所以 Object.getPrototypeOf(a)与 a.\_\_proto\_\_是一样的，第二个结果为 true

f.prototype 是使用使用 new 创建的 f 实例的原型:
f.prototype === Object.getPrototypeOf(new f()); // true

Object.getPrototypeOf(f)是 f 函数的原型:
Object.getPrototypeOf(f) === Function.prototype; //true
:::

### 6、代码输出结果

```js
var F = function () {};
Object.prototype.a = function () {
  console.log("a");
};
Function.prototype.b = function () {
  console.log("b");
};
var f = new F();
F.a();
F.b();
f.a();
f.b();
```

::: details 答案

```text
a
b
a
f.b is not a function
```

F instanceof Object == true
F instanceof Function == true

f instanceof F // true
f instanceof Function // false
f instanceof Object // true
:::

## 类型隐式转换

### 1、代码输出结果

```js
var a = [0];
if (a) {
  console.log(a == true);
} else {
  console.log(a);
}
```

::: details 答案

```text
false
```

1）当 a 出现在 if 的条件中时，被转成布尔值，而 Boolean([0])为 true,所以就进行下一步判断 a == true,在进行比较时，[0]被转换成了 0，所以 0==true 为 false

数组从非 primitive 转为 primitive 的时候会先隐式调用 join 变成“0”，string 和 boolean 比较的时候，两个都先转为 number 类型再比较，最后就是 0==1 的比较了

```js
var a = [1];
if (a) {
  console.log(a == true);
} else {
  console.log(a);
}
// true

!![]; //true 空数组转换为布尔值是 true,
!![0][0] == true; //true 数组转换为布尔值是 true //false 数组与布尔值比较时却变成了 false
Number([]); //0
Number(false); //0
Number(["1"]); //1
```

2）所以当 a 出现在 if 的条件中时，被转成布尔值，而 Boolean([0])为 true,所以就进行下一步判断 a == true,在进行比较时，js 的规则是：

① 如果比较的是原始类型的值，原始类型的值会转成数值再进行比较

```js
1 == true  //true   1 === Number(true)
'true' == true //false Number('true')->NaN  Number(true)->1
'' = 0//true
'1' == true//true  Number('1')->1
```

② 对象与原始类型值比较，对象会转换成原始类型的值再进行比较。

③undefined 和 null 与其它类型进行比较时，结果都为 false，他们相互比较时结果为 true。
:::

### 2、代码输出结果

```js
const value = "Value is" + !!Number(["0"]) ? "yideng" : "undefined";
console.log(value);
```

::: details 答案

```text
yideng
```

\- 优先级大于 ？

:::

### 3、代码输出结果

```js
const a = [1, 2, 3],
  b = [1, 2, 3],
  c = [1, 2, 4],
  d = "2",
  e = "11";
console.log([a == b, a === b, a > c, a < c, d > e]);
```

::: details 答案

```text
[false, false, false, true, true]
```

:::

### 4、代码输出结果

```js
console.log(null == 0);
console.log(null <= 0);
console.log(null < 0);
```

::: details 答案

```text
false
true
false

```

null>0 //null 转化为 number，为 0，所以 0>0 结果为 false。

null>=0 //null 转化为 number，为 0>=0，所以结果为 true。

null==0// null 在做相等判断时，不进行转型，所以 null 和 0 为不同类型数据，结果为 false
:::

### 5、代码输出结果

```js
let a = [];
let b = "0";
console.log(a == 0);
console.log(a == !a);
console.log(b == 0);
console.log(a == b);
```

::: details 答案

```text
true
true
true
false
```

```js
/**
对象到数字的转换过程：
1.如果对象具有valueof（）方法，后者返回一个原始值，则JavaScript将这个原始值转换为数字并返回；
2.否则，如果对象具有toString（）方法，后者返回一个原始值，JavaScript将这个字符串转换为数字并返回；
3.否则，报错。
4.数组继承了默认的valueOf()方法，但是数组、函数和正则表达式调用此方法后，只返回对象本身，因此转换为数字，还会继续调用toString（）方法，空数组调用toString（）返回空字符串，转换为数字为0，
*/
let a = [];
let b = "0";
console.log(a == 0);
// == 运算符，一边为对象，一边数字，对象到数字的转换过程，0==0 返回true
console.log(a == !a);
// 逻辑非，如果为对象，返回false，布尔值转换为数字 0，对象到数字的转换过程，0==0 返回true
console.log(b == 0);
// 字符串转换为数字 ，返回true
console.log(a == b);
// 对象到数字的转换过程1、2 返回 ‘’ ，‘’==‘0’ false
```

:::

### 6、代码输出结果

```js
var obj = {};
var x = +obj.yideng?.name ?? "京程一灯";
console.log(x);
```

::: details 答案

```text
NaN
```

+undefined -> NaN
:::

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

```text
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

```text
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

```text
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

```text
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

```text
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

```text
输出是抛出异常，bar is not defined。
```

解析
这种命名函数表达式函数只能在函数体内有效

```js
typeof(bar). // "undefined"
typeof(foo()). // "number"
typeof(foo).   // "function"
typeof(bar()). // Uncaught ReferenceError: bar is not defined
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

```text
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

```text
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

```text
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

```text
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

```text
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

```text
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

```text
0
```

filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或等价于 true 的值的元素创建一个新数组。callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。
:::

### 14、代码输出结果

```js
// a 在什么情况下会打印 1
var a = ?;
if(a == 1 && a== 2 && a== 3){
 	console.log(1);
}
```

::: details 答案

```text
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

```text
Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
```

:::

### 16、代码输出结果

```js
const num = parseInt("2*4", 10);
console.log(num);
```

::: details 答案

```text
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

```text
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

```text
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

```text
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

```text
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

```text
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

```text
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

```text
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

```text
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

```text
[0, 1, undefined, 3]
[0, 1, 空白, 3]
```

:::
