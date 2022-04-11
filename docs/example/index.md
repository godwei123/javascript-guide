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

```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script end');
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

### 6、代码输出结果

### 7、代码输出结果

### 8、代码输出结果

### 9、代码输出结果

### 10、代码输出结果

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
const person = { name: 'yideng' };

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

### 2、代码输出结果

```js
const value = 'Value is' + !!Number(['0']) ? 'yideng' : 'undefined';
console.log(value);
```

::: details 答案

```text
yideng
```

+优先级大于？

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

### 5、代码输出结果

```js
var company = {
    address: 'beijing',
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
['1', '2', '3'].map(parseInt);
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

-   currentValue（当前被传递的元素）；

-   index（当前被传递的元素的索引）；

-   array（调用 map 方法的数组）

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
        case 'A':
            console.log('Case A');
            break;
        case 'B':
            console.log('Case B');
            break;
        case undefined:
            console.log('undefined');
            break;
        default:
            console.log('Do not know!');
    }
}
showCase(new String('A'));
```

::: details 答案

```text
Do not know!
```

switch 是严格比较, String 实例和 字符串不一样.

```js
var str1 = 'str';
var str2 = new String('str');
console.log(typeof str1); // "string"
console.log(typeof str2); //"object"
```

:::

### 12、代码输出结果

```js
console.log([2, 1, 0].reduce(Math.pow));
console.log([].reduce(Math.pow));
```

::: details 答案

```text
1
在没有初始值的空数组上调用 reduce 将报错。
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

```

::: details 答案

```text

```

:::

### 15、代码输出结果

```js

```

::: details 答案

```text

```

:::

### 16、代码输出结果

```js

```

::: details 答案

```text

```

:::
