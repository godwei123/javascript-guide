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

## 生成器

yield .．和 next(..)这一对组合起来，在生成器的执行过程中构成了一个双向消息传递系统。

只有暂停的 yield 才能接受这样一个通过 next(..)传递的值，而在生成器的起始处我们调用第一个 next()时，还没有暂停的 yield 来接受这样一个值。规范和所有兼容浏览器都会默默丢弃传递给第一个 next()的任何东西。传值过去仍然不是一个好思路，因为你创建了沉默的无效代码，这会让人迷惑。因此，启动生成器时一定要用不带参数的 next()。

生成器的迭代器也是一个 iterable！

yield 委托的主要目的是代码组织，以达到与普通函数调用的对称。

## Promise

Promise 简单说就是一个容器，里面保存着某个未来才会结束的事件的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理，让开发者不用再关注于时序和底层的结果。Promise 的状态具有不受外界影响和不可逆两个特点。

promise 有几个状态

- Pending（进行中）
- Resolved（已完成）
- Rejected（已拒绝）

当把一件事情交给 promise 时，它的状态就是 Pending，任务完成了状态就变成了 Resolved、没有完成失败了就变成了 Rejected。

Promise 的缺点：

- 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
- 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

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

### Promise.all 中任何一个 Promise 出现错误的时候都会执行 reject，导致其它正常返回的数据也无法使用。

1）在单个的 catch 中对失败的 promise 请求做处理,把 reject 操作换成 resolve(new Error("自定义的 error"))

2）引入 Promise.allSettled

3）安装第三方库 promise-transaction
