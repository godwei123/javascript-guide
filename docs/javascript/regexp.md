# 正则表达式

正则表达式是用于匹配字符串中字符组合的模式。在 JavaScript 中，正则表达式也是对象。这些模式被用于 `RegExp` 的 `exec` 和 `test` 方法, 以及 `String` 的 `match`、`matchAll`、`replace`、`search` 和 `split` 方法。

## 创建正则表达式

### 1、正则表达式字面量

使用一个正则表达式字面量，其由包含在斜杠之间的模式组成，如下所示：

```js
var re = /ab+c/;
```

**脚本加载后**，正则表达式字面量就会被编译。

当正则表达式保持不变时，使用此方法可获得更好的性能。

### 2、调用`RegExp`对象的构造函数，

如下所示：

```js
var re = new RegExp("ab+c");
```

在**脚本运行过程中**，用构造函数创建的正则表达式会被编译。

如果正则表达式将会改变，或者它将会从用户输入等来源中动态地产生，就需要使用构造函数来创建正则表达式。

## 编写正则表达式的模式

### 1、简单模式

简单模式是由你想直接找到的字符构成。比如，`/abc/` 这个模式就能且仅能匹配 "abc" 字符按照顺序同时出现的情况。例如在 "Hi, do you know your abc's?" 和 "The latest airplane designs evolved from slabcraft." 中会匹配成功。在上述两个例子中，匹配的子字符串是 "abc"。但是在 "Grab crab" 中会匹配失败，因为它虽然包含子字符串 "ab c"，但并不是准确的 "abc"。

### 2、特殊字符

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-backslash

### 3、转义字符

### 4、插入语

任何正则表达式的插入语都会使这部分匹配的副字符串被记忆。一旦被记忆，这个副字符串就可以被调用于其它用途，如同 [使用括号的子字符串匹配](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#使用括号的子字符串匹配)之中所述。

### 5、使用

| 方法       | 描述                                                                                                   |
| :--------- | :----------------------------------------------------------------------------------------------------- |
| `exec`     | 一个在字符串中执行查找匹配的 RegExp 方法，它返回一个数组（未匹配到则返回 null）。                      |
| `test`     | 一个在字符串中测试是否匹配的 RegExp 方法，它返回 true 或 false。                                       |
| `match`    | 一个在字符串中执行查找匹配的 String 方法，它返回一个数组，在未匹配到时会返回 null。                    |
| `matchAll` | 一个在字符串中执行查找所有匹配的 String 方法，它返回一个迭代器（iterator）。                           |
| `search`   | 一个在字符串中测试匹配的 String 方法，它返回匹配到的位置索引，或者在失败时返回-1。                     |
| `replace`  | 一个在字符串中执行查找匹配的 String 方法，并且使用替换字符串替换掉匹配到的子字符串。                   |
| `split`    | 一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的 `String` 方法。 |

当你想要知道在一个字符串中的一个匹配是否被找到，你可以使用 test 或 search 方法；想得到更多的信息（但是比较慢）则可以使用 exec 或 match 方法。如果你使用 exec 或 match 方法并且匹配成功了，那么这些方法将返回一个数组并且更新相关的正则表达式对象的属性和预定义的正则表达式对象（详见下）。如果匹配失败，那么 exec 方法返回 null（也就是 false）

```javascript
var myArray = /d(b+)d/g.exec("cdbbdbsbz");
// 和 "cdbbdbsbz".match(/d(b+)d/g); 相似。
// 但是 "cdbbdbsbz".match(/d(b+)d/g) 输出数组 [ "dbbd" ]，
// 而 /d(b+)d/g.exec('cdbbdbsbz') 输出数组 [ "dbbd", "bb", index: 1, input: "cdbbdbsbz" ].
```

#### 使用括号的子字符串匹配

一个正则表达式模式使用括号，将导致相应的子匹配被记住。例如，/a(b)c /可以匹配字符串“abc”，并且记得“b”。回调这些括号中匹配的子串，使用数组元素[1],……[n]。

使用括号匹配的子字符串的数量是无限的。返回的数组中保存所有被发现的子匹配。下面的例子说明了如何使用括号的子字符串匹配。

下面的脚本使用 replace()方法来转换字符串中的单词。在匹配到的替换文本中，脚本使用替代的$ 1,$ 2 表示第一个和第二个括号的子字符串匹配。

```js
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");
console.log(newstr);
```

这个表达式输出 "Smith, John"。

#### 通过标志进行高级搜索

正则表达式有六个可选参数 (`flags`) 允许全局和不分大小写搜索等。这些参数既可以单独使用也能以任意顺序一起使用, 并且被包含在正则表达式实例中。

| 标志 | 描述                                                      |
| :--- | :-------------------------------------------------------- |
| `g`  | 全局搜索。                                                |
| `i`  | 不区分大小写搜索。                                        |
| `m`  | 多行搜索。                                                |
| `s`  | 允许 `.` 匹配换行符。                                     |
| `u`  | 使用 unicode 码的模式进行匹配。                           |
| `y`  | 执行“粘性(`sticky`)”搜索,匹配从目标字符串的当前位置开始。 |

为了在正则表达式中包含标志，请使用以下语法：

```javascript
var re = /pattern/flags;
```

或者

```javascript
var re = new RegExp("pattern", "flags");
```

值得注意的是，标志是一个正则表达式的一部分，它们在接下来的时间将不能添加或删除。

例如，re = /\w+\s/g 将创建一个查找一个或多个字符后有一个空格的正则表达式，或者组合起来像此要求的字符串。

```javascript
var re = /\w+\s/g;
var str = "fee fi fo fum";
var myArray = str.match(re);
console.log(myArray);

// ["fee ", "fi ", "fo "]
```

这段代码将输出 ["fee ", "fi ", "fo "]。在这个例子中，你可以将：

```javascript
var re = /\w+\s/g;
```

替换成：

```javascript
var re = new RegExp("\\w+\\s", "g");
```

并且能获取到相同的结果。

使用`.exec()`方法时，与'`g`'标志关联的行为是不同的。 （“class”和“argument”的作用相反：在`.match()`的情况下，字符串类（或数据类型）拥有该方法，而正则表达式只是一个参数，而在`.exec()`的情况下，它是拥有该方法的正则表达式，其中字符串是参数。对比*`str.match(re)`*与*`re.exec(str)`* ), '`g`'标志与`.exec()`方法一起使用获得迭代进展。

```javascript
var xArray;
while ((xArray = re.exec(str))) console.log(xArray);
// produces:
// ["fee ", index: 0, input: "fee fi fo fum"]
// ["fi ", index: 4, input: "fee fi fo fum"]
// ["fo ", index: 7, input: "fee fi fo fum"]
```

m 标志用于指定多行输入字符串应该被视为多个行。如果使用 m 标志，^和$匹配的开始或结束输入字符串中的每一行，而不是整个字符串的开始或结束。
