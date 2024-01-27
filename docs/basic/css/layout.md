# CSS 布局

<script setup>
import LayoutVisual from '../../../packages/pages/basic/layout-visual.vue'
</script>

## 两栏布局

### float+margin

<ClientOnly>
<LayoutVisual :boxStyle="{}" :leftStyle="{float:'left',width:'200px',height:'100%'}" :rightStyle="{width:'auto',height:'100%',marginLeft:'200px'}"/>
</ClientOnly>

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

<ClientOnly>
<LayoutVisual :boxStyle="{}" :leftStyle="{float:'left',width:'200px',height:'100%'}" :rightStyle="{overflow:'hidden',height:'100%'}"/>
</ClientOnly>

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

<ClientOnly>
<LayoutVisual :boxStyle="{display:'flex'}" :leftStyle="{width:'200px'}" :rightStyle="{flex:1}"/></ClientOnly>

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

<ClientOnly>
<LayoutVisual type="2" :boxStyle="{display:'flex',flexDirection:'column'}" :topStyle="{flex:'0 0 auto',height:'50px'}" :middleStyle="{flex:'1 1 auto'}" :bottomStyle="{flex:'0 0 auto',height:'50px'}" />
</ClientOnly>

```html
<style>
  .box {
    display: flex;
    flex-direction: column;
    height: 200px;
    background: #ccc;
  }

  .top {
    flex: 0 0 auto;
    height: 50px;
    background: tomato;
  }

  .middle {
    flex: 1 1 auto;
    background: gold;
  }

  .bottom {
    flex: 0 0 auto;
    height: 50px;
    background: tomato;
  }
```
