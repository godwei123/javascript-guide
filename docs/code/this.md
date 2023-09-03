# `this` 指向

## 1、代码输出结果

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

```txt
c
a
```

原因在于 this 指向的是函数的执行环境，this 取决于其被谁调用了，而不是被谁定义了。

对第一个 console.log()语句而言，getFullName()是作为 obj.prop 对象的一个方法被调用的，因此此时的执行环境应该是这个对象。

另一方面，但 getFullName()被分配给 test 变量时，此时的执行环境变成全局对象（window），原因是 test 是在全局作用域中定义的。因此，此时的 this 指向的是全局作用域的 fullname 变量，即 a。

:::

## 2、代码输出结果

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

```txt
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

## 3、代码输出结果

```js
const num = {
  a: 10,
  add() {
    return this.a + 2;
  },
  reduce: () => this.a - 2,
};
console.log(num.add());
console.log(num.reduce());
```

::: details 答案

```txt
12
NaN
```

注意，add 是普通函数，而 reduce 是箭头函数。对于箭头函数，this 关键字指向是它所在上下文（定义时的位置）的环境，与普通函数不同！ 这意味着当我们调用 reduce 时，它不是指向 num 对象，而是指其定义时的环境（window）。没有值 a 属性，返回 undefined。

:::

## 4、代码输出结果

```js
const person = { name: "yideng" };

function sayHi(age) {
  return `${this.name} is ${age}`;
}
console.log(sayHi.call(person, 21));
console.log(sayHi.bind(person, 21));
```

::: details 答案

```txt
yideng is 21
ƒ sayHi(age) {return ${this.name} is ${age};}
```

使用两者，我们可以传递我们想要 this 关键字引用的对象。

.call 方法会立即执行！

.bind 方法会返回函数的拷贝值，但带有绑定的上下文！它不会立即执行。

:::

## 5、代码输出结果

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

```txt
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

## 6、代码输出结果

```txt
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

```txt
20
20
10
10
```

:::
