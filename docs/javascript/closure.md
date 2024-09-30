# 闭包

一个函数和对其周围状态（**lexical environment，词法环境**）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是**闭包**（**closure**）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

词法作用域根据源代码中声明变量的位置来确定该变量在何处可用。**嵌套函数可访问声明于它们外部作用域的变量。**

## 例子 1

```js
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name); // Mozilla
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
```

**解析：** 运行这段代码的效果和之前 `init()` 函数的示例完全一样。其中不同的地方（也是有意思的地方）在于内部函数 `displayName()` _在执行前_，从外部函数返回。

第一眼看上去，也许不能直观地看出这段代码能够正常运行。在一些编程语言中，一个函数中的局部变量仅存在于此函数的执行期间。一旦 `makeFunc()` 执行完毕，你可能会认为 `name` 变量将不能再被访问。然而，因为代码仍按预期运行，所以在 JavaScript 中情况显然与此不同。

原因在于，JavaScript 中的函数会形成了闭包。 闭包是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量。在本例子中，`myFunc` 是执行 `makeFunc` 时创建的 `displayName` 函数实例的引用。`displayName` 的实例维持了一个对它的词法环境（变量 `name` 存在于其中）的引用。因此，当 `myFunc` 被调用时，变量 `name` 仍然可用，其值 `Mozilla` 就被传递到`alert`中。

## 例子 2

下面是一个更有意思的示例

```javascript
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
```

在这个示例中，我们定义了 `makeAdder(x)` 函数，它接受一个参数 `x` ，并返回一个新的函数。返回的函数接受一个参数 `y`，并返回`x+y`的值。

从本质上讲，`makeAdder` 是一个函数工厂 — 他创建了将指定的值和它的参数相加求和的函数。在上面的示例中，我们使用函数工厂创建了两个新函数 — 一个将其参数和 5 求和，另一个和 10 求和。

`add5` 和 `add10` 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。在 `add5` 的环境中，`x` 为 5。而在 `add10` 中，`x` 则为 10。

## 作用

闭包很有用，因为它允许将函数与其所操作的某些数据（环境）关联起来。这显然类似于面向对象编程。在面向对象编程中，对象允许我们将某些数据（对象的属性）与一个或者多个方法相关联。

因此，通常你使用只有一个方法的对象的地方，都可以使用闭包。

## 用闭包模拟私有方法

下面的示例展现了如何使用闭包来定义公共函数，并令其可以访问私有函数和变量。

```js
var Counter = (function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */
```

在之前的示例中，每个闭包都有它自己的词法环境；而这次我们只创建了一个词法环境，为三个函数所共享：`Counter.increment，Counter.decrement` 和 `Counter.value`。

该共享环境创建于一个立即执行的匿名函数体内。这个环境中包含两个私有项：名为 `privateCounter` 的变量和名为 `changeBy` 的函数。这两项都无法在这个匿名函数外部直接访问。必须通过匿名函数返回的三个公共函数访问。

这三个公共函数是共享同一个环境的闭包。多亏 JavaScript 的词法作用域，它们都可以访问 `privateCounter` 变量和 `changeBy` 函数。

## 在循环中创建闭包：一个常见错误

在 ECMAScript 2015 引入 `let` 关键字 之前，在循环中有一个常见的闭包创建问题。参考下面的示例：

```
<p id="help">Helpful notes will appear here</p>
<p>E-mail: <input type="text" id="email" name="email"></p>
<p>Name: <input type="text" id="name" name="name"></p>
<p>Age: <input type="text" id="age" name="age"></p>
```

```javascript
function showHelp(help) {
  document.getElementById("help").innerHTML = help;
}

function setupHelp() {
  var helpText = [
    { id: "email", help: "Your e-mail address" },
    { id: "name", help: "Your full name" },
    { id: "age", help: "Your age (you must be over 16)" },
  ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function () {
      showHelp(item.help);
    };
  }
}

setupHelp();
```

数组 `helpText` 中定义了三个有用的提示信息，每一个都关联于对应的文档中的`input` 的 ID。通过循环这三项定义，依次为相应`input`添加了一个 `onfocus` 事件处理函数，以便显示帮助信息。

运行这段代码后，您会发现它没有达到想要的效果。无论焦点在哪个`input`上，显示的都是关于年龄的信息。

原因是赋值给 `onfocus` 的是闭包。这些闭包是由他们的函数定义和在 `setupHelp` 作用域中捕获的环境所组成的。这三个闭包在循环中被创建，但他们共享了同一个词法作用域，在这个作用域中存在一个变量 item。这是因为变量`item`使用 var 进行声明，由于变量提升，所以具有函数作用域。当`onfocus`的回调执行时，`item.help`的值被决定。由于循环在事件触发之前早已执行完毕，变量对象`item`（被三个闭包所共享）已经指向了`helpText`的最后一项。

解决这个问题的一种方案是使用更多的闭包：特别是使用前面所述的函数工厂：

```javascript
function showHelp(help) {
  document.getElementById("help").innerHTML = help;
}

function makeHelpCallback(help) {
  return function () {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
    { id: "email", help: "Your e-mail address" },
    { id: "name", help: "Your full name" },
    { id: "age", help: "Your age (you must be over 16)" },
  ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
  }
}

setupHelp();
```

这段代码可以如我们所期望的那样工作。所有的回调不再共享同一个环境， `makeHelpCallback` 函数为每一个回调创建一个新的词法环境。在这些环境中，`help` 指向 `helpText` 数组中对应的字符串。

另一种方法使用了匿名闭包：

```js
function showHelp(help) {
  document.getElementById("help").innerHTML = help;
}

function setupHelp() {
  var helpText = [
    { id: "email", help: "Your e-mail address" },
    { id: "name", help: "Your full name" },
    { id: "age", help: "Your age (you must be over 16)" },
  ];

  for (var i = 0; i < helpText.length; i++) {
    (function () {
      var item = helpText[i];
      document.getElementById(item.id).onfocus = function () {
        showHelp(item.help);
      };
    })(); // 马上把当前循环项的item与事件回调相关联起来
  }
}

setupHelp();
```

如果不想使用过多的闭包，你可以用 ES2015 引入的 let 关键词：

```js
function showHelp(help) {
  document.getElementById("help").innerHTML = help;
}

function setupHelp() {
  var helpText = [
    { id: "email", help: "Your e-mail address" },
    { id: "name", help: "Your full name" },
    { id: "age", help: "Your age (you must be over 16)" },
  ];

  for (var i = 0; i < helpText.length; i++) {
    let item = helpText[i];
    document.getElementById(item.id).onfocus = function () {
      showHelp(item.help);
    };
  }
}

setupHelp();
```

这个例子使用`let`而不是`var`，因此每个闭包都绑定了块作用域的变量，这意味着不再需要额外的闭包。

另一个可选方案是使用 `forEach()`来遍历`helpText`数组并给每一个`<p>`添加一个监听器，如下所示：

```javascript
function showHelp(help) {
  document.getElementById("help").innerHTML = help;
}

function setupHelp() {
  var helpText = [
    { id: "email", help: "Your e-mail address" },
    { id: "name", help: "Your full name" },
    { id: "age", help: "Your age (you must be over 16)" },
  ];

  helpText.forEach(function (text) {
    document.getElementById(text.id).onfocus = function () {
      showHelp(text.help);
    };
  });
}

setupHelp();
```

## 性能，闭包缺点

如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响。

例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是说，对于每个对象的创建，方法都会被重新赋值）。

考虑以下示例：

```
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function() {
    return this.name;
  };

  this.getMessage = function() {
    return this.message;
  };
}
```

在上面的代码中，我们并没有利用到闭包的好处，因此可以避免使用闭包。修改成如下：

```
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype = {
  getName: function() {
    return this.name;
  },
  getMessage: function() {
    return this.message;
  }
};
```

但我们不建议重新定义原型。可改成如下例子：

```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype.getName = function () {
  return this.name;
};
MyObject.prototype.getMessage = function () {
  return this.message;
};
```

## 闭包是什么

闭包`（closure）`是 `JavaScript` 的难点，也是它的特色。是号称 `JS` 面试三座大山（**原型与原型链**，**作用域及闭包**，**异步和单线程**）其中的一座山。

很多高级应用都需要依靠闭包来实验，包括我们去看很多的 `JS` 库和框架的源码，都少不了闭包的影子。

## 定义

### **闭包就是能够读取其它函数内部变量的函数。**

为什么我们要借助闭包来 **读取其它函数内部的变量** 呢？

因为 `JavaScript` 这个语言的特别之处就在于，**函数内部** 可以直接读取 **全局变量** ，但是在 **函数外部** 无法直接读取 **函数内部** 的 **局部变量** 。只有 **函数内部** 的 **子函数** 才能读取 **局部变量** ，可以看下面的例子。

```js
// 此部分只为演示全局变量和局部变量 与闭包无关
// 全局变量 在任何地方都可以访问
let s = 100;
function foo() {
  // 局部变量,函数运行时创建,函数执行完销毁
  let a = 10;
  function boo() {
    console.log("🚀🚀~ boo:", a); //🚀🚀~ boo: 10
  }
  boo();
}
foo();
console.log("🚀🚀~ s:", s); //🚀🚀~ s: 100
console.log("🚀🚀~ a:", a); // Uncaught ReferenceError: a is not defined
复制代码;
```

所以说，闭包可以简单理解成 **定义在一个函数内部的函数** 。闭包本质上，就是将 **函数内部** 和 **函数外部** 连接起来的桥梁。

## 如何从外部读取函数内部的局部变量

先来思考一个问题。如何从 **函数外部** 读取 **函数内部** 的 **局部变量** ？可是前面不是已经说了么，在 **函数外部** 无法直接读取 **函数内部** 的 **局部变量** 。

是的，确实无法 **直接** 读取，但是我们可以 **变通** 一下。

第一种是 `return` 返回。

```js
function foo() {
  let a = 88;
  return a;
}
console.log("🚀🚀~ : a", foo()); // 🚀🚀~ : a 88

复制代码;
```

第二种是上面提到的子函数。

```js
function foo() {
  let a = 99;
  function boo() {
    console.log("🚀🚀~ a:", a);
  }
  boo();
}
foo(); // 🚀🚀~ a: 99
复制代码;
```

这里先留下一个思考题。

- 根据闭包的定义，闭包就是能够读取其它函数内部变量的函数，那么以上两种方式是闭包么？如果不是，他们都能拿到局部变量的值，并且更简单，为什么还要用闭包呢？

## 为什么需要闭包

局部变量在函数执行时被创建，函数执行完被销毁，没有办法 **长久的保存状态** 和 **共享** 。

全局变量可能造成 **变量污染** ，使代码变得难以阅读，难以维护。

那么我们就希望有一种 **即可以长久的保存变量**，**又不会造成全局污染** 的操作，闭包也就应运而生了。

## 闭包的写法

```js
function f1() {
  let a = 10;
  function f2() {
    a++;
    console.log("🚀🚀~ a:", a);
  }
  return f2;
}
let fn = f1(); // f1执行的结果就是闭包
fn();
复制代码;
```

## 思考题解答

现在我们就来解答一下刚才留下的思考题，`子函数` 和直接 `return` 也能拿到局部变量的值，为什么还需要闭包呢。

```js
//闭包
function f1() {
  let a = 10;
  function f2() {
    a++;
    console.log("🚀🚀~ a:", a);
  }
  return f2;
}
let fn = f1();
fn();

//直接return
function f3() {
  var a = 10;
  a++;
  return a;
}
console.log("🚀🚀~ a:", f3());

//子函数
function f4() {
  let a = 10;
  function f5() {
    a++;
    console.log("🚀🚀~ a:", a);
  }
  f5();
}
f4();
复制代码;
```

可以看到控制台输出的结果是一样的。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9b4fc7f083644e781e8098ca25b9049~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

那么我们多调用几次呢？

```js
//闭包
function f1() {
  let a = 10;
  function f2() {
    a++;
    console.log("🚀🚀~ 闭包 ~ a:", a);
  }
  return f2;
}
let fn = f1(); // f1执行的结果就是闭包
fn();
fn();
fn();
fn();

//return
function f3() {
  let a = 10;
  a++;
  console.log("🚀🚀~ return a:", a);
}
f3();
f3();
f3();
f3();

//子函数
function f4() {
  let a = 10;
  function f5() {
    a++;
    console.log("🚀🚀~ 子函数 a:", a);
  }
  f5();
}
f4();
f4();
f4();
f4();
复制代码;
```

发现什么了么，我们使用闭包，每次调用后，变量 `a` 的值都会 `+1` ，而我们直接 `return` 以及 `子函数` 的方式，每次调用后，变量 `a` 的值一直都是 `11` 。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/515a78671d384bb6b1ab648959d7019e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

到这里之前留下的思考题就已经有答案了。闭包是一个能够读取其它函数内部变量的函数，但是能够读取其它函数内部变量的函数不一定就是闭包，为什么需要闭包，因为闭包 **即可以长久的保存变量**，**又不会造成全局污染**。

## 闭包的缺点

优点上面已经说过了，那么闭包有什么缺点呢。通常情况下，函数的活动对象会随着执行的上下文环境一起被销毁，但是由于闭包引用的是外部函数的活动对象，因此这个活动对象无法被销毁，这意味着闭包比普通函数要消耗更多的内存。

## 案例-缓存

```js
const cacheMemory = (() => {
  let cache = {};
  return {
    set: (id) => {
      if (id in cache) {
        return `查找到的结果是${cache[id]}`;
      }
      const result = asyncFn(id); //模拟异步结果
      cache[id] = result;
      return `查找到的结果是${cache[id]}`;
    },
  };
})();
复制代码;
```

## 案例-模拟栈

```js
const Stack = (() => {
  let arr = [];
  return {
    push: (value) => {
      arr.push(value);
    },
    pop: (value) => arr.pop(value),
    size: () => arr.length,
  };
})();

Stack.push("a");
Stack.push("b");
console.log("🚀🚀~ Stack.size:", Stack.size()); // 2
console.log('🚀🚀~ Stack.pop("b"):', Stack.pop("b")); // b
console.log("🚀🚀~ Stack.size:", Stack.size()); // 1
复制代码;
```

## 什么是柯里化（ curry）

在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

举例来说，一个接收 3 个参数的普通函数，在进行柯里化后， 柯里化版本的函数接收一个参数并返回接收下一个参数的函数， 该函数返回一个接收第三个参数的函数。 最后一个函数在接收第三个参数后， 将之前接收到的三个参数应用于原普通函数中，并返回最终结果。

```js
// 数学和计算科学中的柯里化：

//一个接收三个参数的普通函数
function sum(a, b, c) {
  console.log(a + b + c);
}

//用于将普通函数转化为柯里化版本的工具函数
function curry(fn) {
  //...内部实现省略，返回一个新函数
}

//获取一个柯里化后的函数
let _sum = curry(sum);

//返回一个接收第二个参数的函数
let A = _sum(1);
//返回一个接收第三个参数的函数
let B = A(2);
//接收到最后一个参数，将之前所有的参数应用到原函数中，并运行
B(3); // print : 6
复制代码;
```

而对于 Javascript 语言来说，我们通常说的柯里化函数的概念，与数学和计算机科学中的柯里化的概念并不完全一样。

在数学和计算机科学中的柯里化函数，一次只能传递一个参数；

而我们 Javascript 实际应用中的柯里化函数，可以传递一个或多个参数。

来看这个例子：

```js
//普通函数
function fn(a, b, c, d, e) {
  console.log(a, b, c, d, e);
}
//生成的柯里化函数
let _fn = curry(fn);

_fn(1, 2, 3, 4, 5); // print: 1,2,3,4,5
_fn(1)(2)(3, 4, 5); // print: 1,2,3,4,5
_fn(1, 2)(3, 4)(5); // print: 1,2,3,4,5
_fn(1)(2)(3)(4)(5); // print: 1,2,3,4,5
复制代码;
```

对于已经柯里化后的 \_fn 函数来说，当接收的参数数量与原函数的形参数量相同时，执行原函数； 当接收的参数数量小于原函数的形参数量时，返回一个函数用于接收剩余的参数，直至接收的参数数量与形参数量一致，执行原函数。

当我们知道柯里化是什么了的时候，我们来看看柯里化到底有什么用？

## 柯里化的用途

柯里化实际是把简答的问题复杂化了，但是复杂化的同时，我们在使用函数时拥有了更加多的自由度。 而这里对于函数参数的自由处理，正是柯里化的核心所在。 **柯里化本质上是降低通用性，提高适用性。**来看一个例子：

我们工作中会遇到各种需要通过正则检验的需求，比如校验电话号码、校验邮箱、校验身份证号、校验密码等， 这时我们会封装一个通用函数 checkByRegExp ,接收两个参数，校验的正则对象和待校验的字符串

```js
function checkByRegExp(regExp, string) {
  return regExp.test(string);
}

checkByRegExp(/^1\d{10}$/, "18642838455"); // 校验电话号码
checkByRegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, "test@163.com"); // 校验邮箱
```

上面这段代码，乍一看没什么问题，可以满足我们所有通过正则检验的需求。 但是我们考虑这样一个问题，如果我们需要校验多个电话号码或者校验多个邮箱呢？

我们可能会这样做：

```js
checkByRegExp(/^1\d{10}$/, "18642838455"); // 校验电话号码
checkByRegExp(/^1\d{10}$/, "13109840560"); // 校验电话号码
checkByRegExp(/^1\d{10}$/, "13204061212"); // 校验电话号码

checkByRegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, "test@163.com"); // 校验邮箱
checkByRegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, "test@qq.com"); // 校验邮箱
checkByRegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, "test@gmail.com"); // 校验邮箱
复制代码;
```

我们每次进行校验的时候都需要输入一串正则，再校验同一类型的数据时，相同的正则我们需要写多次， 这就导致我们在使用的时候效率低下，并且由于 checkByRegExp 函数本身是一个工具函数并没有任何意义， 一段时间后我们重新来看这些代码时，如果没有注释，我们必须通过检查正则的内容， 我们才能知道我们校验的是电话号码还是邮箱，还是别的什么。

此时，我们可以借助柯里化对 checkByRegExp 函数进行封装，以简化代码书写，提高代码可读性。

```js
//进行柯里化
let _check = curry(checkByRegExp);
//生成工具函数，验证电话号码
let checkCellPhone = _check(/^1\d{10}$/);
//生成工具函数，验证邮箱
let checkEmail = _check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);

checkCellPhone("18642838455"); // 校验电话号码
checkCellPhone("13109840560"); // 校验电话号码
checkCellPhone("13204061212"); // 校验电话号码

checkEmail("test@163.com"); // 校验邮箱
checkEmail("test@qq.com"); // 校验邮箱
checkEmail("test@gmail.com"); // 校验邮箱
复制代码;
```

再来看看通过柯里化封装后，我们的代码是不是变得又简洁又直观了呢。

经过柯里化后，我们生成了两个函数 checkCellPhone 和 checkEmail， checkCellPhone 函数只能验证传入的字符串是否是电话号码， checkEmail 函数只能验证传入的字符串是否是邮箱， 它们与 原函数 checkByRegExp 相比，从功能上通用性降低了，但适用性提升了。 柯里化的这种用途可以被理解为：**参数复用**

我们再来看一个例子

假定我们有这样一段数据：

```js
let list = [
  {
    name: "lucy",
  },
  {
    name: "jack",
  },
];
复制代码;
```

我们需要获取数据中的所有 name 属性的值，常规思路下，我们会这样实现:

```
let names = list.map(function(item) {
  return item.name;
})
复制代码
```

那么我们如何用柯里化的思维来实现呢

```
let prop = curry(function(key,obj) {
    return obj[key];
})
let names = list.map(prop('name'))
复制代码
```

看到这里，可能会有疑问，这么简单的例子，仅仅只是为了获取 name 的属性值，为何还要实现一个 prop 函数呢，这样太麻烦了吧。

我们可以换个思路，prop 函数实现一次后，以后是可以多次使用的，所以我们在考虑代码复杂程度的时候，是可以将 prop 函数的实现去掉的。

我们实际的代码可以理解为只有一行 let names = list.map(prop('name'))

这么看来，通过柯里化的方式，我们的代码是不是变得更精简了，并且可读性更高了呢。

## 如何封装柯里化工具函数

接下来，我们来思考如何实现 curry 函数。

回想之前我们对于柯里化的定义，**接收一部分参数，返回一个函数接收剩余参数，接收足够参数后，执行原函数。**

我们已经知道了，当柯里化函数接收到足够参数后，就会执行原函数，那么我们如何去确定何时达到足够的参数呢？

我们有两种思路：

1. 通过函数的 length 属性，获取函数的形参个数，形参的个数就是所需的参数个数
2. 在调用柯里化工具函数时，手动指定所需的参数个数

我们将这两点结合以下，实现一个简单 curry 函数：

```
/**
 * 将函数柯里化
 * @param fn    待柯里化的原函数
 * @param len   所需的参数个数，默认为原函数的形参个数
 */
function curry(fn,len = fn.length) {
    return _curry.call(this,fn,len)
}

/**
 * 中转函数
 * @param fn    待柯里化的原函数
 * @param len   所需的参数个数
 * @param args  已接收的参数列表
 */
function _curry(fn,len,...args) {
    return function (...params) {
        let _args = [...args,...params];
        if(_args.length >= len){
            return fn.apply(this,_args);
        }else{
            return _curry.call(this,fn,len,..._args)
        }
    }
}
复制代码
```

我们来验证一下：

```
let _fn = curry(function(a,b,c,d,e){
    console.log(a,b,c,d,e)
});

_fn(1,2,3,4,5);     // print: 1,2,3,4,5
_fn(1)(2)(3,4,5);   // print: 1,2,3,4,5
_fn(1,2)(3,4)(5);   // print: 1,2,3,4,5
_fn(1)(2)(3)(4)(5); // print: 1,2,3,4,5
复制代码
```

我们常用的工具库 lodash 也提供了 curry 方法，并且增加了非常好玩的 placeholder 功能，通过占位符的方式来改变传入参数的顺序。

比如说，我们传入一个占位符，本次调用传递的参数略过占位符， 占位符所在的位置由下次调用的参数来填充，比如这样：

直接看一下官网的例子：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/7/8/16bcf2a1a520ad3a~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

接下来我们来思考，如何实现占位符的功能。

对于 lodash 的 curry 函数来说，curry 函数挂载在 lodash 对象上，所以将 lodash 对象当做默认占位符来使用。

而我们的自己实现的 curry 函数，本身并没有挂载在任何对象上，所以将 curry 函数当做默认占位符

使用占位符，目的是改变参数传递的顺序，所以在 curry 函数实现中，每次需要记录是否使用了占位符，并且记录占位符所代表的参数位置。

直接上代码：

```
/**
 * @param  fn           待柯里化的函数
 * @param  length       需要的参数个数，默认为函数的形参个数
 * @param  holder       占位符，默认当前柯里化函数
 * @return {Function}   柯里化后的函数
 */
function curry(fn,length = fn.length,holder = curry){
    return _curry.call(this,fn,length,holder,[],[])
}
/**
 * 中转函数
 * @param fn            柯里化的原函数
 * @param length        原函数需要的参数个数
 * @param holder        接收的占位符
 * @param args          已接收的参数列表
 * @param holders       已接收的占位符位置列表
 * @return {Function}   继续柯里化的函数 或 最终结果
 */
function _curry(fn,length,holder,args,holders){
    return function(..._args){
        //将参数复制一份，避免多次操作同一函数导致参数混乱
        let params = args.slice();
        //将占位符位置列表复制一份，新增加的占位符增加至此
        let _holders = holders.slice();
        //循环入参，追加参数 或 替换占位符
        _args.forEach((arg,i)=>{
            //真实参数 之前存在占位符 将占位符替换为真实参数
            if (arg !== holder && holders.length) {
                let index = holders.shift();
                _holders.splice(_holders.indexOf(index),1);
                params[index] = arg;
            }
            //真实参数 之前不存在占位符 将参数追加到参数列表中
            else if(arg !== holder && !holders.length){
                params.push(arg);
            }
            //传入的是占位符,之前不存在占位符 记录占位符的位置
            else if(arg === holder && !holders.length){
                params.push(arg);
                _holders.push(params.length - 1);
            }
            //传入的是占位符,之前存在占位符 删除原占位符位置
            else if(arg === holder && holders.length){
                holders.shift();
            }
        });
        // params 中前 length 条记录中不包含占位符，执行函数
        if(params.length >= length && params.slice(0,length).every(i=>i!==holder)){
            return fn.apply(this,params);
        }else{
            return _curry.call(this,fn,length,holder,params,_holders)
        }
    }
}

```

验证一下

```js
let fn = function (a, b, c, d, e) {
  console.log([a, b, c, d, e]);
};

let _ = {}; // 定义占位符
let _fn = curry(fn, 5, _); // 将函数柯里化，指定所需的参数个数，指定所需的占位符

_fn(1, 2, 3, 4, 5); // print: 1,2,3,4,5
_fn(_, 2, 3, 4, 5)(1); // print: 1,2,3,4,5
_fn(1, _, 3, 4, 5)(2); // print: 1,2,3,4,5
_fn(1, _, 3)(_, 4, _)(2)(5); // print: 1,2,3,4,5
_fn(1, _, _, 4)(_, 3)(2)(5); // print: 1,2,3,4,5
_fn(_, 2)(_, _, 4)(1)(3)(5); // print: 1,2,3,4,5
```

至此，我们已经完整实现了一个 curry 函数~~

### 参考文章

- https://segmentfault.com/a/1190000012646221
