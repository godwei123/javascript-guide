# 类型转换（玄学）

> 1. undefined == null，结果是 true。且它俩与所有其他值比较的结果都是 false。
>
> 2. String == Boolean，需要两个操作数同时转为 Number。
>
> 3. String/Boolean == Number，需要 String/Boolean 转为 Number。
>
> 4. Object == Primitive，需要 Object 转为 Primitive(具体通过 valueOf 和 toString 方法)。

```
ToPrimitive(obj,preferredType)

JS引擎内部转换为原始值ToPrimitive(obj,preferredType)函数接受两个参数，第一个obj为被转换的对象，第二个
preferredType为希望转换成的类型（默认为空，接受的值为Number或String）

在执行ToPrimitive(obj,preferredType)时如果第二个参数为空并且obj为Date的事例时，此时preferredType会
被设置为String，其他情况下preferredType都会被设置为Number如果preferredType为Number，ToPrimitive执
行过程如
下：
1. 如果obj为原始值，直接返回；
2. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；
3. 否则调用 obj.toString()，如果执行结果是原始值，返回之；
4. 否则抛异常。

如果preferredType为String，将上面的第2步和第3步调换，即：
1. 如果obj为原始值，直接返回；
2. 否则调用 obj.toString()，如果执行结果是原始值，返回之；
3. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；
4. 否则抛异常。
```

```txt

#### 1、== 操作符的强制类型转换规则

如果对比双方的类型不一样，就会进行类型转换。

1. 首先会判断两者类型是否相同，相同的话就比较两者的大小；
2. 类型不相同的话，就会进行类型转换；
3. 会先判断是否在对比 `null` 和 `undefined`，是的话就会返回 `true`
4. 判断两者类型是否为 `string` 和 `number`，是的话就会将字符串转换为 `number`
5. 判断其中一方是否为 `boolean`，是的话就会把 `boolean` 转为 `number` 再进行判断
6. 判断其中一方是否为 `object` 且另一方为 `string`、`number` 或者 `symbol`，是的话就会把 `object` 转为原始类型再进行判断

#### 2、其他值到字符串的类型转换

- Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，
- Boolean 类型，true 转换为 "true"，false 转换为 "false"。
- Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。
- Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。
- 对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()

  ）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。

#### 3、其他值到数字值的类型转换

- Undefined 类型的值转换为 NaN。
- Null 类型的值转换为 0。
- Boolean 类型的值，true 转换为 1，false 转换为 0。
- String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。
- Symbol 类型的值不能转换为数字，会报错。
- 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有 valueOf()
方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。

如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

#### 4、其他值到布尔类型的值的转换规则

• undefined

• null

• false

• +0、-0 和 NaN

• ""

假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。

#### 5、ToPrimitive 方法

/\*\*

​ @obj 需要转换的对象

​ @type 期望的结果类型
\*/
ToPrimitive(obj,type)

`type`的值为`number`或者`string`。

（1）当`type`为`number`时规则如下：

- 调用`obj`的`valueOf`方法，如果为原始值，则返回，否则下一步；
- 调用`obj`的`toString`方法，后续同上；
- 抛出`TypeError` 异常。

（2）当`type`为`string`时规则如下：

- 调用`obj`的`toString`方法，如果为原始值，则返回，否则下一步；
- 调用`obj`的`valueOf`方法，后续同上；
- 抛出`TypeError` 异常。

可以看出两者的主要区别在于调用`toString`和`valueOf`的先后顺序。默认情况下：

- 如果对象为 Date 对象，则`type`默认为`string`；
- 其他情况下，`type`默认为`number`。

#### 6、基本类型的值在不同操作符的情况下隐式转换的规则

1. `+`操作符,`+`操作符的两边有至少一个`string`类型变量时，两边的变量都会被隐式转换为字符串；其他情况下两边的变量都会被转换为数字。
2. -,\*,/ 也是一个数字
3. ==,操作符两边的值都尽量转成`number`
4. 对于,<比较符,如果两边都是字符串，则比较字母表顺序;其他情况下，转换为数字再比较
5. {} 转换为 NaN

```

### ToString

基本类型值的字符串化规则为：null 转换为"null", undefined 转换为"undefined",true 转换为"true"。

数字的字符串化则遵循通用规则，不过那些极小和极大的数字使用指数形式。

对普通对象来说，除非自行定义，否则 toString()（Object.prototype.toString()）返回内部属性[[Class]]的值，如"[object Object]"。

数组的默认 toString()方法经过了重新定义，将所有单元字符串化以后再用", "连接起来。

```javascript
let nums = [1, 2, 3, 4];
console.log(nums.toString()); // "1,2,3,4"
```

工具函数 JSON.stringify(..)在将 JSON 对象序列化为字符串时也用到了 ToString。请注意，JSON 字符串化并非严格意义上的强制类型转换，因为其中也涉及
ToString 的相关规则。

所有安全的 JSON 值（JSON-safe）都可以使用 JSON.stringify(..)字符串化。

安全的 JSON 值是指能够呈现为有效 JSON 格式的值。为了简单起见，我们来看看什么是不安全的 JSON
值。undefined、function、symbol（ES6+）和包含循环引用（对象之间相互引用，形成一个无限循环）的对象都不符合 JSON 结构标准，其他支持
JSON 的语言无法处理它们。

JSON.stringify(..)在对象中遇到 undefined、function 和 symbol 时会自动将其忽略，在数组中则会返回 null（以保证单元位置不变）。

对包含循环引用的对象执行 JSON.stringify(..)会出错。

toJSON()应该“返回一个能够被字符串化的安全的 JSON 值”，而不是“返回一个 JSON 字符串”。

我们可以向 JSON.stringify(..)传递一个可选参数 replacer，它可以是数组或者函数，用来指定对象序列化过程中哪些属性应该被处理，哪些应该被排除，和
toJSON()很像。

如果 replacer 是一个函数，它会对对象本身调用一次，然后对对象中的每个属性各调用一次，每次传递两个参数，键和值。如果要忽略某个键就返回
undefined，否则返回指定的值。

JSON.stringify 还有一个可选参数 space，用来指定输出的缩进格式。space 为正整数时是指定每一级缩进的字符数，它还可以是字符串，此时最前面的十个字符被用于每一级的缩进。

请记住，JSON.stringify(..)并不是强制类型转换。在这里介绍是因为它涉及 ToString 强制类型转换，具体表现在以下两点。

(1) 字符串、数字、布尔值和 null 的 JSON.stringify(..)规则与 ToString 基本相同。

(2) 如果传递给 JSON.stringify(..)的对象中定义了 toJSON()方法，那么该方法会在字符串化前调用，以便将对象转换为安全的 JSON 值。

[] ===> “”

{} ===> “[onject Object]”

### ToNumber

其中 true 转换为 1, false 转换为 0。undefined 转换为 NaN, null 转换为 0。

ToNumber 对字符串的处理基本遵循数字常量的相关规则/语法。处理失败时返回 NaN（处理数字常量失败时会产生语法错误）。

不同之处是 ToNumber 对以 0 开头的十六进制数并不按十六进制处理（而是按十进制）。

对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值，抽象操作 ToPrimitive，会首先（通过内部操作 DefaultValue）检查该值是否有 valueOf()
方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString()的返回值（如果存在）来进行强制类型转换。如果
valueOf()和 toString()均不返回基本类型值，会产生 TypeError 错误。

从 ES5 开始，使用 Object.create(null)创建的对象[[Prototype]]属性为 null，并且没有 valueOf()和 toString()方法，因此无法进行强制类型转换。

Number([]) // 0

Number([“abc”]) // NaN

### ToBoolean

undefined

null

false

+0、-0

NaN

""

|运算符（字位操作“或”）的空操作（no-op）0 | x，它仅执行 ToInt32 转换

~首先将值强制类型转换为 32 位数字，然后执行字位操作“非”（对每一个字位进行反转）

在-(x+1)中唯一能够得到 0（或者严格说是-0）的 x 值是-1。也就是说如果 x 为-1 时，~和一些数字值在一起会返回假值 0，其他情况则返回真值。

```javascript
let a = "hello world";
if (~a.indexOf("lo")) {
  //找到了
}
```

~~x 能将值截除为一个 32 位整数，x | 0 也可以，而且看起来还更简洁。

从 ES5 开始 parseInt(..)默认转换为十进制数，除非另外指定。如果你的代码需要在 ES5 之前的环境运行，请记得将第二个参数设置为
10。

console.log(parseInt("0x12")) // 18

`parseInt(1/0,19)` => 18

- parseInt(..)先将参数强制类型转换为字符串再进行解析，这样做没有任何问题。因为传递错误的参数而得到错误的结果，并不能归咎于函数本身。
- parseInt(1/0, 19)实际上是 parseInt("Infinity", 19)
- 19 有效数字为 0-9，a-i
- “Infinity” 有效字符为“i”，第二个字符不是有效字符，解析停止
- 最终结果为 18

建议使用 Boolean(..)和！！来进行显式转换以便让代码更清晰易读。

### ToPrimitive

[] + {}和{} + []，它们返回不同的结果，分别是"[object Object]"和 0。

相对布尔值，数字和字符串操作中的隐式强制类型转换还算比较明显。

下面的情况会发生布尔值隐式强制类型转换。

(1) if (..)语句中的条件判断表达式。

(2) for ( .. ; .. ; .. )语句中的条件判断表达式（第二个）。

(3) while (..)和 do..while(..)循环中的条件判断表达式。

(4) ? ：中的条件判断表达式。

(5) 逻辑运算符||（逻辑或）和&&（逻辑与）左边的操作数（作为条件判断表达式）。

以上情况中，非布尔值会被隐式强制类型转换为布尔值，遵循前面介绍过的 ToBoolean 抽象操作规则。

&&和||运算符的返回值并不一定是布尔类型，而是两个操作数其中一个的值。

ES6 允许从 symbol 到字符串的显式强制类型转换，然而隐式强制类型转换会产生错误。

symbol 不能够被强制类型转换为数字（显式和隐式都会产生错误），但可以被强制类型转换为布尔值（显式和隐式结果都是 true）。

“\==允许在相等比较中进行强制类型转换，而===不允许。”

### x == y

#### 1、字符串和数字

(1) 如果 Type(x)是数字，Type(y)是字符串，则返回 x == ToNumber(y)的结果。

(2) 如果 Type(x)是字符串，Type(y)是数字，则返回 ToNumber(x) == y 的结果。

#### 2、其他类型和布尔类型之间的相等比较

(1) 如果 Type(x)是布尔类型，则返回 ToNumber(x) == y 的结果；

(2) 如果 Type(y)是布尔类型，则返回 x == ToNumber(y)的结果。

#### 3、null 和 undefined

(1) 如果 x 为 null, y 为 undefined，则结果为 true。

(2) 如果 x 为 undefined, y 为 null，则结果为 true。

(3) null == null , undefined == undefined , null == undefined， 其余为 false

#### 4．对象和非对象之间的相等比较

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

#### 5、部分特殊比较结果

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

**[] == ![] => true**

- 进行布尔值的显式强制类型转换 ![] 转换为 false, [] == false. ==> true

true == [] ==> false

true == ![] ==> true == false ==> false

**2 == [2] => true**

**“” == [null] => true**

- ==右边的值[2]和[null]会进行 ToPrimitive 强制类型转换，以便能够和左边的基本类型值（2 和""）进行比较。
- 因为数组的 valueOf()返回数组本身，所以强制类型转换过程中数组会进行字符串化。
- 第一行中的[2]会转换为"2"，然后通过 ToNumber 转换为 2。第二行中的[null]会直接转换为""。
- [null].toString() ===> “”

**0 == “\n”**

- ""、"\n"（或者" "等其他空格组合）等空字符串被 ToNumber 强制类型转换为 0。

#### 7、小结

##### “0” == false ==> true

##### false == 0 ==> true

##### false == “” ==> true

##### false == [] ==> true

##### “” == 0 ==> true

##### “” == [] ==> true

##### 0 == [] ==> true

如果两边的值中有 true 或者 false，千万不要使用\==。

如果两边的值中有[]、""或者 0，尽量不要使用==。

### 抽象比较

#### 比较双方都是字符串

#### 其他情况

该算法仅针对 a < b, **a <= b 会被处理为 b < a**

比较双方首先调用 ToPrimitive，如果结果出现非字符串，就根据 ToNumber 规则将双方强制类型转换为数字来进行比较。

```javascript
let a = { x: 42 };
let b = { x: 43 };

console.log(a < b); // false
console.log(a == b); // false
console.log(a > b); // false
console.log(a <= b); // true
console.log(a >= b); // true
```

因为根据规范 a <= b 被处理为 b < a，然后将结果反转。因为 b < a 的结果是 false，所以 a <= b 的结果是 true。

这可能与我们设想的大相径庭，即<=应该是“小于或者等于”。实际上 JavaScript 中<=是“不大于”的意思（即！(a > b)，处理为！(b < a)
）。同理，a >= b 处理为 b<= a。

相等比较有严格相等，关系比较却没有“严格关系比较”（strict relationalcomparison）。也就是说如果要避免 a < b 中发生隐式强制类型转换，我们只能确保
a 和 b 为相同的类型，除此之外别无他法。

## 隐式类型转换

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

⭐️`ToPrimitive`规则，是引用类型向原始类型转变的规则，它遵循先`valueOf`后`toString`
的模式期望得到一个原始类型。如果还是没法得到一个原始类型，就会抛出 `TypeError`。

### **练习**

**1.** `[] == ![]`

```
	- 第一步，![] 会变成 false
	- 第二步，应用 规则2 ，题目变成： [] == 0
	- 第三步，应用 规则5 ，[]的valueOf是0，题目变成： 0 == 0
	- 所以， 答案是 true ！//
```

**2.** `[undefined] == false`

```
-第一步，应用
规则5 ，[undefined]
通过toString变成
'',
  题目变成
'' == false
- 第二步，应用
规则2 ，题目变成
'' == 0
- 第三步，应用
规则3 ，题目变成
0 == 0
- 所以， 答案是
true ！
// 但是 if([undefined]) 又是个true！
```

3. other

```js
[undefined]
  .toString() // ''
  [null].toString(); // ''
```

对象 `===` 比较的是内存地址，而 `>=` 将比较转换后的值

```
{} === {} // false

// 隐式转换 toString()
{} >= {} // true
```

有意思的是，如果反过来将其从字符串转换为数字，得到的结果是准确的.

+“-0” => -0

Number(“-0”) => -0

JSON.parse(“-0”) => -0

0 === -0 // true

Object.is(0,-0) // false

```js
Object.is = function (v1, v2) {
  if (v1 === 0 && v2 === 0) {
    // -0
    return 1 / v1 === 1 / v2;
  }
  if (v1 !== v1) {
    // NaN
    return v2 !== v2;
  }
  return v1 === v2;
};
```

能使用\==和===时就尽量不要使用 Object.is(..)，因为前者效率更高、更为通用。Object.is(..)主要用来处理那些特殊的相等比较。

### 附录

![convert-table](../public/5s5e7w6dfwq77qwf.png)
