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
