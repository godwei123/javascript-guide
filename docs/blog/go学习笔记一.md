---
create_time: 2024-08-26 19:41:26
---

# go 学习笔记一

::: tip
本文是 go 学习基础一，主要为基本语法
:::

## hello world

```go
package main

import "fmt"

func main() {
	fmt.Println("hello world")
}
```

## 基础

1、初始化项目

```shell
# go mod init <module-path>
go mod init github.com/godwei123/hello
```

2、go build

```shell
go build
```

3、go run

```shell
go run main.go
```

4、import

> import 导入包，导入包后可以使用包中的函数和变量

5、变量和常量

> 变量和常量是程序中使用的标识符，用于存储和操作数据。变量可以在程序运行时改变值，常量则不能改变值。
> 语法与其他语言类似

```go
// 变量
// 声明 & 初始化
var a int = 10

// 先声明，初始化
var b int
b = 20

// 自动类型推断
var c = 30

// 声明 & 初始化
d := 40

// 批量
var e, f, g int = 50, 60, 70
var (   h int = 80
        i int = 90
        j int = 100)

// 常量与变量类似
const (
    a1 = 10
    b1 = iota // iota 表示常量的索引，从 0 开始, b1 = 1
    c1 = iota
    d1 // 默认值为上一个常量的值, d1 = 3
    e1 = 12
    f1 // 默认值为上一个常量的值，12
)

// 全局变量，在全局作用域中声明的变量，在整个程序中都可以访问
var globalVar int = 100

// 跨包变量，在全局作用域中大写字母开头的变量可以被其他包访问
var GlobalVar int = 200
```

6、基本数据类型

::: tip
go 中所有的值类型的变量和常量都会在声明时被分配内存空间，并初始化默认值。
:::

- 整数型：int、uint、int8、int16、int32、int64、uint8、uint16、uint32、uint64，默认值为 0
- 浮点型：float32（1 符号位+8 指数位+23 尾数）、float64（默认值）（1 符号位+11 指数位+52 尾数）
- 字符型：byte（uint8 的别名）、rune（int32 的别名）
- 布尔型：bool，默认值为 false
- 字符串类型：string，默认值为 ""

7、指针

> 指针是一个变量，它存储了另一个变量的内存地址。指针变量可以通过取地址运算符 & 来获取变量的内存地址，通过解引用运算符 \* 来获取变量的值。

值拷贝（值类型）：开始一个新的变量，将原始变量的值复制到新变量中，然后修改新变量的值不会影响原始变量的值。

值传递（引用类型）：开始一个新的变量，将原始变量的内存地址传递给新变量，然后修改新变量的值会影响原始变量的值。

- 取址符 &
- 取值符 \*
- 指针类型：*int、*string、*bool、*float64、_struct、_[]int、*map[string]int、*chan int、\*func(int) int

```go
func increment(a *int) {
    *a++
}

func main() {
    a := 10
    b := &a
    increment(b)
    fmt.Println(a, b)

    var c = new(int) // 分配内存空间
    fmt.Println(a, b)
}

```

8、fmt

> fmt 包提供了格式化输出的功能，支持格式化输出各种类型的数据。与 C 语言的 printf 函数类似。

```go

fmt.Println("%v", a)
fmt.Printf("%T", a)
fmt.Printf("%d", a)
fmt.Printf("%T", a)
fmt.Printf("%f", a)
fmt.Printf("%.2f", a)
fmt.Printf("%t", a)
fmt.Printf("%p", a) // 打印变量的内存地址
```

9、运算符（与其他语言基本一致）

- 算术运算符：+、-、\*、/、%、++、--
- 关系运算符：==、!=、>、<、>=、<=
- 逻辑运算符：&&、||、!
- 位运算符：&、|、^、<<、>>
- 地址运算符：&、\*

## 控制语句

1、if

> if 条件可以不需要括号
> 注意自动加分号

```go
if a > b {
    fmt.Println("a > b")
} else {
    fmt.Println("a <= b")
}

//

if a:=3; a > b {
    fmt.Println("a > b")
} else {
    fmt.Println("a <= b")
}

```

2、switch...case

> 值匹配
> case 结尾自动加 break，如果想继续执行下一个 case，需要使用 fallthrough
> default 可以省略

3、for

```go
// 1 标准循环，不能加括号
for i := 0; i < 10; i++ {
    fmt.Println(i)
}
// 2 无限循环
var i int = 0
for {
    fmt.Println("hello world")
    i++
    if i > 10 {
        break
    }
}
// 3 条件控制
for i<10 {
    fmt.Println("hello world")
    i++
}

```

## 函数

> 函数名的本质是一个指针，指向函数的地址

```go
// func 函数名(参数列表) (返回值列表) { 函数体 }
// 参数列表支持 ...rest
// 返回值支持多个返回值
func add(a int, b int) int {
    return a + b
}

// 参数类型系统，可以简写
func add(a, b int) int {
    return a + b
}

// 不定参数
func add(a...int) int {
    var sum int
    for _, v := range a {
        sum += v
    }
    return sum
}

// 不定返回值
func add(a...int) (int, int) {
    var sum int
    for _, v := range a {
        sum += v
    }
    return sum, len(a)
}

// 命名返回值
func add(a...int) (sum int, length int) {
    for _, v := range a {
        sum += v
    }
    length = len(a)
    return
}

// 匿名函数
var add = func(a...int) int {
    var sum int
    for _, v := range a {
        sum += v
    }
    return sum
}

// 闭包
func add(a...int) func() int {
    var sum int
    return func() int {
        for _, v := range a {
            sum += v
        }
        return sum
    }
}

```

## defer

> defer 延迟执行，在函数返回前执行，用于释放资源、清理环境等
> 延迟执行的函数会按照后进先出的顺序执行
> 延迟函数的参数会在延迟执行前计算，会立即计算

```go

// defer recover
func main() {
    defer func() {
        if err := recover(); err!= nil {
            fmt.Println(err)
        }
    }()

    defer fmt.Println("defer 1")
    defer fmt.Println("defer 2")
    defer fmt.Println(1/0)
    defer fmt.Println("defer 3")
    defer fmt.Println("defer 4")
}

```

## init 函数

> 每个包可以有多个 init 函数
> 执行顺序为包导入顺序，包内函数顺序，init 函数执行顺序为包导入顺序
> init 通常用于初始化包，执行一些初始化操作，例如创建数据库连接、加载配置文件等

## 包

1、别名

> import 包时可以使用别名

```go

import (
    h "github.com/godwei123/hello"
)

```

## 数组

> 数组是一个固定长度的序列，每个元素都有相同的类型

```go
// 1 声明数组,数组长度必须是常量
var a [5]int

// 2 声明并初始化
var b [5]int = [5]int{1, 2, 3, 4, 5}

// 3 声明并初始化
var c = [5]int{1, 2, 3, 4, 5}

// 4 声明并初始化
var d = [...]int{1, 2, 3, 4, 5}

// 5 声明并初始化
var f = [5]int{1: 1, 2: 2, 3: 3, 4: 4, 5: 5}

// 遍历
for i := 0; i < len(a); i++ {
    fmt.Println(a[i])
}

// 遍历
for i, v := range a {
    fmt.Println(i, v)
}

// 遍历
for _, v := range a {
    fmt.Println(v)
}

// 遍历
for range a {
    fmt.Println(v)
}

// 多维数组
var a [2][3]int

// 二维数组
var a [2][3]int = [2][3]int{{1, 2, 3}, {4, 5, 6}}

// 二维数组
var a [2][3]int = [...][3]int{{1, 2, 3}, {4, 5, 6}}

```

## 切片

> 切片是一个可变长度的序列，每个元素都有相同的类型
> 切片是一个引用类型，指向底层数组,因此修改切片会修改底层数组的值
> 默认为 nil, 长度为 0, 容量为 0

```go
var a [5]int = [5]int{1, 2, 3, 4, 5}
var s := a[1:3] // arr[start:end], 左闭右开, 包含start, 不包含end; s=[2, 3]

// 初始化
var s []int = []int{1, 2, 3} // []T{1, 2, 3}

// mark
var s []int = make([]int, 3, 5) // make([]T, len, cap)

// len
var s []int = make([]int, 3, 5) // make([]T, len, cap)
fmt.Println(len(s)) // 3

// cap
var s []int = make([]int, 3, 5) // make([]T, len, cap)
fmt.Println(cap(s)) // 5

// 增加元素
var s []int = []int{1, 2, 3} // []T{1, 2, 3}
s = append(s, 4) // append(s, v)，底层数组会自动扩容，创建一个新的底层数组，将原来的元素复制到新的底层数组中，然后将新的元素添加到新的底层数组中
fmt.Println(s) // [1 2 3 4]

// copy
var s []int = []int{1, 2, 3} // []T{1, 2, 3}
var t []int = make([]int, 3, 5) // make([]T, len, cap)
copy(t, s) // copy(dst, src)，将src中的元素复制到dst中，dst的长度必须大于等于src的长度
fmt.Println(t) // [1 2 3]
```

## map

> map 是一个无序的键值对集合，每个键都有唯一的值

```go
// 声明
var a map[string]int

// 初始化
var a map[string]int = make(map[string]int)

// 声明并初始化
var a = map[string]int{"a": 1, "b": 2}

// 遍历
for k, v := range a {
    fmt.Println(k, v)
}

```

## 自定义数据类型和类型别名

```go
// 结构体
type Person struct {
    Name string
    Age int
}

// 类型别名,混用需要注意进行类型转换
type MyInt int

// 类型别名，可以混用
type MyInt = int

var person Person= Person{
    Name: "godwei",
    Age: 18,
}

person.Name = "godwei2"

var p2 *Person = &Person{
    Name: "godwei",
    Age: 18,
}
```

## 继承

```go
type Person struct {
    Name string
    Age int
}

type Student struct {
    Person
    Grade int
}

type Teacher struct {
    *Person
    Subject string
}

var student Student = Student{
    Person: Person{
        Name: "godwei",
        Age: 18,
    },
    Grade: 1,
}
```

## 方法

```go
type Person struct {
    Name string
    Age int
}

func (p Person) SayHello() {
    fmt.Println("Hello, my name is", p.Name)
}

func (p *Person) SayHello2() {
    fmt.Println("Hello, my name is", p.Name)
}

var person Person = Person{
    Name: "godwei",
    Age: 18,
}

person.SayHello()
person.SayHello2()
```

## **接口**

> 接口是一种类型，它定义了一组方法，任何类型都可以实现这些方法，从而实现了多态性

```go

type Animal interface {
// 定义一个方法，实现了这个方法的类型都可以实现这个方法
    Speak()

    Say(m string) string
}

type Dog struct {
    Name string
}

func (d Dog) Speak() {
    fmt.Println("Woof!")
}

type Cat struct {
    Name string
}

func (c Cat) Speak() {
    fmt.Println("Meow!")
}

var animal Animal = Dog{Name: "dog"}
animal.Speak()

var animal Animal = Cat{Name: "cat"}
animal.Speak()

```

## 协程

> 协程是一种轻量级线程，它可以在一个线程中执行多个任务，从而提高程序的性能和效率
> 协程是由 Go 语言的运行时调度器管理的，它会在一个线程中执行多个任务，从而提高程序的性能和效率
> 主线程结束，协程也会结束

数据竞争：多个协程同时访问同一个变量，导致数据竞争，导致程序崩溃。可以使用互斥锁来解决数据竞争问题。

```go

func main() {
    go func() {
        for i := 0; i < 10; i++ {
            fmt.Println(i)
        }
    }()
    for i := 0; i < 10; i++ {
        fmt.Println(i)
    }
}

```

## channel

> channel 是一种用于在协程之间传递数据的通道，它可以在一个协程中发送数据，在另一个协程中接收数据.

```go
var ch = make(chan int)

go func() {
    for i := 0; i < 10; i++ {
        ch <- i
    }
    close(ch) // 关闭通道，防止协程阻塞
}()

for i := 0; i < 10; i++ {
    fmt.Println(<-ch)
}

for i := range ch {
    fmt.Println(i)
}
```

## 参考

- https://awesome-go.com/
- https://gin-gonic.com/
- https://gofiber.io/
- https://go-zero.dev/
- https://www.iris-go.com/
- https://echo.labstack.com/
- https://github.com/golang-standards/project-layout
- https://gorm.io/
- https://traefik.io/
- https://cobra.dev/
- https://cli.github.com/
