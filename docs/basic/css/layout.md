# CSS 布局

<script setup>
import LayoutVisual from '../../../components/basic/layout-visual.vue'
</script>

## 两栏布局

### float+margin

<LayoutVisual :boxStyle="{}" :leftStyle="{float:'left',width:'200px',height:'100%'}" :rightStyle="{width:'auto',height:'100%',marginLeft:'200px'}"/>

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

### float+overflow

<LayoutVisual :boxStyle="{}" :leftStyle="{float:'left',width:'200px',height:'100%'}" :rightStyle="{overflow:'hidden',height:'100%'}"/>

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

### flex

<LayoutVisual :boxStyle="{display:'flex'}" :leftStyle="{width:'200px'}" :rightStyle="{flex:1}"/>

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

## 三栏布局

## 九宫格布局
