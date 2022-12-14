# 手写代码题 part-3

## 手写 浅拷贝

```js
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

let ans = Object.assign({}, target);

let ans = { ...target };
```

## 手写 深拷贝

```javascript
const _deepClone = target =>{
  let cloneObj = {}
	for(let key in target){
    if(typeof target[key] === "object"){
    	cloneObj[key] = _deepClone(target[key])
  	}else{
      cloneObj[key] = target[key]
    }
  }
  return cloneObj
}


function deepClone(val,map = new WeakMap()){
    if(val === null || typeof val !=='object') return val;
    //循环引用
    if(map.has(val)) return map.get(val);
    let clone = Array.isArray(val) ? [] : {};
    map.set(val,clone);
    // 获取对象中所有的属性名（包含Symbol值）
    let keys = Reflect.ownKeys(val);（可换为：Object.keys(val).concat(Object.ownPropertySymbols(val))）
    let len = keys.length;
    while(len--){
        clone[keys[len]] = deepClone(val[keys[len]],map);
    }
    return clone;
}
```

## 手写 防抖

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
```

## 手写 节流

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

## 手写 发布订阅模式

```js
class EmitEvent {}
```

## 手写 `Promise.all`

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
```

## 手写 `Promise.race`

```js
Promise.race = function (args) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = args.length; i < len; i++) {
      args[i].then(resolve, reject);
    }
  });
};
```

## 手写 Array.prototype.reduce()

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

## 手写 Array.prototype.filter()

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

## 手写 Array.prototype.map()

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

## 手写 Array.prototype.flat()

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

## 手写 new

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
  let flag =
    result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObject;
}
// 使用方法
objectFactory(构造函数, 初始化参数);
```

## 手写 原型式继承

## 手写 寄生式继承

## 手写 instanceof

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

## 手写 bind

```js
Function.prototype._bind = function (target, ...arguments1) {
  const _this = this;
  return function (...arguments2) {
    return _this.apply(target, arguments1.concat(arguments2));
  };
};

// bind

Function.prototype.bind = function (context, ...args) {
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

## 手写 apply

```js
// apply

Function.prototype.apply = function (context, argsArr) {
  context = context || window;

  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;

  context[fnSymbol](...argsArr);
  delete context[fnSymbol];
};
```

## 手写 call

```js
Function.prototype._call = function (target = window) {
  target["fn"] = this;
  const result = target["fn"]([...arguments].shift());
  delete target["fn"];
  return result;
};

// call

Function.prototype.call = function (context, ...args) {
  context = context || window;

  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;

  context[fnSymbol](...args);
  delete context[fnSymbol];
};
```

## Object.create()

```js
const _objectCreate = (proto) => {
  if (typeof proto !== "object" || proto === null) return;
  const fn = function () {};
  fn.prototype = proto;
  return new fn();
};
```

## 手写 数组去重

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

array.reduce((pre, cur) => {
  !pre.includes(cur) && pre.push(cue);
  return pre;
}, []);

let newArr = [];
array.filter((item) => {
  return !newArr.includes(item) && (newArr[newArr.length] = item);
});
```

## 数组扁平化

```js
Array.prototype.myFlat = (arr) => {
  return [].concat(
    ...arr.map((item) => {
      return Array.isArray(item) ? myFlat(item) : item;
    })
  );
};

Array.prototype.myFlat = (arr) => {
  return arr.reduce((a, b) => {
    return a.concat(Array.isArray(b) ? myFlat(b) : b);
  }, []);
};
```

## sleep()

```js
const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};
sleep(1000).then(() => {
  console.log(1);
});

// ========
function sleep(callback, time) {
  if (typeof callback === "function") setTimeout(callback, time);
}
function output() {
  console.log(1);
}
sleep(output, 1000);
```

## List To Tree

```js
const convert = (list) => {
  let res = [];
  let map = list.reduce((pre, cur) => {
    pre[cur.id] = cur;
    return pre;
  }, {});
  for (const item of list) {
    if (item.parentId === 0) {
      res.push(item);
    } else {
      if (item.parentId in map) {
        const parent = map[item.parentId];
        parent.children = parent.children || [];
        parent.children.push(item);
      }
    }
  }
  return res;
};

// 原始 list 如下
let list = [
  { id: 1, name: "部门A", parentId: 0 },
  { id: 2, name: "部门B", parentId: 0 },
  { id: 3, name: "部门C", parentId: 1 },
  { id: 4, name: "部门D", parentId: 1 },
  { id: 5, name: "部门E", parentId: 2 },
  { id: 6, name: "部门F", parentId: 3 },
  { id: 7, name: "部门G", parentId: 2 },
  { id: 8, name: "部门H", parentId: 4 },
];
const result = convert(list);
console.log(result);
```

## EventEmitter

```typescript
type FnCallback = (...args) => any;

class EventEmitter {
  eventMap: { [key in string]?: FnCallback[] } = {};

  constructor() {}

  on(event: string, fn: FnCallback) {
    const listeners = this.eventMap[event] || (this.eventMap[event] = []);
    listeners.push(fn);
  }

  emit(event: string, ...args: any) {
    this.eventMap[event]?.forEach((fn) => {
      fn.call(null, args);
    });
  }

  off(event: string, fn: FnCallback): void {
    if (!this.eventMap[event]) return;
    this.eventMap[event] = this.eventMap[event].filter((cn) => fn !== cb);
  }

  once(event, fn: FnCallback) {
    this.on(event, (...args: any) => {
      fn.call(null, args);
      this.off(event, fn);
    });
  }
}
```
