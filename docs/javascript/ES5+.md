# ES6、ES7、ES8、ES9、ES10、ES11、ES12 新特性

## 一、**ES6（2015）**

> - 类 `class`
> - 模块化
> - 箭头函数
> - 函数默认值
> - 模板字符串
> - 解构赋值
> - 延展运算符
> - 对象属性简写
> - `promise`
> - `let`和`const`

### **1. 类（class）**

```
class Man {
  constructor(name) {
    this.name = '小豪';
  }
  console() {
    console.log(this.name);
  }
}
const man = new Man('小豪');
man.console(); // 小豪
```

### **2. 模块化(ES Module)**

```
// 模块 A 导出一个方法
export const sub = (a, b) => a + b;
// 模块 B 导入使用
import { sub } from './A';
console.log(sub(1, 2)); // 3
```

### **3. 箭头（Arrow）函数**

```
const func = (a, b) => a + b;
func(1, 2); // 3
```

### **4. 函数参数默认值**

```
function foo(age = 25,){ // ...}
```

### **5. 模板字符串**

```
const name = '小豪';
const str = `Your name is ${name}`;
```

### **6. 解构赋值**

```
let a = 1, b= 2;
[a, b] = [b, a]; // a 2  b 1
```

### **7. 延展操作符**

```
let a = [...'hello world']; // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
```

### **8. 对象属性简写**

```
const name='小豪',
const obj = { name };
```

### **9. Promise**

```
Promise.resolve().then(() => { console.log(2); });
console.log(1);
// 先打印 1 ，再打印 2
```

### **10. let 和 const**

```
let name = '小豪'；
const arr = [];
```

## **二、ES7（2016）**

### **1. Array.prototype.includes()**

```
[1].includes(1); // true
```

### **2. 指数操作符**

```
2**10; // 1024
```

## **三、ES8（2017）**

### **1. async/await**

异步终极解决方案

```
async getData(){
    const res = await api.getTableData(); // await 异步任务
    // do something
}
```

### **2. Object.values()**

```
Object.values({a: 1, b: 2, c: 3}); // [1, 2, 3]
```

### **3. Object.entries()**

```
Object.entries({a: 1, b: 2, c: 3}); // [["a", 1], ["b", 2], ["c", 3]]
```

### **4. String padding**

```
// padStart
'hello'.padStart(10); // "     hello"
// padEnd
'hello'.padEnd(10) "hello     "
```

### **5. 函数参数列表结尾允许逗号**

### **6. Object.getOwnPropertyDescriptors()**

> 获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。

### **7. SharedArrayBuffer 对象**

> SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，

```
/**
 *
 * @param {*} length 所创建的数组缓冲区的大小，以字节(byte)为单位。
 * @returns {SharedArrayBuffer} 一个大小指定的新 SharedArrayBuffer 对象。其内容被初始化为 0。
 */
new SharedArrayBuffer(10)
```

### **8. Atomics 对象**

> Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。

## **四、ES9（2018）**

### **1. 异步迭代**

await 可以和 for...of 循环一起使用，以串行的方式运行异步操作

```
async function process(array) {
  for await (let i of array) {
    // doSomething(i);
  }
}
```

### **2. Promise.finally()**

```
Promise.resolve().then().catch(e => e).finally();
```

### **3. Rest/Spread 属性**

```
const values = [1, 2, 3, 5, 6];
console.log(Math.max(...values) ); // 6
```

### **4. 正则表达式命名捕获组**

```
const reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const match = reg.exec('2021-02-23');
```

![图片](../public/640-20220222134959941.jpeg)

### **5. 正则表达式反向断言**

```
(?=p)、(?<=p)  p前面(位置)、p 后面(位置)
(?!p)、(?<!p>) 除了 p 前面(位置)、除了 p 后面(位置)
```

(?<=w)

![图片](../public/640-20220222134953129.jpeg)

(?<!w)

![图片](../public/640-20220222134948509.jpeg)

### **6. 正则表达式 dotAll 模式**

> 正则表达式中点.匹配除回车外的任何单字符，标记 s 改变这种行为，允许行终止符的出现

```
/hello.world/.test('hello\nworld'); // false
```

## **五、ES10（2019）**

### **1. Array.flat()和 Array.flatMap()**

flat()

```
[1, 2, [3, 4]].flat(Infinity); // [1, 2, 3, 4]
```

flatMap()

```
[1, 2, 3, 4].flatMap(a => [a**2]); // [1, 4, 9, 16]
```

### **2. String.trimStart()和 String.trimEnd()**

去除字符串首尾空白字符

### **3. String.prototype.matchAll**

> matchAll（）为所有匹配的匹配对象返回一个迭代器

```
const raw_arr = 'test1  test2  test3'.matchAll((/t(e)(st(\d?))/g));
const arr = [...raw_arr];
```

### **4. Symbol.prototype.description**

> 只读属性，回 Symbol 对象的可选描述的字符串。

```
Symbol('description').description; // 'description'
```

### **5. Object.fromEntries()**

> 返回一个给定对象自身可枚举属性的键值对数组

```
// 通过 Object.fromEntries， 可以将 Map 转化为 Object:
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
console.log(Object.fromEntries(map)); // { foo: "bar", baz: 42 }
```

### **6. 可选 Catch**

## **六、ES11（2020）**

### **1. Nullish coalescing Operator(空值处理)**

表达式在 ?? 的左侧 运算符求值为 undefined 或 null，返回其右侧。

```
let user = {
    u1: 0,
    u2: false,
    u3: null,
    u4: undefined
    u5: '',
}
let u2 = user.u2 ?? '用户2'  // false
let u3 = user.u3 ?? '用户3'  // 用户3
let u4 = user.u4 ?? '用户4'  // 用户4
let u5 = user.u5 ?? '用户5'  // ''
```

### **2. Optional chaining（可选链）**

?.用户检测不确定的中间节点

```
let user = {}
let u1 = user.childer.name // TypeError: Cannot read property 'name' of undefined
let u1 = user.childer?.name // undefined
```

### **3. Promise.allSettled**

> 返回一个在所有给定的 promise 已被决议或被拒绝后决议的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果

```
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => reject('我是失败的Promise_1'));
const promise4 = new Promise((resolve, reject) => reject('我是失败的Promise_2'));
const promiseList = [promise1,promise2,promise3, promise4]
Promise.allSettled(promiseList)
.then(values=>{
  console.log(values)
});
```

![图片](../public/640-20220222135323570.jpeg)

### **4. import()**

按需导入

### **5. 新基本数据类型 BigInt**

> 任意精度的整数

### **6. globalThis**

- 浏览器：window
- worker：self
- node：global

---

## 七、**ES12（2021）**

### **1. replaceAll**

> 返回一个全新的字符串，所有符合匹配规则的字符都将被替换掉

```
const str = 'hello world';
str.replaceAll('l', ''); // "heo word"
```

### **2. Promise.any**

> Promise.any() 接收一个 Promise 可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise

```
const promise1 = new Promise((resolve, reject) => reject('我是失败的Promise_1'));
const promise2 = new Promise((resolve, reject) => reject('我是失败的Promise_2'));
const promiseList = [promise1, promise2];
Promise.any(promiseList)
.then(values=>{
  console.log(values);
})
.catch(e=>{
  console.log(e);
});
```

![图片](../public/640-20220222135316594.jpeg)

### **3. WeakRefs**

> 使用 WeakRefs 的 Class 类创建对对象的弱引用(对对象的弱引用是指当该对象应该被 GC 回收时不会阻止 GC 的回收行为)

### **4. 逻辑运算符和赋值表达式**

> 逻辑运算符和赋值表达式，新特性结合了逻辑运算符（&&，||，??）和赋值表达式而 JavaScript 已存在的 复合赋值运算符有：

```
a ||= b
//等价于
a = a || (a = b)

a &&= b
//等价于
a = a && (a = b)

a ??= b
//等价于
a = a ?? (a = b)
```

### **5. 数字分隔符**

> 数字分隔符，可以在数字之间创建可视化分隔符，通过\_下划线来分割数字，使数字更具可读性

```
const money = 1_000_000_000;
//等价于
const money = 1000000000;

1_000_000_000 === 1000000000; // true
```

![图片](../public/640-20220222135310392.jpeg)
