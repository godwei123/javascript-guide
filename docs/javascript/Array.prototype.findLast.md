# `Array.prototype.findLast()`

**`findLast()`** 方法返回数组中满足提供的测试函数条件的最后一个元素的值。如果没有找到对应元素，则返回 `undefined`。

## 语法

```js
// 箭头函数
findLast((element) => {
  /* … */
});
findLast((element, index) => {
  /* … */
});
findLast((element, index, array) => {
  /* … */
});

// 回调函数
findLast(callbackFn);
findLast(callbackFn, thisArg);

// 内联回调函数
findLast(function (element) {
  /* … */
});
findLast(function (element, index) {
  /* … */
});
findLast(function (element, index, array) {
  /* … */
});
findLast(function (element, index, array) {
  /* … */
}, thisArg);
```

**参数：**

`element `当前遍历到的元素。

`index` 当前遍历到的元素的索引（位置）。

`array` 调用 `findLast()` 的数组本身。

`callbackFn` 数组中测试元素的函数，函数参数包括`element`, `index`, `array`，返回值必须为布尔值。

`thisArg` 执行 `callbackFn` 时，用作 `this` 的对象。

**返回值：**

数组中满足回调函数索引最高的元素；如果没有元素匹配，返回 `undefined`。

## 注意点

1、`findLast()` 方法对数组每一个元素按降序（索引从大到小）执行 `callbackFn` 函数，直到 `callbackFn` 返回一个真值。然后 `findLast()` 返回该元素的值并停止遍历数组。如果 `callbackFn` 没有返回一个真值，则 `findLast()` 返回 `undefined`。

2、`callbackFn` 会为数组中的每个元素调用，而不仅仅是那些被赋值的元素，这意味着对于稀疏数组来说，该方法的效率要低于那些只遍历有值的索引的方法。

3、如果为 `findLast()` 提供了 `thisArg` 参数，它将在每次调用 `callbackFn` 时作为 `this` 值。如果没有被提供，则使用 `undefined`。

4、`findLast()` 方法不会改变调用它的数组，但是提供的 `callbackFn` 可以。`findLast()` 处理的元素是在第一次调用 `callbackFn` *之前*设置的。因此：

- `callbackFn` 不会访问在调用 `findLast()` 开始后才添加到数组中的任何元素。
- 给已访问过的索引重新赋值将不会被 `callbackFn` 重新访问。
- 给初始的范围外的索引赋值，其将不会被 `callbackFn` 访问。
- 如果 `callbackFn` 更改了数组中现有的、尚未访问的元素，则其传递给 `callbackFn` 的值将是 `findLast()` 访问该元素索引时的值。
- 仍然会访问已删除的元素。

## demo

```js
const inventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "fish", quantity: 1 },
  { name: "cherries", quantity: 5 },
];

// return true inventory stock is low
function isNotEnough(item) {
  return item.quantity < 2;
}

console.log(inventory.findLast(isNotEnough));
// { name: "fish", quantity: 1 }

const result = inventory.findLast(({ quantity }) => quantity < 2);

console.log(result);
// { name: "fish", quantity: 1 }
```

### 访问不存在和删除的元素

```js
const array = [0, 1, , , , 5, 6];

array.findLast(function (value, index) {
  console.log(`Visited index ${index} with value ${value}`);
});

array.findLast(function (value, index) {
  if (index === 6) {
    console.log(`Deleting array[5] with value ${array[5]}`);
    delete array[5];
  }
  console.log(`Visited index ${index} with value ${value}`);
});
// expected output:
// > "Visited index 6 with value 6"
// > "Visited index 5 with value 5"
// > "Visited index 4 with value undefined"
// > "Visited index 3 with value undefined"
// > "Visited index 2 with value undefined"
// > "Visited index 1 with value 1"
// > "Visited index 0 with value 0"

// > "Deleting array[5] with value 5"
// > "Visited index 6 with value 6"
// > "Visited index 5 with value undefined"
// > "Visited index 4 with value undefined"
// > "Visited index 3 with value undefined"
// > "Visited index 2 with value undefined"
// > "Visited index 1 with value 1"
// > "Visited index 0 with value 0"
```

## 其他

- 第一个匹配的元素，使用` find()`。
- 数组中最后一个匹配元素的索引，使用` findLastIndex()`。
- 值的索引，使用` Array.prototype.indexOf()`。（它类似于 `findIndex()`，但是会检查每个元素是否和值相等，而不是使用一个测试函数。）
- 一个值是否包含在该数组中，使用 `Array.prototype.includes()`。同样地，它检查每个元素是否和值相等，而不是使用一个测试函数。
- 是否有任意一个元素满足提供的测试函数，使用 `Array.prototype.some()`。
