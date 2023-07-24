# `Array.prototype.at()`

**`at()`** 方法接收一个整数值并返回该索引对应的元素，参数允许正数和负数。负整数从数组中的最后一个元素开始倒数。

## 语法

```js
at(index);
```

**参数：**

`index` 要返回的数组元素的索引（位置）。当传递负数时，支持从数组末端开始的相对索引；也就是说，如果使用负数，返回的元素将从数组的末端开始倒数。

**返回值：**

匹配给定索引的数组中的元素。如果找不到指定的索引，则返回 `undefined`。

当 `index < 0` 时，该方法将访问索引 `index + array.length`。

## demo

```js
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.at(2)); // 3
console.log(arr.at(-2)); // 6
console.log(arr.at(8)); // undefined
console.log(arr.at(-8)); // undefined, -8+7=-1, -1 找不到指定的索引返回 undefined
```

## 使用场景

**返回数组倒数第 n 个元素**

```js
// 返回倒数第二个元素
const arr = [1, 2, 3, 4, 5, 6, 7];
// 1、使用 at 方法
arr.at(-2);

// 2、数组长度 + 下标计算
arr[arr.length - 2];

// 3、slice()方法
arr.slice(-2, -1)[0];
```

## 其他

`at()` 方法读取 `this` 的 `length` 属性并计算需要访问的索引。故类数组中可以使用。

```js
const arrayLike = {
  length: 2,
  0: "a",
  1: "b",
};
console.log(Array.prototype.at.call(arrayLike, -1)); // "b"
```
