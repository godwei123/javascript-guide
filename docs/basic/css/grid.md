# Grid

## display

```css
.box {
  display: grid; /*  inline-grid; */
}
```

## minmax() & repeat()

fr 是一个新的长度单位，表示等分剩余空间。如果一个容器有 3 个项目，它们的宽度分别为 1fr、2fr 和 1fr，则它们会等分水平空间。第二个项目的宽度是其他项目的两倍，它会获得更多的空间。

minmax() 函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

repeat() 函数表示重复多少次某种模式。它接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的模式。

```css
.box {
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(3, minmax(100px, 1fr));
}
```

## grid-template-columns

grid-template-columns 属性用来定义网格的列，每个网格的大小可以通过长度值、百分比或者是网格轨道的名称来定义。

## grid-template-rows

grid-template-rows 属性用来定义网格的行，每个网格的大小可以通过长度值、百分比或者是网格轨道的名称来定义。

## grid-template-areas

grid-template-areas 属性用来定义网格的区域，每个网格的大小可以通过长度值、百分比或者是网格轨道的名称来定义。

## grid-auto-columns

## grid-auto-rows

## grid-auto-flow

grid-auto-flow 属性控制着自动布局算法如何工作，该属性可以被应用于任何元素上，不仅仅是网格容器。它有以下几个可能的值：

- row：自动布局算法从左到右，从上到下依次填充网格。默认值。
- column：自动布局算法从上到下，从左到右依次填充网格。
- dense：自动布局算法会尝试填充所有的空隙。
- row dense：自动布局算法从左到右，从上到下依次填充网格，并尝试填充所有的空隙。
- column dense：自动布局算法从上到下，从左到右依次填充网格，并尝试填充所有的空隙。

## grid-template

grid-template 属性是一个简写属性，用来设置 grid-template-rows、grid-template-columns 和 grid-template-areas 这三个属性。

## grid-column-gap

grid-column-gap 属性用来定义网格列与列之间的间距。

## grid-row-gap

grid-row-gap 属性用来定义网格行与行之间的间距。

## grid-gap

grid-gap 属性是 grid-column-gap 和 grid-row-gap 这两个属性的简写属性。

## grid-column-start

grid-column-start 属性用来定义网格项目的列起始位置。

## grid-column-end

grid-column-end 属性用来定义网格项目的列结束位置。

## grid-row-start

grid-row-start 属性用来定义网格项目的行起始位置。

## grid-row-end

grid-row-end 属性用来定义网格项目的行结束位置。

## grid-column

grid-column 属性是 grid-column-start 和 grid-column-end 这两个属性的简写属性。

## grid-row

grid-row 属性是 grid-row-start 和 grid-row-end 这两个属性的简写属性。

## grid-area

grid-area 属性是 grid-row-start、grid-column-start、grid-row-end 和 grid-column-end 这四个属性的简写属性。

## justify-items

justify-items 属性用来定义网格项目在行轴上的对齐方式。

## align-items

align-items 属性用来定义网格项目在列轴上的对齐方式。

## place-items

place-items 属性是 justify-items 和 align-items 这两个属性的简写属性。

## justify-self

justify-self 属性用来定义网格项目自身在行轴上的对齐方式。

## align-self

align-self 属性用来定义网格项目自身在列轴上的对齐方式。

## place-self

place-self 属性是 justify-self 和 align-self 这两个属性的简写属性。

## grid

grid 属性是 grid-template-rows、grid-template-columns、grid-template-areas、grid-auto-rows、grid-auto-columns、grid-auto-flow 这六个属性的简写属性。
