# CSS 布局

## 常见布局实现

### 两栏布局

#### float+margin

```html
<style>
  .box {
    height: 200px;
    background: #ccc;
  }

  .left {
    width: 200px;
    float: left;
    background: tomato;
    height: 100%;
  }

  .right {
    margin-left: 200px;
    width: auto;
    height: 100%;
    background: gold;
  }
</style>

<div class="box">
  <div class="left"></div>
  <div class="right"></div>
</div>
```

#### float+overflow

```html
<style>
  .box {
    height: 200px;
    background: #ccc;
  }

  .left {
    width: 200px;
    float: left;
    background: tomato;
    height: 100%;
  }

  .right {
    overflow: hidden;
    background: gold;
    height: 100%;
  }
</style>

<div class="box">
  <div class="left"></div>
  <div class="right"></div>
</div>
```

#### flex

```html
<style>
  .box {
    display: flex;
    height: 200px;
    background: #ccc;
  }

  .left {
    width: 200px;
    background: tomato;
  }

  .right {
    flex: 1;
    background: gold;
  }
</style>

<div class="box">
  <div class="left"></div>
  <div class="right"></div>
</div>
```

### 三栏布局

::: warning

见场景题部分

:::

### 九宫格布局

## 15、响应式布局

## 16、px rem em vw vh

- px 是固定像素,一旦设置了就无法因为适应页面大小而改变.
- em 和 rem 相对于 px 更具有灵活性,他们是相对长度单位,其长度不是固定的,更适用于响应式布局.
- em 是相对于根据自身元素的 font-size 来设置字体大小.而 rem 是相对于根元素(即 html),这样就意味着,只需要在根元素确定一个参考值.
- vw/vh 是与视图窗口有关的单位,vw 表示相对于视图窗口的宽度,vh 表示相对于视图窗口高度,除了 vw 和 vh 外,还有 vmin 和 vmax
  两个相关的单位.
