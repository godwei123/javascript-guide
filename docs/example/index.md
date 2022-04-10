# 代码输出

:::tip
异步编程、事件循环、this 指向、作用域、变量提升、闭包、原型、继承。

知识点往往不是单独出现的，而是在同一段代码中包含多个知识点。

此处为题目，具体知识点见相应文档
:::

## 异步编程

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
    console.log('promise1');
    resolve('resolve1');
});
const promise2 = promise1.then(res => {
    console.log(res);
});
console.log('1', promise1);
console.log('2', promise2);
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
    new Promise(resolve => {
        console.log(4);
        resolve();
    }).then(() => {
        console.log(5);
    });
});
new Promise(resolve => {
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
    new Promise(resolve => {
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

### 5、代码输出结果

### 6、代码输出结果

### 7、代码输出结果

### 8、代码输出结果

### 9、代码输出结果

### 10、代码输出结果

## 事件循环

## this 指向

### 1、代码输出结果

```js
var fullname = 'a';
var obj = {
    fullname: 'b',
    prop: {
        fullname: 'c',
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

## 变量提升

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
Number(['1']); //1
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
    'use strict';
    var a = (b = 5);
})();

console.log(b); //Uncaught ReferenceError: b is not defined

/*---------------------------*/

(function () {
    'use strict';
    var a = (window.b = 5);
})();

console.log(b); // 5
```

:::
