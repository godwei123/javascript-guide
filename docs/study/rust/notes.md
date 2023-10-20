# Rust 学习笔记

## 数据类型

let 定义变量，定义后不能够重新赋值

mut 关键字，变量可变

const 定义常量，必须指定数据类型

同名变量会隐藏，覆盖，数据类型也可以改变。常量不能被隐藏，即不能有同名的常量

static 可以定义常量

字符串字面量：`&str`

字符串对象：`String::new()`, `String::from()`

运算符不支持`++`,`--`，其他的相同

条件

```rust
if xxx {

}else if xxx {

} else {

}

match xx {
  '情况1'=>'结果1',
  '情况2'=>'结果2',
  _=>'其他',
}

```

循环

```rust
for xx in start...end { // [start,end)

}

for xx in start...=end { // [start,end]

}

```
