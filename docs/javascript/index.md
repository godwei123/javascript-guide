# JavaScript

## 函数柯里化

> 柯里化，可以理解为提前接收部分参数，延迟执行，不立即输出结果，而是返回一个接受剩余参数的函数。因为这样的特性，也被称为部分计算函数。柯里化，是一个逐步接收参数的过程。
> 反柯里化，是一个泛型化的过程。它使得被反柯里化的函数，可以接收更多参数。目的是创建一个更普适性的函数，可以被不同的对象使用。

### 柯里化

1、实现`add(1)(2,3)(4)()=10`的效果

依题意，有两个关键点要注意：

-   传入参数时，代码不执行输出结果，而是先记忆起来
-   当传入空的参数时，代表可以进行真正的运算

```js
function currying(fn) {
    let args = []; // 用来接收参数
    return function next() {
        let arguments = [...arguments];
        // 判断是否执行计算
        if (arguments.length > 0) {
            args = args.concat(arguments); // 收集传入的参数，进行缓存
            return next;
        } else {
            return fn.apply(null, args); // 符合执行条件，执行计算
        }
    };
}
let add = currying(function () {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
});
```

2、实现`add(1)(2,3)(4)(5)=15`的效果

```js
function add() {
    let args = [...arguments];
    let next = function () {
        let t = [...arguments];
        args = args.concat(t);
        return next;
    };

    next.toString = function () {
        return args.reduce((prev, cur) => prev + cur);
    };
    next.valueOf = function () {
        return args.reduce((prev, cur) => prev + cur);
    };
    return next;
}
```

### 反柯里化

```js
function unCurrying(fn) {
    return function () {
        var args = [].slice.call(arguments);
        var that = args.shift();
        return fn.apply(that, args);
    };
}

//============

Function.prototype.unCurrying = function () {
    var self = this;
    return function () {
        return Function.prototype.call.apply(self, arguments);
    };
};
```

## JSON

对其中的 undefined，function 将在 JSON.stringify 时会忽略掉

```js
const obj = {
    a: 3,
    b: 4,
    c: null,
    d: undefined,
    get e() {},
};

// {"a":3,"b":4,"c":null}

const obj = {
    a: 3,
    b: 4,
    c: null,
    d: undefined,
    get e() {
        return 100;
    },
};

// {"a":3,"b":4,"c":null,"e":100}

// const obj 中的 get e () {} 并不是函数，此处应该是重写了 obj.e 的 get 方法，因为 get 方法未定义返回值，因此在执行 JSON.stringify 时，执行 obj.e 的 get 方法，返回 undefined，因此被忽略
```

## softbind

bind 函数多次调用会已第一次绑定的 this 为准，softbind 已最后一次绑定传入的 this 为准；

```js
Function.prototype.softBind = function (obj, ...rest) {
    const fn = this;
    const bound = function (...args) {
        const o = !this || this === (window || global) ? obj : this;
        return fn.apply(o, [...rest, ...args]);
    };

    bound.prototype = Object.create(fn.prototype);
    return bound;
};
```

## Object.freeze & Object.seal

这两种方法之间的区别在于，当我们对一个对象使用 Object.freeze 方法时，该对象的属性是不可变的，这意味着我们不能更改或编辑这些属性的值。而在 Obj.seal 方法中，我们可以改变现有的属性。

1）Object.freeze()
Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

2）Object.seal()
Object.seal()方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。

3）相同点：
①ES5 新增
② 对象不可能扩展，也就是不能再添加新的属性或者方法。
③ 对象已有属性不允许被删除。
④ 对象属性特性不可以重新配置。

4）不同点：
①Object.seal 方法生成的密封对象，如果属性是可写的，那么可以修改属性值。
②Object.freeze 方法生成的冻结对象，属性都是不可写的，也就是属性值无法更改

## 说明下面例子

```js
[].forEach.call($$('*'), function (a) {
    a.style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16);
});
```

直观操作：获取页面所有的元素，然后给这些元素加上 1px 的外边框，并且使用了随机颜色

几个关键点：
1）选择页面中所有的元素

`$$`函数是现代浏览器提供的一个命令行 API，它相当于`document.querySelectorAll`，可以将当前页面中的 CSS 选择器作为参数传给该方法，然后它会返回匹配的所有元素。

2）遍历元素

`[].forEach.call( $$(''), function( a ) { / 具体的操作 */ });`
通过使用函数的 call 和 apply 方法，可以实现在类似 NodeLists 这样的类数组对象上调用数组方法。

3）为元素添加颜色

`a.style.outline="1px solid #" + color`
代码中使用 outline 的 CSS 属性给元素添加一个边框。由于渲染的 outline 是不在 CSS 盒模型中的，所以为元素添加 outline 并不会影响元素的大小和页面的布局。

4）生成随机颜色

` ~~(Math.random()(1<<24))).toString(16)`
①Math.random()(1<<24) 可以得到 0~2^24 - 1 之间的随机数，使用了位操作
② 因为得到的是一个浮点数，但我们只需要整数部分，使用取反操作符 ~ 连续两次取反获得整数部分，使用两个波浪号等价于使用 parseInt，
const a =12.34;
~~a == parseInt(a, 10); // true
③ 然后再用 toString(16) 的方式，转换为一个十六进制的字符串。toString()方法将数值转换成字符串时，接收一个参数用以指明数值的进制。如果省略了该参数，则默认采用十进制，但你可以指定为其他的进制，

## Function

```js
var a = Function.length;
var b = new Function().length;
console.log(a === b);
```

Function 构造器本身也是个 Function。他的 length 属性值为 1 。该属性 Writable: false, Enumerable: false, Configurable: true.

Function 原型对象的 length 属性值为 0 。

## Script 放在底部还会影响 dom 的解析和渲染吗？Script 内部的代码执行会等待 css 加载完吗？css 加载会影响 DOMContentLoaded 么？
