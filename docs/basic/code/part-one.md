# 手写代码题 part-1

## 1、浅拷贝

```js
// 方法一
const _shallowClone = (target) => {
  if (typeof target === "object" && target !== null) {
    let cloneObj = Array.isArray(target) ? [] : {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        cloneObj[key] = target[key];
      }
    }
    return cloneObj;
  } else {
    return target;
  }
};

// 方法二
let ans = Object.assign({}, target);

// 方法三
let ans = { ...target };
```

## 2、深拷贝

```javascript
// 方法一
const _deepClone = (target) => {
  let cloneObj = {};
  for (let key in target) {
    if (typeof target[key] === "object") {
      cloneObj[key] = _deepClone(target[key]);
    } else {
      cloneObj[key] = target[key];
    }
  }
  return cloneObj;
};

// 方法二
function deepClone(val, map = new WeakMap()) {
  if (val === null || typeof val !== "object") return val;
  //循环引用
  if (map.has(val)) return map.get(val);
  let clone = Array.isArray(val) ? [] : {};
  map.set(val, clone);
  // 获取对象中所有的属性名（包含Symbol值）
  let keys = Reflect.ownKeys(val);
  //（可换为：Object.keys(val).concat(Object.ownPropertySymbols(val))）
  let len = keys.length;
  while (len--) {
    clone[keys[len]] = deepClone(val[keys[len]], map);
  }
  return clone;
}
```

## 3、防抖

```js
function debounce(fn, wait) {
  var timer = null;
  return function () {
    var context = this,
      args = [...arguments];
    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

// 立即执行版本
function debounce(fn, wait) {
  var timer = null;
  return function () {
    var context = this,
      args = [...arguments];
    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) clearTimeout(timer);

    //定义wait时间后把timer变为null
    //即在wait时间之后事件才会有效
    // timer为null,那么执行func函数
    if (!timer) fn.apply(context, args);
    timer = setTimeout(() => {
      timer = null;
    }, wait);
  };
}
```

## 4、节流

```js
// 时间戳版
function throttle(fn, delay) {
  var preTime = Date.now();
  return function () {
    var context = this,
      args = [...arguments],
      nowTime = Date.now();
    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
}

// 定时器版
function throttle(fun, wait) {
  let timeout = null;
  return function () {
    let context = this;
    let args = [...arguments];
    if (!timeout) {
      timeout = setTimeout(() => {
        fun.apply(context, args);
        timeout = null;
      }, wait);
    }
  };
}
```

## 5、Promise

```js
class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(executor) {
    this.state = MyPromise.PENDING;
    this.value = null;
    this.reason = null;
    this.resolvedCallback = [];
    this.rejectedCallback = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(value) {
    setTimeout(() => {
      if (this.state === MyPromise.PENDING) {
        this.state = MyPromise.FULFILLED;
        this.value = value;
        this.resolvedCallback.forEach((callback) => {
          callback(value);
        });
      }
    });
  }

  reject(reason) {
    setTimeout(() => {
      if (this.state === MyPromise.PENDING) {
        this.state = MyPromise.REJECTED;
        this.reason = reason;
        this.resolvedCallback.forEach((callback) => {
          callback(reason);
        });
      }
    });
  }

  then(onfulfilled, onrejected) {
    return new MyPromise((resolve, reject) => {
      onfulfilled = typeof onfulfilled === "function" ? onfulfilled : () => {};
      onrejected = typeof onrejected === "function" ? onrejected : () => {};
      if (this.state === MyPromise.PENDING) {
        this.resolvedCallback.push(onfulfilled);
        this.rejectedCallback.push(onrejected);
      }
      if (this.state === MyPromise.FULFILLED) {
        setTimeout(() => {
          onfulfilled(this.value);
        });
      }
      if (this.state === MyPromise.REJECTED) {
        setTimeout(() => {
          onrejected(this.reason);
        });
      }
    });
  }
}
```

## 6、Promise.all

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((res) => {
          result[i] = res;
          count++;
          if (count == promiseNum) {
            return resolve(result);
          }
        })
        .catch((err) => {
          return reject(err);
        });
    }
  });
}

// 手写一个Promise.all方法，但是存在最大并发数量限制
const promiseAll = (promiseLists = [], limit = Infinity) => {
  return new Promise((resolve, reject) => {
    let n = promiseLists.length;
    let result = [];
    let count = 0;
    let queue = [...promiseLists];

    function run() {
      if (queue.length > 0) {
        let time = queue.shift();
        return time()
          .then((res) => {
            result.push(res);
            count++;
            return run();
          })
          .catch((err) => reject(err))
          .finally(() => {
            if (count === n) {
              resolve(result);
            }
          });
      }
    }

    for (let i = 0; i < Math.min(limit, n); i++) {
      Promise.resolve().then(run());
    }
  });
};
```

## 7、Promise.race

```js
Promise.race = function (args) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = args.length; i < len; i++) {
      args[i].then(resolve, reject);
    }
  });
};
```

## 8、Array.prototype.reduce

```js
Array.prototype._reduce = function (fn, prev) {
  for (let i = 0; i < this.length; i++) {
    if (prev === undefined) {
      prev = fn(this[i], this[i + 1], i + 1, this);
      ++i;
    } else {
      prev = fn(prev, this[i], i, this);
    }
  }
  return prev;
};
```

## 9、Array.prototype.filter

```js
Array.prototype._filter = function (Fn) {
  if (typeof Fn !== "function") return;
  const array = this;
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const result = Fn.call(arguments[1], array[i], i, array);
    result && newArray.push(array[i]);
  }
  return newArray;
};
```

## 10、Array.prototype.map

```js
Array.prototype._map = function (Fn) {
  if (typeof Fn !== "function") return;
  const array = this;
  const newArray = new Array(array.length);
  for (let i = 0; i < array.length; i++) {
    let result = Fn.call(arguments[1], array[i], i, array);
    newArray[i] = result;
  }
  return newArray;
};
```

## 11、Array.prototype.flat

```js
function _flat(arr, depth) {
  if (!Array.isArray(arr) || depth <= 0) {
    return arr;
  }
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return prev.concat(_flat(cur, depth - 1));
    } else {
      return prev.concat(cur);
    }
  }, []);
}
```

## 12、new

```js
const _new = function (constructor, ...args) {
  // new关键字做了4件事
  // 1. 创建一个新对象
  const obj = {};
  // 2. 为新对象添加属性__proto__，将该属性链接至构造函数的原型对象
  obj.__proto__ = constructor.prototype;
  // 3. 执行构造函数，this被绑定在新对象上
  const res = constructor.apply(obj, args);
  // 4. 确保返回一个对象
  return res instanceof Object ? res : obj;
};

const _new = function () {
  const object1 = {};
  const Fn = [...arguments].shift();
  object1.__proto__ = Fn.prototype;
  const object2 = Fn.apply(object1, arguments);
  return object2 instanceof Object ? object2 : object1;
};

function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag = result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObject;
}
// 使用方法
objectFactory(构造函数, 初始化参数);
```

## 13、原型式继承

原型式继承是一种实现对象之间继承的方法，其基本思想是通过复制一个现有的对象来创建一个新的对象。这种方法的主要实现是通过 Object.create()方法。

以下是一个简单的原型式继承的例子：

```javascript
// 父对象
const parent = {
  name: "Parent",
  hobbies: ["reading", "coding"],
  sayName: function () {
    return this.name;
  },
};

// 创建一个新对象，这个对象的原型是parent
const child = Object.create(parent);

// 测试
console.log(child.name); // 输出: Parent
console.log(child.hobbies); // 输出: ['reading', 'coding']
console.log(child.sayName()); // 输出: Parent
```

在这个例子中，我们首先定义了一个父对象`parent`，然后使用`Object.create(parent)`创建了一个新的对象`child`，这个新对象的原型就是`parent`，因此它可以访问`parent`的所有属性和方法。

需要注意的是，原型式继承的一个问题是，由于继承的是引用类型的值，所以如果父对象的某个属性是数组或者对象，那么所有实例都会共享这个属性，一个实例修改这个属性，其他实例的这个属性也会被修改。

## 14、寄生式继承

寄生式继承是一种实现对象之间继承的方法，其基本思想是创建一个用于封装继承过程的函数，该函数在内部以某种方式增强对象，最后返回这个对象。

以下是一个简单的寄生式继承的例子：

```javascript
function createAnother(original) {
  var clone = Object.create(original); // 通过调用函数创建一个新对象
  clone.sayHi = function () {
    // 以某种方式来增强这个对象
    console.log("Hi!");
  };
  return clone; // 返回这个对象
}

var person = {
  name: "Person",
  hobbies: ["reading", "coding"],
};

var anotherPerson = createAnother(person);

console.log(anotherPerson.name); // 输出: Person
console.log(anotherPerson.hobbies); // 输出: ['reading', 'coding']
anotherPerson.sayHi(); // 输出: Hi!
```

在这个例子中，我们首先定义了一个`person`对象，然后使用`createAnother(person)`创建了一个新的对象`anotherPerson`，这个新对象继承了`person`的所有属性，并且增加了一个新的方法`sayHi`。

需要注意的是，寄生式继承同样存在原型式继承的问题，即如果父对象的某个属性是数组或者对象，那么所有实例都会共享这个属性，一个实例修改这个属性，其他实例的这个属性也会被修改。

## 15、instanceof

```js
const myInstanceof = (left, right) => {
  //基本数据类型的判断
  if (target === null || typeof target !== "object") {
    return false;
  }
  let leftProto = Object.getPrototypeOf(left);
  let rightProto = right.prototype;
  while (true) {
    if (leftProto === null) return false;
    if (leftProto === rightProto) return true;
    leftProto = Object.getPrototypeOf(leftProto);
  }
};
```

## 16、bind

```js
Function.prototype._bind = function (context, ...args) {
  context = context || window;
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;

  return function (..._args) {
    args = args.concat(_args);

    context[fnSymbol](...args);
    delete context[fnSymbol];
  };
};
```

## 17、apply

```js
Function.prototype._apply = function (context, argsArr) {
  context = context || window;

  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;

  context[fnSymbol](...argsArr);
  delete context[fnSymbol];
};
```

## 18、call

```js
Function.prototype._call = function (context, ...args) {
  context = context || window;

  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;

  context[fnSymbol](...args);
  delete context[fnSymbol];
};
```

## 19、Object.create()

```js
const _objectCreate = (proto) => {
  if (typeof proto !== "object" || proto === null) return;
  const fn = function () {};
  fn.prototype = proto;
  return new fn();
};
```

## 20、数组去重

```js
// 1. Set
Array.from(new Set(array));
[...new Set(array)];

// 2. for
let arr = [];
for (let i = 0; i < array.length; i++) {
  // or forEach,map
  if (arr.indexOf(array[i]) === -1) {
    // 如果数组元素有多个NaN,可以使用includes
    arr.push(array[i]);
  }
}

// 3. reduce + includes
array.reduce((pre, cur) => {
  !pre.includes(cur) && pre.push(cue);
  return pre;
}, []);

// 4. filter + includes
let newArr = [];
array.filter((item) => {
  return !newArr.includes(item) && (newArr[newArr.length] = item);
});
```
