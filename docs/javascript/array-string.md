# Array & String

## Array 常见方法

1. `Array.prototype.concat()`
2. `Array.prototype.every()`
3. `Array.prototype.fill()`
4. `Array.prototype.filter()`
5. `Array.prototype.find()`
6. `Array.prototype.findIndex()`
7. `Array.prototype.flat()`
8. `Array.prototype.flatMap()`
9. `Array.prototype.forEach()`
10. `Array.from()`
11. `Array.prototype.includes()`
12. `Array.prototype.indexOf()`
13. `Array.isArray()`
14. `Array.prototype.join()`
15. `Array.prototype.lastIndexOf()`
16. `Array.prototype.map()`
17. `Array.of()`
18. `Array.prototype.pop()`
19. `Array.prototype.push()`
20. `Array.prototype.reduce()`
21. `Array.prototype.reduceRight()`
22. `Array.prototype.reverse()`
23. `Array.prototype.shift()`
24. `Array.prototype.slice()`
25. `Array.prototype.some()`
26. `Array.prototype.sort()`
27. `Array.prototype.splice()`
28. `Array.prototype.unshift()`

### Array.from() & Array.of()

`Array.from()` 和 `Array.of()` 是 JavaScript 中的两个数组方法，它们的主要区别在于它们的用途和参数。

`Array.from()` 方法从类数组对象或可迭代对象创建一个新的数组实例。类数组对象包括具有 length 属性和可索引元素的对象，或者可迭代对象如 Set 和 Map。例如：

```javascript
let set = new Set(["a", "b", "c"]);
let arrFromSet = Array.from(set);
console.log(arrFromSet); // Output: ['a', 'b', 'c']
```

`Array.of()` 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。例如：

```javascript
let arrOfNumbers = Array.of(1, 2, 3);
console.log(arrOfNumbers); // Output: [1, 2, 3]
```

所以，`Array.from()` 主要用于将类数组对象或可迭代对象转换为数组，而 `Array.of()` 主要用于创建一个新的数组实例。

### other

使用 delete 运算符可以将单元从数组中删除，但是请注意，单元删除后，数组的 length 属性并不会发生变化。删除的位置变为 <1 empty
item>

```js
let nums = [];
nums[0] = 1;
nums[2] = 3;
console.log(nums[1]); //undefined
```

其中的“空白单元”（empty slot）可能会导致出人意料的结果。a[1]的值为 undefined，但这与将其显式赋值为 undefined（a[1]
=undefined）还是有所区别。

如果字符串键值能够被强制类型转换为十进制数字的话，它就会被当作数字索引来处理。`a['13']=2; a.length => 14`

类数组 => 数组

```js
Array.from(arguments);

Array.prototype.slice.call(arguments);
```

## String 常见方法

1. `String.prototype.charAt()`
2. `String.prototype.charCodeAt()`
3. `String.prototype.codePointAt()`
4. `String.prototype.concat()`
5. `String.prototype.endsWith()`
6. `String.fromCharCode()`
7. `String.fromCodePoint()`
8. `String.prototype.includes()`
9. `String.prototype.indexOf()`
10. `String.prototype.lastIndexOf()`
11. `String.prototype.localeCompare()`
12. `String.prototype.match()`
13. `String.prototype.matchAll()`
14. `String.prototype.normalize()`
15. `String.prototype.padEnd()`
16. `String.prototype.padStart()`
17. `String.raw()`
18. `String.prototype.repeat()`
19. `String.prototype.replace()`
20. `String.prototype.replaceAll()`
21. `String.prototype.search()`
22. `String.prototype.slice()`
23. `String.prototype.split()`
24. `String.prototype.startsWith()`
25. `String.prototype.substring()`
26. `String.prototype.toLocaleLowerCase()`
27. `String.prototype.toLocaleUpperCase()`
28. `String.prototype.toLowerCase()`
29. `String.prototype.toString()`
30. `String.prototype.toUpperCase()`
31. `String.prototype.trim()`
32. `String.prototype.trimEnd()`
33. `String.prototype.trimStart()`
34. `String.prototype.valueOf()`

## Object.defineProperty()

**要注意有一个小小的例外：即便属性是 configurable:false，我们还是可以把 writable 的状态由 true 改为 false，但是无法由 false 改为 true。**

configurable:false 会禁止删除这个属性

writable:false,configurable:false 可以创建一个常量属性。

如果你想禁止一个对象添加新属性并且保留已有属性，可以使用 Object.preventExtensions(obj)

## Object.seal(..)

会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用 Object.preventExtensions(..)并把所有现有属性标记为 configurable:false。（不能添加新属性，不能重新配置或删除属性，**但可以修改属性值**）

## Object.freeze(..)

会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 Object.seal(..)并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们的值。（浅层）

obj.hasOwnProperty("ab")判断对象是否存在这个属性。（只检查当前对像）

## in 操作符

注意：看起来 in 操作符可以检查容器内是否有某个值，但是它实际上检查的是某个属性名是否存在。对于数组来说这个区别非常重要，4 in [2, 4, 6]的结果并不是你期待的 True，因为[2, 4, 6]这个数组中包含的属性名是 0、1、2，没有 4。

## obj.propertyIsEnumerable("ab")

会检查给定的属性名是否直接存在于对象中（而不是在原型链上）并且满足 enumerable:true。

## Object.keys(..)

返回一个数组，包含所有可枚举属性

## Object.getOwnPropertyNames(..)

返回一个数组，包含所有属性，无论它们是否可枚举。

对象不可以使用 for...of 遍历，但是可以自定义迭代器实现

## 问：如何判断一个对象是不是空对象？
