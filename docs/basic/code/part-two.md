# 手写代码题 part-2

## 21、数组扁平化

```js
// 方法一
Array.prototype.myFlat = (arr) => {
  return [].concat(
    ...arr.map((item) => {
      return Array.isArray(item) ? myFlat(item) : item;
    })
  );
};

// 方法二
Array.prototype.myFlat = (arr) => {
  return arr.reduce((a, b) => {
    return a.concat(Array.isArray(b) ? myFlat(b) : b);
  }, []);
};

function getFlatArr(list, deepNum = 1) {
  return deepNum > 0
    ? list.reduce((pre, item) => {
        return pre.concat(Array.isArray(item) ? getFlatArr(item, deepNum - 1) : item);
      }, [])
    : list.slice();
}
```

## 22、sleep()

```js
// 方法一
const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};
sleep(1000).then(() => {
  console.log(1);
});

// 方法二
function sleep(callback, time) {
  if (typeof callback === "function") setTimeout(callback, time);
}
function output() {
  console.log(1);
}
sleep(output, 1000);
```

## 23、List To Tree

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

## 24、EventEmitter

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

## 实现一个 compose 函数，进行函数合成

```js
const add10 = (x) => x + 10;
const mul10 = (x) => x * 10;
const add100 = (x) => x + 100;

// (10 + 100) * 10 + 10 = 1110
compose(add10, mul10, add100)(10);

function compose(...fns) {
  return fns.reduce((a, b) => (...args) => {
    return a(b(...args));
  });
}

const composeAsync = (...fns) => {
  return (x) => {
    return fns.reduceRight((prev, cur) => {
      return prev.then(cur);
    }, Promise.resolve(x));
  };
};

composeAsync(
  add10,
  mul10,
  add100
)(10).then((res) => {
  console.log(res);
});
```

## 实现类似 lodash.get 函数

```js
const object = { a: [{ b: { c: 3 } }] };

//=> 3
get(object, "a[0].b.c");
//=> 3
get(object, 'a[0]["b"]["c"]');
//=> 10086
get(object, "a[100].b.c", 10086);

function get(source, path, defaultValue = undefined) {
  // a[3].b -> a.3.b -> [a, 3, b]
  const paths = path
    .replace(/\[(\w+)\]/g, ".$1")
    .replace(/\["(\w+)"\]/g, ".$1")
    .replace(/\['(\w+)'\]/g, ".$1")
    .split(".");
  let result = source;
  for (const p of paths) {
    result = result?.[p];
  }
  return result === undefined ? defaultValue : result;
}

function get(arm, params = "", defaultVal) {
  if (typeof params !== "string" && !Array.isArray(params)) {
    throw new Error(`${params} is not string or array`);
  }
  if (!Array.isArray(params)) {
    params = params.split(/\].|[\[.]/);
  }
  for (let i = 0; i < params.length; i++) {
    if (Object.prototype.hasOwnProperty.call(arm, params[i])) {
      arm = arm[params[i]];
    } else {
      return defaultVal;
    }
  }
  return arm;
}
```

## (5).add(3).minus(2) = 6

```js
Number.prototype.add = function (x) {
  return this + x;
};
Number.prototype.minus = function (x) {
  return this - x;
};
console.log((5).add(3).minus(2)); // 6
```

## 手写 EventBus

```js
class EventBus {
  events = new Map();
  constructor() {}
  on(type, fn) {
    const callbacks = this.events.get(type);
    if (callbacks) {
      callbacks.push(fn);
    } else {
      this.events.set(type, [fn]);
    }
  }
  emit(type, ...args) {
    const context = this;
    const callbacks = this.events.get(type);
    if (!callbacks) return;
    callbacks.forEach((fn) => {
      fn.apply(context, [...args]);
    });
  }
}
```

## mergePromise

```js
const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
const ajax1 = () =>
  timeout(2000).then(() => {
    console.log("1");
    return 1;
  });
const ajax2 = () =>
  timeout(1000).then(() => {
    console.log("2");
    return 2;
  });
const ajax3 = () =>
  timeout(2000).then(() => {
    console.log("3");
    return 3;
  });
// --------- 1 --------
const mergePromise = (ajaxArray) => {
  // 1,2,3 done [1,2,3] 此处写代码 请写出ES6、ES3 2中解法
  var data = [];
  var sequence = Promise.resolve();
  ajaxArray.forEach((item) => {
    sequence = sequence.then(item).then((res) => {
      data.push(res);
      return data;
    });
  });
  return sequence;
};
// ---------- 2 -------
const mergePromise = (ajaxArray) => {
  let data = [];
  return ajaxArray.reduce((prev, curr) => {
    return prev.then(curr).then((res) => {
      data.push(res);
      return data;
    });
  }, Promise.resolve());
};

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log("done");
  console.log(data); // data 为[1,2,3]
});
// 执行结果为：1 2 3 done [1,2,3]
```

## 控制并发数

```javascript
function imageLoad(urls,fetchImage,limit) {
  //先创建长度为limit的池子
  let pool = urls.splice(0,limit).map((item,index)=>{
    return fetchImage(item).then(res=>{
      return index //将当前加载完图片的 index返回
    })
  });
  let p = Promise.race(pool) //将第一个执行成功的 先返回
  for (let i = 0; i < urls.length; i++) {
    p = p.then(index=>{  //形成链式调用.then .then
      pool[index] = fetchImage(urls[i]).then(()=>{
      //将已经加载完成的图片重新替换成新的 未加载的图片
        return index
      })
      return Promise.race(pool)
    })
  }
}
执行 imageLoad(imageUrls,fetchImage,3)


```

```
function imageLoad1(urls, limit) {
  function run() {
    if(urls.length > 0) {
      const url = urls.shift()
      return fetchImage(url).then(res => {
        return run() //当图片请求成功之后继续递归调用run
      })
    }
  }
  // 当imageUrls.length < limit的时候，我们也没有必要去创建多余的Promise
  const promiseList = Array(Math.min(limit, urls.length))
    .fill(Promise.resolve())
    .map(promise => promise.then(run))

  Promise.all(promiseList).then(()=>{
    //全部加载完成后的操作
  })
}
imageLoad1(imageUrls,3)


```

## 实现函数功能

```
function sortArr(arr1,arr2){
    let arr = arr1.flat(Infinity)
    arr = arr.concat(arr2.flat(Infinity))
    arr = [...new Set(arr)].sort((a,b)=>a-b)
    let ans=[]
    let k=-1
    let index=-1
    for(let i=0;i<arr.length;i++){
        let t = Math.floor(arr[i]/10);
        if(t!==k){
            index++;
            k=t
            ans[index] = []
            ans[index].push(arr[i])
        }else {
            ans[index].push(arr[i])
        }
    }
    return ans
}

let arr1 = [ 1, [2,4], [44], [22,21] ],arr2 = [ 2, [6], [55], [ 33, [32,31] ] ]

// console.log(sortArr(arr1, arr2));


```

## 实现函数功能

```
const data = [{
    id:1,
    name:'xx',
    children:[
        {id:11,name:'1xx',children:[ {id:111,name:'xx'} ]},
        {id:12,name:'12x'} ]
}]

function data2Tree(data){
    let ans={}
    const dfs = (target,id)=>{
        ans[target.id] = {
            name:target.name
        }
        if(id){
            ans[target.id].parent = id
        }
        if(target.children){
            ans[target.id].children = []
            for (let child of target.children) {
                ans[target.id].children.push(child.id)
                dfs(child,target.id)
            }
        }

    }
    for (let datum of data) {
        dfs(datum)
    }
    return ans
}

console.log(data2Tree(data))
```
