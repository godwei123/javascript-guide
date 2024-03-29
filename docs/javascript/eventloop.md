# 事件循环

答题大纲

- 先说基本知识点，宏任务、微任务有哪些
- 说事件循环机制过程，边说边画图出来
- 说 async/await 执行顺序注意。

## 浏览器中的事件循环

JavaScript 代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列(task queue)来搞定另外一些代码的执行。整个执行过程，我们称为事件循环过程。一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为 macro-task（宏任务）与 micro-task（微任务），在最新标准中，它们被分别称为 task 与 jobs。

macro-task 大概包括：

- script(整体代码)
- setTimeout
- setInterval
- setImmediate
- I/O
- UI render

micro-task 大概包括:

- process.nextTick
- Promise
- Async/Await(实际就是 promise)
- MutationObserver(html5 新特性)

总的结论就是，执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环。

## node 事件循环

图中的每个框被称为事件循环机制的一个阶段，每个阶段都有一个 FIFO 队列来执行回调。虽然每个阶段都是特殊的，但通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后执行该阶段队列中的回调，直到队列用尽或最大回调数已执行。当该队列已用尽或达到回调限制，事件循环将移动到下一阶段。

因此，我们可以分析出 node 的事件循环的阶段顺序为：

输入数据阶段(incoming data)->轮询阶段(poll)->检查阶段(check)->关闭事件回调阶段(close callback)->定时器检测阶段(timers)->I/O 事件回调阶段(I/O callbacks)->闲置阶段(idle, prepare)->轮询阶段...

阶段概述：

- 定时器检测阶段(timers)：本阶段执行 timer 的回调，即 setTimeout、setInterval 里面的回调函数。
- I/O 事件回调阶段(I/O callbacks)：执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的一些 I/O 回调。
- 闲置阶段(idle, prepare)：仅系统内部使用。
- 轮询阶段(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
- 检查阶段(check)：setImmediate() 回调函数在这里执行
- 关闭事件回调阶段(close callback)：一些关闭的回调函数，如：socket.on('close', ...)。

**timers**

timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。 同样，在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行。

**poll**

如果当前已经存在定时器，而且有定时器到时间了，拿出来执行，eventLoop 将回到 timers 阶段。

如果没有定时器, 会去看回调函数队列。

- 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
- 如果 poll 队列为空时，会有两件事发生
  - 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
  - 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去,一段时间后自动进入 check 阶段。

**check**

check 阶段。这是一个比较简单的阶段，直接执行 setImmdiate 的回调。

**process.nextTick**

process.nextTick 是一个独立于 eventLoop 的任务队列。在每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行。

**node 和 浏览器 eventLoop 的主要区别**

两者最主要的区别在于浏览器中的微任务是在每个相应的宏任务中执行的，而 nodejs 中的微任务是在不同阶段之间执行的。

## 浏览器执行任务的顺序

1. 从 task 任务队列中取第一个 task（比如 setTimeout、setIntervel 的回调，也可以将同一轮循环中的所有同步代码看作是一个宏任务），执行它。
2. 执行微任务队列里的所有微任务。
3. 浏览器判断是否更新渲染屏幕，如果需要重新绘制，则执行步骤 4-13，如果不需要重新绘制，则流程回到步骤 1，这样不断循环。
4. 触发 resize、scroll 事件，建立媒体查询（执行一个任务中如果生成了微任务，则执行完任务该后就会执行所有的微任务，然后再执行下一个任务）。
5. 建立 css 动画（执行一个任务中如果生成了微任务，则执行完该任务后就会执行所有的微任务，然后再执行下一个任务）。
6. 执行 requestAnimationFrame 回调（执行一个任务中如果生成了微任务，则执行完该任务后就会执行所有的微任务，然后再执行下一个任务）。
7. 执行 IntersectionObserver 回调（执行一个任务中如果生成了微任务，则执行完该任务后就会执行所有的微任务，然后再执行下一个任务）。
8. 更新渲染屏幕。
9. 浏览器判断当前帧是否还有空闲时间，如果有空闲时间，则执行步骤 10-12。
10. 从 requestIdleCallback 回调函数队列中取第一个，执行它。
11. 执行微任务队列里的所有微任务。
12. 流程回到步骤 9，直到 requestIdleCallback 回调函数队列清空或当前帧没有空闲时间。
13. 流程回到步骤 1，这样不断循环。

**requestAnimationFrame 和 requestIdleCallback 是和宏任务性质一样的任务，只是他们的执行时机不同而已。也有人说它们既不是宏任务也不是微任务，其实我们不必纠结这个，我们所要做的就是知道他们的执行时机就好。**

浏览器在每一轮 Event Loop 事件循环中不一定会去重新渲染屏幕，会根据浏览器刷新率以及页面性能或是否后台运行等因素判断的，浏览器的每一帧是比较固定的，会尽量保持 60Hz 的刷新率运行，每一帧中间可能会进行多轮事件循环。

requestAnimationFrame 回调的执行与 task 和 microtask 无关，而是与浏览器是否渲染相关联的。它是在浏览器渲染前，在微任务执行后执行。

requestIdleCallback 是在浏览器渲染后有空闲时间时执行，如果 requestIdleCallback 设置了第二个参数 timeout，则会在超时后的下一帧强制执行。

##### 1、为什么说 js 是单线程

JavaScript 语言的一大特点就是 单线程 ，也就是说，同一个时间只能做一件事。那么，为什么 JavaScript 不能有多个线程呢？

技术的出现,都跟现实世界里的应用场景密切相关的。

JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。

> 比如，假定现在同时有两个线程操作同一个 DOM 元素，一个线程在 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以 js 就被设计成单线程

HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。这个新标准并没有改变 js 单线程的本质。

##### 2、JS 为什么需要异步?

javascript 事件循环既然 js 是单线程，那就像只有一个窗口的银行，客户需要排队一个一个办理业务，同理 js 任务也要一个一个顺序执行。如果一个任务耗时过长，那么后一个任务也必须等着。

如果 JS 中不存在异步,只能自上而下执行,如果上一行解析时间很长,那么下面的代码就会被阻塞。对于用户而言,阻塞就意味着"卡死",这样就导致了很差的用户体验

所以 js 存在 同步任务 和 异步任务

> - **同步任务：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。**
> - **异步任务：不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。**

##### 3、Event Loop 事件循环机制

（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入 Event Table 并注册函数。

（4）当指定的事情完成时，Event Table 会将这个函数移入 Event Queue。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列（event Queue）"的异步任务,如果有就推入主线程中。

（4）主线程不断重复上面的步骤。

## 问：事件流

事件流是网页元素接收事件的顺序，"DOM2 级事件"规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。首先发生的事件捕获，为截获事件提供机会。然后是实际的目标接受事件。最后一个阶段是时间冒泡阶段，可以在这个阶段对事件做出响应。虽然捕获阶段在规范中规定不允许响应事件，但是实际上还是会执行，所以有两次机会获取到目标对象。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>事件冒泡</title>
</head>
<body>
    <div>
        <p id="parEle">我是父元素    <span id="sonEle">我是子元素</span></p>
    </div>
</body>
</html>
<script type="text/javascript">
var sonEle = document.getElementById('sonEle');
var parEle = document.getElementById('parEle');

parEle.addEventListener('click', function () {
    alert('父级 冒泡');
}, false);
parEle.addEventListener('click', function () {
    alert('父级 捕获');
}, true);

sonEle.addEventListener('click', function () {
    alert('子级冒泡');
}, false);
sonEle.addEventListener('click', function () {
    alert('子级捕获');
}, true);

</script>
```

当容器元素及嵌套元素，即在`捕获阶段`又在`冒泡阶段`调用事件处理程序时：**事件按 DOM 事件流的顺序**执行事件处理程序：

- 父级捕获
- 子级冒泡
- 子级捕获
- 父级冒泡

且当事件处于目标阶段时，事件调用顺序决定于绑定事件的**书写顺序**，按上面的例子为，先调用冒泡阶段的事件处理程序，再调用捕获阶段的事件处理程序。依次 alert 出“子集冒泡”，“子集捕获”。

### 参考链接

- https://juejin.im/entry/5826ba9d0ce4630056f85e07

## 问：事件是如何实现的？

基于发布订阅模式，就是在浏览器加载的时候会读取事件相关的代码，但是只有实际等到具体的事件触发的时候才会执行。

比如点击按钮，这是个事件（Event），而负责处理事件的代码段通常被称为事件处理程序（Event Handler），也就是「启动对话框的显示」这个动作。

在 Web 端，我们常见的就是 DOM 事件：

- DOM0 级事件，直接在 html 元素上绑定 on-event，比如 onclick，取消的话，dom.onclick = null，同一个事件只能有一个处理程序，后面的会覆盖前面的。
- DOM2 级事件，通过 addEventListener 注册事件，通过 removeEventListener 来删除事件，一个事件可以有多个事件处理程序，按顺序执行，捕获事件和冒泡事件
- DOM3 级事件，增加了事件类型，比如 UI 事件，焦点事件，鼠标事件

### 参考链接

- https://zhuanlan.zhihu.com/p/73091706

## script — defer 和 async

- `async` 立即开始下载脚本，但不会阻止其他页面的动作，加载期间不应该修改 DOM（异步执行）
- `defer` 立即开始下载脚本，在文档解析和显示完成后再执行脚本（推迟执行）
