---
create_time: 2024-08-28 22:46:01
sidebar: false
---

# go 学习笔记二

::: tip
本文是 go 学习基础，主要为标准库

https://pkg.go.dev/std
:::

## rand

```go

func main() {

	// 生成一个随机数
	rand.Seed(time.Now().UnixNano())
	fmt.Println(rand.Intn(100)) // 0-99之间的随机数

}

```

## fmt

## strconv

## strings

- Contains
- ......

## utf8

```go
fmt.Println(utf8.RuneCountInString("Hello, 世界"))

```

## time

::: tip
具体 API 见文档
:::

## 文件操作（os，io，bufio）

```go
// 打开文件
file, err := os.Open("test.txt")
if err!= nil {
    fmt.Println(err)
    return
}
// 关闭文件
defer file.Close()
// 读取文件
data := make([]byte, 1024)
n, err := file.Read(data)
if err!= nil {
    fmt.Println(err)
    return
}
fmt.Println(string(data[:n]))
// 写入文件
file, err := os.Create("test.txt")
if err!= nil {
    fmt.Println(err)
    return
}
defer file.Close()
_, err := file.WriteString("Hello, World!")
if err!= nil {
    fmt.Println(err)
    return
}

```

## log

## testing

## runtime

## sync

## net

## json

## sort
