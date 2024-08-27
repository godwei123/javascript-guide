# go

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

## 参考

https://awesome-go.com/
https://gin-gonic.com/
https://gofiber.io/
https://go-zero.dev/
https://www.iris-go.com/
https://echo.labstack.com/
https://github.com/golang-standards/project-layout
https://gorm.io/
https://traefik.io/
https://cobra.dev/
https://cli.github.com/
