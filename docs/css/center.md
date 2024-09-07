# 居中

<script setup>
import CenterVisual from "~/pages/css/center-visual.vue";
</script>

## 水平居中

### 1.text-align

<ClientOnly>
<CenterVisual :parentStyle="{textAlign: 'center'}" :childStyle="{display: 'inline-block'}"/>
</ClientOnly>

```css
.parent {
  text-align: center;
}

.son {
  display: inline-block;
}
```

### 2.margin

<ClientOnly>
<CenterVisual  :parentStyle="{}" :childStyle="{margin: '0 auto'}"/>
</ClientOnly>

```css
.son {
  margin: 0 auto;
}
```

### 3.flex

<ClientOnly>
<CenterVisual  :parentStyle="{display: 'flex','justify-content': 'center'}" :childStyle="{}"/>
</ClientOnly>

```css
.parent {
  display: flex;
  justify-content: center;
}
```

### 4.grid

<ClientOnly>
<CenterVisual  :parentStyle="{display: 'grid','justify-content': 'center'}" :childStyle="{}"/>
</ClientOnly>

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

<ClientOnly>
<CenterVisual  :parentStyle="{position: 'relative'}" :childStyle="{position: 'absolute', left: '50%', transform: 'translate(-50%, 0)'}"/></ClientOnly>

```css
.parent {
  position: relative;
}

.son {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
```

### 6.table

<ClientOnly>
<CenterVisual  :parentStyle="{display: 'table','text-align':'center'}" :childStyle="{display: 'inline-block'}"/>
</ClientOnly>

```css
.parent {
  display: table;
  text-align: center;
}

.son {
  display: inline-block;
}
```

## 垂直居中

### 1.flex 布局

<ClientOnly>
<CenterVisual  :parentStyle="{display: 'flex', 'align-items': 'center'}" :childStyle="{}"/>
</ClientOnly>

```css
.parent {
  display: flex;
  align-items: center;
}
```

### 2.gird 布局

<ClientOnly>
<CenterVisual  :parentStyle="{display: 'grid', 'align-items': 'center'}" :childStyle="{}"/>
</ClientOnly>

```css
.parent {
  display: grid;
  align-items: center;
}
```

### 3.绝对定位

<ClientOnly>
<CenterVisual  :parentStyle="{position: 'relative'}" :childStyle="{position: 'absolute', top: '50%', transform: 'translate(0, -50%)'}"/>
</ClientOnly>

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

<ClientOnly>
<CenterVisual  :parentStyle="{lineHeight: '200px'}" :childStyle="{display: 'inline-block', verticalAlign: 'middle'}"/>
</ClientOnly>

```css
.parent {
  line-height: 200px;
}

.son {
  display: inline-block;
  vertical-align: middle;
}
```

## 水平垂直居中

### 1.flex

<ClientOnly>
<CenterVisual  :parentStyle="{display: 'flex', 'justify-content': 'center', 'align-items': 'center'}" :childStyle="{}"/>
</ClientOnly>

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 2.grid

<ClientOnly>
<CenterVisual  :parentStyle="{display: 'grid', 'justify-content': 'center', 'align-items': 'center'}" :childStyle="{}"/>
</ClientOnly>

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

<ClientOnly>
<CenterVisual  :parentStyle="{position: 'relative'}" :childStyle="{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}"/>
</ClientOnly>

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
