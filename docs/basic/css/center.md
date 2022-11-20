# 1、居中

::: tip
居中实现涉及到宽高是否固定,元素是行内元素还是块级元素,应综合考虑实现方式.

实现方式很多,下面为常见的几种实现方式.

面试中 css 基础,常考题
:::

## 水平居中

### 1.text-align

```css
.parent {
  text-align: center;
}

.son {
  display: inline-block;
}
```

### 2.margin

```css
.son {
  margin: 0 auto;
}
```

### 3.flex

```css
.parent {
  display: flex;
  justify-content: center;
}
```

### 4.grid

```css
.parent {
  display: grid;
  justify-content: center;
}

/* 或者 */
.parent {
  display: grid;
}

.son {
  justify-self: center;
}
```

### 5.绝对定位

```css
.parent {
  position: relative;
}

.son {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

.son {
  position: absolute;
  width: "宽度";
  left: 50%;
  margin-left: -0.5 * "宽度";
}

.son {
  position: absolute;
  width: 宽度;
  left: 0;
  right: 0;
  margin: 0 auto;
}
```

### 6.table

```css
.parent {
  display: table-cell;
  text-align: center;
}

.son {
  display: inline-block;
}
```

## 垂直居中

### 1.flex 布局

```css
.parent {
  display: flex;
  align-items: center;
}
```

### 2.gird 布局

```css
.parent {
  display: grid;
  align-items: center;
}

/* OR */
.parent {
  display: grid;
}

.son {
  align-self: center;
}
```

### 3.绝对定位

```css
.parent {
  position: relative;
}

.son {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

.son {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

### 4.vertical-align + line-height

```css
.parent {
  line-height: 600px;
}

.son {
  display: inline-block;
  vertical-align: middle;
}
```

### 5.table 布局

```css
.parent {
  display: table-cell;
  vertical-align: middle;
}

.son {
  display: inline-block;
}
```

## 水平垂直居中

### 1.flex

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 2.grid

```css
.parent {
  display: grid;
  justify-content: center;
  align-items: center;
}

/* OR */

.parent {
  display: grid;
}

.son {
  justify-self: center;
  align-self: center;
}
```

### 3.绝对定位

```css
.parent {
  position: relative;
}

.son {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.son {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

### 4.table 布局

```css
.parent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.son {
  display: inline-block;
}
```
