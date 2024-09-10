# 节流与防抖

## 防抖(debounce)

**防抖(debounce)是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。**

应用场景：

- 限制 **鼠标连击** 触发
- 每次 resize/scroll 触发统计事件
- 文本输入的验证（连续输入文字后发送 AJAX 请求进行验证，验证一次就好）

### 非立即执行版

> 非立即执行版的意思是触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

```javascript
// 防抖动函数
function debounce(func, delay) {
  let timer;
  return function () {
    let context = this;
    if (timer) clearTimeout(timer); // 每次执行的时候把前一个 setTimeout clear 掉
    timer = setTimeout(() => {
      func.apply(context, arguments);
    }, delay);
  };
}
```

### 立即执行版

立即执行版的意思是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。

```javascript
// 防抖动函数-立即执行版
function debounce(func, delay) {
  let timer;
  return function () {
    let context = this;

    if (timer) clearTimeout(timer); // 每次执行的时候把前一个 setTimeout clear 掉

    let callNow = !timer;
    timer = setTimeout(() => {
      timer = null;
    }, delay);

    if (callNow) func.apply(context, arguments);
  };
}
```

### 综合版

```javascript
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func, delay, immediate) {
  // 双剑合璧版
  let timer;
  return function () {
    let context = this;

    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) func.apply(context, arguments);
    } else {
      timer = setTimeout(() => {
        func.apply(context, arguments);
      }, delay);
    }
  };
}
```

## 节流(throttle)

**所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。**

### 时间戳版

```javascript
function throttle(func, wait) {
  // 时间戳版
  let previous = 0;
  return function () {
    let now = new Date();
    if (now - previous > wait) {
      previous = now;
      func.apply(this, arguments);
    }
  };
}
```

时间戳版没有用到定时器，所以不需要再声明一个 this 变量。

### 定时器版

```javascript
function throttle(func, wait) {
  // 定时器版
  let timer;
  return function () {
    let context = this;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, arguments);
      }, wait);
    }
  };
}
```
