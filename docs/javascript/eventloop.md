# 事件循环

答题大纲

-   先说基本知识点，宏任务、微任务有哪些
-   说事件循环机制过程，边说边画图出来
-   说 async/await 执行顺序注意。

## 浏览器中的事件循环

JavaScript 代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列(task queue)来搞定另外一些代码的执行。整个执行过程，我们称为事件循环过程。一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为 macro-task（宏任务）与 micro-task（微任务），在最新标准中，它们被分别称为 task 与 jobs。

macro-task 大概包括：

-   script(整体代码)
-   setTimeout
-   setInterval
-   setImmediate
-   I/O
-   UI render

micro-task 大概包括:

-   process.nextTick
-   Promise
-   Async/Await(实际就是 promise)
-   MutationObserver(html5 新特性)

总的结论就是，执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环。

## node 事件循环

图中的每个框被称为事件循环机制的一个阶段，每个阶段都有一个 FIFO 队列来执行回调。虽然每个阶段都是特殊的，但通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后执行该阶段队列中的回调，直到队列用尽或最大回调数已执行。当该队列已用尽或达到回调限制，事件循环将移动到下一阶段。

因此，我们可以分析出 node 的事件循环的阶段顺序为：

输入数据阶段(incoming data)->轮询阶段(poll)->检查阶段(check)->关闭事件回调阶段(close callback)->定时器检测阶段(timers)->I/O 事件回调阶段(I/O callbacks)->闲置阶段(idle, prepare)->轮询阶段...

阶段概述：

-   定时器检测阶段(timers)：本阶段执行 timer 的回调，即 setTimeout、setInterval 里面的回调函数。
-   I/O 事件回调阶段(I/O callbacks)：执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的一些 I/O 回调。
-   闲置阶段(idle, prepare)：仅系统内部使用。
-   轮询阶段(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
-   检查阶段(check)：setImmediate() 回调函数在这里执行
-   关闭事件回调阶段(close callback)：一些关闭的回调函数，如：socket.on('close', ...)。

**timers**

timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。 同样，在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行。

**poll**

如果当前已经存在定时器，而且有定时器到时间了，拿出来执行，eventLoop 将回到 timers 阶段。

如果没有定时器, 会去看回调函数队列。

-   如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
-   如果 poll 队列为空时，会有两件事发生
    -   如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
    -   如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去,一段时间后自动进入 check 阶段。

**check**

check 阶段。这是一个比较简单的阶段，直接执行 setImmdiate 的回调。

**process.nextTick**

process.nextTick 是一个独立于 eventLoop 的任务队列。在每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行。

**node 和 浏览器 eventLoop 的主要区别**

两者最主要的区别在于浏览器中的微任务是在每个相应的宏任务中执行的，而 nodejs 中的微任务是在不同阶段之间执行的。
