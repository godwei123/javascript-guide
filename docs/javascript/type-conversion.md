# 类型转换

1. `undefined == null`，结果是 true。且它俩与所有其他值比较的结果都是 false。
2. `String == Boolean`，需要两个操作数同时转为 Number。
3. `String/Boolean == Number`，需要 String/Boolean 转为 Number。
4. `Object == Primitive`，需要 Object 转为 Primitive(具体通过 valueOf 和 toString 方法)。

## ToString

- Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，
- Boolean 类型，true 转换为 "true"，false 转换为 "false"。
- Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。
- Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。
- 对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()来返回内部属性的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。

```js
console.log(String(undefined)); // "undefined"
console.log(String(null)); // "null"
console.log(String(true)); // "true"
console.log(String(false)); // "false"
console.log(String(0)); // "0"
console.log(String(-0)); // "0"
console.log(String(NaN)); // "NaN"
console.log(String(Infinity)); // "Infinity"
console.log(String(-Infinity)); // "-Infinity"

console.log(String("")); // ""
console.log(String("abc")); // "abc"

console.log(String(Symbol())); // "Symbol()"
console.log(String(Symbol("foo"))); // "Symbol(foo)"

console.log(String([])); // ""
console.log(String([1, 2, 3])); // "1,2,3"
console.log(String([null, undefined])); // ","

console.log(String({})); // "[object Object]"
console.log(String({ a: 1 })); // "[object Object]"
console.log(String({ valueOf: () => 123 })); // "123"
console.log(String({ toString: () => 123 })); // "123"
console.log(String({ valueOf: () => {}, toString: () => 123 })); // "123"

console.log(String({ valueOf: () => {}, toString: () => {} })); // "[object Object]"
```

## ToNumber

- Undefined 类型的值转换为 NaN。
- Null 类型的值转换为 0。
- Boolean 类型的值，true 转换为 1，false 转换为 0。
- String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。
- Symbol 类型的值不能转换为数字，会报错。
- 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有 valueOf()方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

```js
console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number("")); // 0
console.log(Number("123")); // 123
console.log(Number("-123")); // -123
console.log(Number("123.45")); // 123.45
console.log(Number("0x11")); // 17
console.log(Number("foo")); // NaN
console.log(Number([])); // 0

console.log(Number({})); // NaN
console.log(Number({ a: 1 })); // NaN
console.log(Number([1, 2, 3])); // NaN
console.log(Number([5])); // 5
console.log(Number(["1", "2", "3"])); // NaN
console.log(Number(["5"])); // 5
console.log(Number(["5", "5"])); // NaN

console.log(Number(Symbol())); // TypeError

console.log(Number(function () {})); // NaN

console.log(Number({ valueOf: () => 123 })); // 123
console.log(Number({ valueOf: () => "123" })); // 123

console.log(Number({ toString: () => 123 })); // 123
console.log(Number({ toString: () => "123" })); // 123

console.log(Number({ valueOf: () => {} })); // NaN
console.log(Number({ toString: () => {} })); // NaN

console.log(Number({ valueOf: () => 123, toString: () => 456 })); // 123
```

从 ES5 开始，使用 Object.create(null)创建的对象[[Prototype]]属性为 null，并且没有 valueOf()和 toString()方法，因此无法进行强制类型转换。

```js
let obj = Object.create(null);
console.log(obj.toString()); // TypeError: obj.toString is not a function
console.log(obj.valueOf()); // TypeError: obj.valueOf is not a function
console.log(Number(obj)); // TypeError: Cannot convert object to primitive value
```

## ToBoolean

- undefined
- null
- false
- +0、-0
- NaN
- ""

假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。建议使用 `Boolean(..)` 和 `!!`来进行显式转换以便让代码更清晰易读。

## ToPrimitive

> `[] + {}` 和 `{} + []`，它们返回不同的结果，分别是"[object Object]"和 0。

ToPrimitive(obj,preferredType)

JS 引擎内部转换为原始值 ToPrimitive(obj,preferredType)函数接受两个参数，第一个 obj 为被转换的对象，第二个 preferredType 为希望转换成的类型（默认为空，接受的值为 Number 或 String）。在执行 ToPrimitive(obj,preferredType)时如果第二个参数为空并且 obj 为 Date 的实例时，此时 preferredType 会被设置为 String，其他情况下 preferredType 都会被设置为 Number。

**如果 preferredType 为 Number**，ToPrimitive 执行过程如下：

1. 如果 obj 为原始值，直接返回；
2. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；
3. 否则调用 obj.toString()，如果执行结果是原始值，返回之；
4. 否则抛异常。

**如果 preferredType 为 String**，将上面的第 2 步和第 3 步调换，即：

1. 如果 obj 为原始值，直接返回；
2. 否则调用 obj.toString()，如果执行结果是原始值，返回之；
3. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；
4. 否则抛异常。

## `==` 操作符的强制类型转换规则

1. 首先会判断两者类型是否相同，相同的话就比较两者的大小；
2. 类型不相同的话，就会进行类型转换；
3. 会先判断是否在对比 `null` 和 `undefined`，是的话就会返回 `true`
4. 判断两者类型是否为 `string` 和 `number`，是的话就会将字符串转换为 `number`
5. 判断其中一方是否为 `boolean`，是的话就会把 `boolean` 转为 `number` 再进行判断
6. 判断其中一方是否为 `object` 且另一方为 `string`、`number` 或者 `symbol`，是的话就会把 `object` 转为原始类型再进行判断

### 1、字符串和数字

(1) 如果 Type(x)是数字，Type(y)是字符串，则返回 x == ToNumber(y)的结果。

(2) 如果 Type(x)是字符串，Type(y)是数字，则返回 ToNumber(x) == y 的结果。

### 2、其他类型和布尔类型之间的相等比较

(1) 如果 Type(x)是布尔类型，则返回 ToNumber(x) == y 的结果；

(2) 如果 Type(y)是布尔类型，则返回 x == ToNumber(y)的结果。

### 3、null 和 undefined

(1) 如果 x 为 null, y 为 undefined，则结果为 true。

(2) 如果 x 为 undefined, y 为 null，则结果为 true。

(3) null == null , undefined == undefined , null == undefined， 其余为 false

### 4．对象和非对象之间的相等比较

(1) 如果 Type(x)是字符串或数字，Type(y)是对象，则返回 x == ToPrimitive(y)的结果；

(2) 如果 Type(x)是对象，Type(y)是字符串或数字，则返回 ToPrimitive(x) == y 的结果。

因为没有对应的封装对象，所以 null 和 undefined 不能够被封装（boxed）,Object(null)和 Object()均返回一个常规对象。

NaN 能够被封装为数字封装对象，但拆封之后 NaN == NaN 返回 false，因为 NaN 不等于 NaN。

```javascript
let a = null;
let b = Object(a);
a == b; //false

let a = undefined;
let b = Object(a);
a == b; //false
```

### 5、部分特殊比较结果

```javascript
console.log("0" == null); // false
console.log("0" == undefined); // false
console.log("0" == false); // true
console.log("0" == NaN); // false
console.log("0" == 0);
console.log("0" == ""); // false

console.log(false == null); // false
console.log(false == undefined); // false
console.log(false == NaN); // false
console.log(false == 0); // true
console.log(false == ""); // true
console.log(false == []); // true
console.log(false == {}); // false

console.log("" == null); // false
console.log("" == undefined); // false
console.log("" == NaN); // false
console.log("" == 0); // true
console.log("" == []); // true
console.log("" == {}); // false

console.log(0 == null); // false
console.log(0 == undefined); // false
console.log(0 == NaN); // false
console.log(0 == []); // true
console.log(0 == {}); // false
```

#### 6、极端情况

**[] == ![] => true**; 进行布尔值的显式强制类型转换 ![] 转换为 false, [] == false. ==> true; `true == [] ==> false`; `true == ![] ==> true == false ==> false`

**2 == [2] => true; '' == [null] => true**; ==右边的值[2]和[null]会进行 ToPrimitive 强制类型转换，以便能够和左边的基本类型值（2 和""）进行比较。
因为数组的 valueOf()返回数组本身，所以强制类型转换过程中数组会进行字符串化。
第一行中的[2]会转换为"2"，然后通过 ToNumber 转换为 2。第二行中的[null]会直接转换为""。
[null].toString() ===> “”

**0 == '\n'**; ""、"\n"（或者" "等其他空格组合）等空字符串被 ToNumber 强制类型转换为 0。

```js
console.log(1 == true); // true
console.log(2 == true); // false
console.log(0 == false); // true
console.log(1 == false); // false
console.log(2 == false); // false
console.log(0 == ""); // true
console.log(1 == ""); // false
console.log(2 == ""); // false
console.log(0 == "0"); // true
console.log(1 == "1"); // true
console.log(2 == "2"); // true
console.log(0 == "0.0"); // true
console.log(1 == "1.0"); // true
console.log(2 == "2.0"); // true
console.log(0 == []); // true
console.log(1 == []); // false
console.log(2 == []); // false
console.log(0 == [0]); // true
console.log(1 == [1]); // true
console.log(2 == [2]); // true
console.log(0 == [0, 0]); // false
console.log(1 == [1, 1]); // false
console.log(0 == Symbol()); // false
console.log(0 == Symbol(0)); // false

console.log(0 == null); // false
console.log(1 == null); // false
console.log(2 == null); // false

console.log(0 == undefined); // false
console.log(1 == undefined); // false

console.log(0 == NaN); // false
console.log(1 == NaN); // false

console.log(0 == {}); // false
console.log(1 == {}); // false

console.log(0 == { valueOf: () => 0 }); // true
console.log(1 == { valueOf: () => 1 }); // true

console.log(0 == { toString: () => "0" }); // true
console.log(1 == { toString: () => "1" }); // true

console.log(0 == { valueOf: () => {}, toString: () => "0" }); // true
console.log(1 == { valueOf: () => {}, toString: () => "1" }); // true

console.log(0 == { valueOf: () => 0, toString: () => {} }); // true
console.log(1 == { valueOf: () => 1, toString: () => {} }); // true

console.log(0 == { valueOf: () => {}, toString: () => {} }); // false
console.log(1 == { valueOf: () => {}, toString: () => {} }); // false

console.log(0 == { valueOf: () => 0, toString: () => "1" }); // true
console.log(1 == { valueOf: () => 1, toString: () => "0" }); // true

console.log(0 == { valueOf: () => "0", toString: () => {} }); // true
console.log(1 == { valueOf: () => "1", toString: () => {} }); // true

console.log(0 == { valueOf: () => "1", toString: () => {} }); // false
console.log(1 == { valueOf: () => "0", toString: () => {} }); // false
```

## 其他情况

该算法仅针对 a < b, **a <= b 会被处理为 b < a**。比较双方首先调用 ToPrimitive，如果结果出现非字符串，就根据 ToNumber 规则将双方强制类型转换为数字来进行比较。

```javascript
let a = { x: 42 };
let b = { x: 43 };

console.log(a < b); // false
console.log(a == b); // false
console.log(a > b); // false
console.log(a <= b); // true
console.log(a >= b); // true
```

因为根据规范 a <= b 被处理为 b < a，然后将结果反转。因为 b < a 的结果是 false，所以 a <= b 的结果是 true。这可能与我们设想的大相径庭，即<=应该是“小于或者等于”。实际上 JavaScript 中<=是“不大于”的意思（即！(a > b)，处理为！(b < a)）。同理，a >= b 处理为 b<= a。

## 隐式强制类型转换

下面的情况会发生布尔值。

1. if (..)语句中的条件判断表达式。
2. for ( .. ; .. ; .. )语句中的条件判断表达式（第二个）。
3. while (..)和 do..while(..)循环中的条件判断表达式。
4. ? ：中的条件判断表达式。
5. 逻辑运算符||（逻辑或）和&&（逻辑与）左边的操作数（作为条件判断表达式）。

- && 和 || 运算符的返回值并不一定是布尔类型，而是两个操作数其中一个的值。
- ES6 允许从 symbol 到字符串的显式强制类型转换，然而隐式强制类型转换会产生错误。
- symbol 不能够被强制类型转换为数字（显式和隐式都会产生错误），但可以被强制类型转换为布尔值（显式和隐式结果都是 true）。

1. `+`操作符,`+`操作符的两边有至少一个`string`类型变量时，两边的变量都会被隐式转换为字符串；其他情况下两边的变量都会被转换为数字。
2. -,\*,/ 也是一个数字
3. ==,操作符两边的值都尽量转成`number`
4. 对于,<比较符,如果两边都是字符串，则比较字母表顺序;其他情况下，转换为数字再比较
5. {} 转换为 NaN

### 数学运算符中类型转换

#### 1、减/乘/除

**我们在对各种非`Number`类型运用数学运算符(`- * /`)时，会先将非`Number`类型转换为`Number`类型。**

> null 转换为数字 0，undefined 转换为 NaN

#### 2、加法的特殊性

- 当一侧为`String`类型，被识别为字符串拼接，并会优先将另一侧转换为字符串类型。
- 当一侧为`Number`类型，另一侧为**原始类型**，则将原始类型转换为`Number`类型。
- 当一侧为`Number`类型，另一侧为**引用类型**，将引用类型和`Number`类型转换成字符串后拼接。

### 逻辑语句中的类型转换

当我们使用 `if` `while` `for` 语句时，我们期望表达式是一个`Boolean`，所以一定伴随着隐式类型转换。而这里面又分为两种情况：

#### 1、单个变量

只有 `null` 、`undefined`、 `''` 、`NaN、` `0` 、`false` 这几个是 `false`，其他的情况都是 `true`，比如 `{}` , `[]`。

#### 2、使用`==`比较中的规则

- 规则 1：`NaN`和其他任何类型比较永远返回`false`，包括和他自己。
- 规则 2：Boolean 和其他任何类型比较，Boolean 首先被转换为 Number 类型。
- 规则 3：`String`和`Number`比较，先将`String`转换为`Number`类型。
- 规则 4：`null == undefined`比较结果是`true`，除此之外，`null`、`undefined`和其他任何结果的比较值都为`false`。
- 规则 5：`原始类型`和`引用类型`做比较时，引用类型会依照`ToPrimitive`规则转换为原始类型。

### **练习**

**1.** `[] == ![]`

```text
- 第一步，![] 会变成 false
- 第二步，应用 规则2 ，题目变成： [] == 0
- 第三步，应用 规则5 ，[]的valueOf是0，题目变成： 0 == 0
- 所以， 答案是 true ！//
```

**2.** `[undefined] == false`

```text
-第一步，应用规则5 ，[undefined]通过toString变成'',题目变成'' == false
- 第二步，应用规则2 ，题目变成'' == 0
- 第三步，应用规则3 ，题目变成0 == 0
- 所以， 答案是true ！// 但是 if([undefined]) 又是个true！
```

3. other

```js
[undefined]
  .toString() // ''
  [null].toString(); // ''
```

### 附录

![convert-table](../public/5s5e7w6dfwq77qwf.png)
