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
