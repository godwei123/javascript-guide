# 异步

## 回调

回调最大的问题是控制反转，它会导致信任链的完全断裂。

如果你的代码中使用了回调，尤其是但也不限于使用第三方工具，而且你还没有应用某种逻辑来解决所有这些控制反转导致的信任问题，那你的代码现在已经有了 bug，即使它们还没有给你造成损害。隐藏的 bug 也是 bug。

回调设计存在几个变体，意在解决前面讨论的一些信任问题（不是全部！）

- 分离回调设计，API 设计提供了分离回调（一个用于成功通知，一个用于出错通知）：

```
ajax(url,success,failure)
```

- “error-first 风格”（Node 风格）

```
function response(err,data){
	if(err){...} else{...}
}
ajax(url,response)
```

## Promise

### Promise.all()

这个方法返回一个新的 promise 对象，该 promise 对象在 iterable 参数对象里所有的 promise 对象都成功的时候才会触发成功，一旦有任何一个 iterable 里面的 promise 对象失败则立即触发该 promise 对象的失败。这个新的 promise 对象在触发成功状态以后，会把一个包含 iterable 里所有 promise 返回值的数组作为成功回调的返回值，顺序跟 iterable 的顺序保持一致；如果这个新的 promise 对象触发了失败状态，它会把 iterable 里第一个触发失败的 promise 对象的错误信息作为它的失败错误信息。Promise.all 方法常被用于处理多个 promise 对象的状态集合。

### Promise.allSettled()

等到所有 promises 都已敲定（settled）（每个 promise 都已兑现（fulfilled）或已拒绝（rejected））。
返回一个 promise，该 promise 在所有 promise 完成后完成。并带有一个对象数组，每个对象对应每个 promise 的结果。

### Promise.any()

接收一个 Promise 对象的集合，当其中的一个 promise 成功，就返回那个成功的 promise 的值。

### Promise.prototype.catch()

### Promise.prototype.finally()

### Promise.race()

当 iterable 参数里的任意一个子 promise 被成功或失败后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的相应句柄，并返回该 promise 对象。

### Promise.reject()

返回一个状态为失败的 Promise 对象，并将给定的失败信息传递给对应的处理方法

### Promise.resolve()

返回一个状态由给定 value 决定的 Promise 对象。如果该值是 thenable(即，带有 then 方法的对象)，返回的 Promise 对象的最终状态由 then 方法执行决定；否则的话(该 value 为空，基本类型或者不带 then 方法的对象),返回的 Promise 对象状态为 fulfilled，并且将该 value 传递给对应的 then 方法。通常而言，如果您不知道一个值是否是 Promise 对象，使用 Promise.resolve(value) 来返回一个 Promise 对象,这样就能将该 value 以 Promise 对象形式使用。

### Promise.prototype.then()

### Promise.all 中任何一个 Promise 出现错误的时候都会执行 reject，导致其它正常返回的数据也无法使用。你有什么解决办法么？

1）在单个的 catch 中对失败的 promise 请求做处理,把 reject 操作换成 resolve(new Error("自定义的 error"))

2）引入 Promise.allSettled

3）安装第三方库 promise-transaction

## 生成器

yield .．和 next(..)这一对组合起来，在生成器的执行过程中构成了一个双向消息传递系统。

只有暂停的 yield 才能接受这样一个通过 next(..)传递的值，而在生成器的起始处我们调用第一个 next()时，还没有暂停的 yield 来接受这样一个值。规范和所有兼容浏览器都会默默丢弃传递给第一个 next()的任何东西。传值过去仍然不是一个好思路，因为你创建了沉默的无效代码，这会让人迷惑。因此，启动生成器时一定要用不带参数的 next()。

生成器的迭代器也是一个 iterable！

yield 委托的主要目的是代码组织，以达到与普通函数调用的对称。

## Promise

_所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise
提供统一的 API，各种异步操作都可以用同样的方法进行处理，让开发者不用再关注于时序和底层的结果。Promise
的状态具有不受外界影响和不可逆两个特点。_

promise 有几个状态

- Pending（进行中）
- Resolved（已完成）
- Rejected（已拒绝）

当把一件事情交给 promise 时，它的状态就是 Pending，任务完成了状态就变成了 Resolved、没有完成失败了就变成了 Rejected。

Promise 的缺点：

- 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
- 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 总结

Promise 对象是异步编程的一种解决方案，最早由社区提出。Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。一个
Promise 实例有三种状态，分别是 pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。实例的状态只能由 pending 转变
resolved 或者 rejected 状态，并且状态一经改变，就凝固了，无法再被改变了。

状态的改变是通过 resolve() 和 reject() 函数来实现的，可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个
then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的末尾执行。

注意：在构造 `Promise` 的时候，构造函数内部的代码是立即执行的

一般情况下都会使用`new Promise()`来创建 promise 对象，但是也可以使用`promise.resolve`
和 `promise.reject`这两个方法

promise.catch 后面的.then 还会执行吗

catch 也会返回一个 promise,所以可以继续 then

（1）Promise.all

`Promise.all`可以将多个`Promise`实例包装成一个新的 Promise 实例。同时，成功和失败的返回值是不同的，成功的时候返回的是
一个结果数组，而失败的时候则返回最先被 reject 失败状态的值。

Promise.all 中传入的是数组，返回的也是是数组，并且会将进行映射，传入的 promise
对象返回的值是按照顺序在数组中排列的，但是注意的是他们执行的顺序并不是按照顺序的，除非可迭代对象为空。

需要注意，Promise.all 获得的成功结果的数组里面的数据顺序和 Promise.all 接收到的数组顺序是一致的，这样当遇到发送多个请求并根据请求顺序获取和使用数据的场景，就可以使用
Promise.all 来解决。

（2）Promise.race

顾名思义，Promse.race 就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])
里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。当要做一件事，超过多长时间就不做了，可以用这个方法来解决.

（3）Promise.allSettled

一旦所指定的 promises 集合中每一个 promise 已经完成，无论是成功的达成或被拒绝，
未决议的 `Promise`将被异步完成。那时，所返回的 promise 的处理器将传入一个数组作为输入，该数组包含原始 promises 集中每个 promise 的结果。

对于每个结果对象，都有一个 `status` 字符串。如果它的值为 `fulfilled`，则结果对象上存在一个 `value` 。如果值为 `rejected`
，则存在一个 `reason` 。value（或 reason ）反映了每个 promise 决议（或拒绝）的值。

（4）Promise.any

Promise.any() 接收一个 Promise 可迭代对象，只要其中的一个 `promise` 成功，就返回那个已经成功的 `promise`
。如果可迭代对象中没有一个 `promise` 成功（即所有的 `promises` 都失败/拒绝），就返回一个失败的 promise.
