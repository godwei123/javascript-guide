# 面试场景题

## 1、实现一个简易的 vue-router 的 hash 模式，期望是不同的路由渲染不同的字符串

hash 模式的主要原理就是 onhashchange()事件

使用 onhashchange()事件的好处就是，在页面的 hash 值发生变化时，无需向后端发起请求，window 就可以监听事件的改变，并按规则加载相应的代码。除此之外，hash 值变化对应的 URL 都会被浏览器记录下来，这样浏览器就能实现页面的前进和后退。虽然是没有请求后端服务器，但是页面的 hash 值和对应的 URL 关联起来了。

可以选择使用下述的任一方法监听 hashchange 事件。

`window.onhashchange = funcRef;` 或 `<body onhashchange="funcRef();">` 或 `window.addEventListener("hashchange", funcRef, false);`

```js
window.onhashchange = function (event) {
    console.log(event.oldURL, event.newURL);
    let hash = location.hash.slice(1);
    console.log('location.hash', location.hash);
    console.log('hash', hash);
    if (location.hash === '#/a') {
        //判断 hash 是否为xx或者包含indexOf/includes
        // dosomething()
    }
};
```

## 如何模拟实现 vue 的 class 的动态渲染，getClass 函数返回一个渲染完成的字符串

vue 中动态绑定 class 可能情况包括以下：

-   `:class="{ active: isActive }"`
-   `:class="{ active: isActive, 'text-danger': hasError }"`
-   `:class="classObject"`,`classObject = {active: true,'text-danger': false}`
-   `:class="[activeClass, errorClass]"`
-   `:class="[isActive ? activeClass : '', errorClass]"`
-   `:class="[{ active: isActive }, errorClass]"`

```js
const getClass = function () {
    let set = new Set();
    let args = [...arguments];
    const flatClass = arr => {
        for (let i = 0; i < arr.length; i++) {
            const data = arr[i];
            if (typeof data != 'object') {
                set.add(data);
            } else if (Array.isArray(data)) {
                flatClass(data);
            } else {
                for (const key in data) {
                    if (data[key]) {
                        set.add(key);
                    }
                }
            }
        }
    };

    flatClass(args);
    console.log([...set].join(' '));
    return [...set].join(' ');
};
let classObject = { active: true, 'text-danger': false };
getClass(
    'a',
    { b: true, c: false },
    [{ active: true }, 'errorClass'],
    [true ? 'activeClass' : ''],
    classObject
);
```

## 滚动条到底部之后弹出信息？如何优化？

> 1.JS 判断滚动条到达底部 2.节流

```javascript
function throttle(fn, wait) {
    let timer = null;
    return function () {
        let context = this;
        let args = [...arguments];
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, wait);
        }
    };
}

let judgeScroll = function () {
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    //变量windowHeight是可视区的高度
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    //滚动条到底部的条件
    console.log('====');
    if (scrollTop + windowHeight >= scrollHeight) {
        alert('已经滚到底部了了！');
    }
};
// 元素如果有滚动条，需要判断滚动到底部
function divscrollFn(event) {
    let el = event.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
        console.log('到底啦');
    }
}
window.onscroll = throttle(judgeScroll, 300);
```

## 图片懒加载

-   window.innerHeight 是浏览器可视区的高度
-   document.body.scrollTop || document.documentElement.scrollTop 是浏览器滚动的过的距离
-   imgs.offsetTop 是元素顶部距离文档顶部的高度（包括滚动条的距离）
-   图片加载条件：img.offsetTop < window.innerHeight + document.body.scrollTop;

```html
<div class="container">
    <img src="loading.gif" data-src="pic.png" />
    <img src="loading.gif" data-src="pic.png" />
    <img src="loading.gif" data-src="pic.png" />
    <img src="loading.gif" data-src="pic.png" />
    <img src="loading.gif" data-src="pic.png" />
    <img src="loading.gif" data-src="pic.png" />
</div>
<script>
    var imgs = document.querySelectorAll('img');
    function lozyLoad() {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var winHeight = window.innerHeight;
        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].offsetTop < scrollTop + winHeight) {
                imgs[i].src = imgs[i].getAttribute('data-src');
            }
        }
    }
    window.onscroll = lozyLoad();
</script>

<!-- IntersectionObserver -->
<head>
    <style>
        .viewport {
            width: 300px;
            height: 200px;
            border: 1px solid blue;
            overflow: auto;
        }

        .box1 {
            height: 600px;
            width: 100%;
        }

        .observed {
            width: 100px;
            height: 100px;
            border: 1px solid green;
        }

        .imgs {
            width: 100px;
            height: 100px;
        }
    </style>
</head>

<body>
    <div class="viewport" id="viewport">
        <div class="box1">
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
            <img
                src="./place.jpg"
                data-src="http://p8.qhimg.com/bdr/__85/t01e5f605262fb61fb4.jpg"
                alt="图片"
                class="imgs"
            />
        </div>
    </div>
</body>
<script>
    let viewport = document.getElementById('viewport'); // 可视区域
    let imgList = document.querySelectorAll('.imgs'); // 被观察元素

    let options = {
        root: viewport,
    };
    let IO = new IntersectionObserver(IOCallback, options);

    // 循环所有 img 标签，使它被观察
    imgList.forEach(item => {
        IO.observe(item);
    });

    // 回调函数
    function IOCallback(entries, observer) {
        // 循环所有观察元素
        entries.forEach(item => {
            // 如果出现在可视区内，则替换 src
            if (item.isIntersecting) {
                console.info('出现在可视区内');
                item.target.src = item.target.dataset.src; // 替换 src
                IO.unobserve(item.target); // 停止观察当前元素 避免不可见时候再次调用 callback 函数
            }
        });
    }
</script>
```

## 文件拖拽上传是怎么实现的？

-   dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。
-   drag：事件主体是被拖放元素，在正在拖放被拖放元素时触发。
-   dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
-   dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。
-   dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。
-   drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
-   dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8" />
        <title>首页</title>
        <style>
            .btn {
                width: 100px;
                height: 100px;
                border: 1px dashed black;
                margin: 50px auto;
                cursor: pointer;
            }
            #upload {
                display: none;
            }
        </style>
    </head>

    <body>
        <div id="box">
            <input type="file" id="upload" />

            <div class="btn" id="drop"></div>
        </div>

        <script>
            const input = document.querySelector('#upload');
            let files;
            input.addEventListener('change', e => {
                files = e.target.files;
                upload();
            });

            function upload() {
                console.log(files);
            }

            document.querySelector('.btn').addEventListener('click', e => {
                input.click();
            });

            const dropBox = document.querySelector('#drop');
            dropBox.addEventListener('dragenter', dragEnter, false);
            dropBox.addEventListener('dragover', dragOver, false);
            dropBox.addEventListener('drop', drop, false);

            function dragEnter(e) {
                e.stopPropagation();
                e.preventDefault();
            }
            function dragOver(e) {
                e.stopPropagation();
                e.preventDefault();
            }

            function drop(e) {
                // 当文件拖拽到dropBox区域时,可以在该事件取到files
                event.preventDefault();
                files = e.dataTransfer.files;
                upload();
            }
        </script>
    </body>
</html>
```

## 文件预览

-   通过 FileReader 实现

```js
const input = document.querySelector('#upload');
input.addEventListener(
    'change',
    function () {
        const files = this.files;
        const fileList = Object.entries(files).map(([_, file]) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
                file.preview = e.target.result;
            };
            return file;
        });

        /*
         *  file中的preview存的就是可以预览使用url,如果你需要保证fileList的顺序,
         *  请不要使用这种方式,你可以采用索引的方式存储,来保证它的顺序一致性
         */
        console.log(fileList);
    },
    false
);
```

-   通过 window.URL.createObjectURL()实现

```js
const input = document.querySelector('#upload');
input.addEventListener(
    'change',
    function () {
        const files = this.files;
        const fileList = Object.entries(files).map(([_, file]) => {
            const preview = window.URL.createObjectURL(file);
            file.preview = preview;
            // 需要在合适的实际进行销毁,否则只有在页面卸载的时候才会自动卸载.
            // window.URL.revokeObjectURL(preview);
            return file;
        });

        /*
         *  file中的preview存的就是可以预览使用url
         */
        console.log(fileList);
    },
    false
);
```

## 限制上传的文件类型只能是图片呢？

-   accept 属性

> 属性是一个字符串，它定义了文件 input 应该接受的文件类型。这个字符串是一个以逗号为分隔的唯一文件类型说明符列表。由于给定的文件类型可以用多种方式指定，因此当你需要给定格式的文件时，提供一组完整的类型指定符是非常有用的。

一个以英文句号（"."）开头的合法的不区分大小写的文件名扩展名。例如： .jpg，.pdf 或 .doc。

一个不带扩展名的 MIME 类型字符串。

字符串 audio/\*， 表示 “任何音频文件”。

字符串 video/\*，表示 “任何视频文件”。

字符串 image/\*，表示 “任何图片文件”。

accept 属性不验证所选文件的类型；它只是为浏览器提供提示来引导用户选择正确的文件类型。用户仍然可以（在大多数情况下）在文件选择器中切换一个选项，使其能够覆盖此选项并选择他们希望的任何文件，然后选择不正确的文件类型。

```html
<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
```

-   事件

```js
const fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png'];

// 验证格式
function validFileType(file) {
    return fileTypes.includes(file.type);
}
// 计算文件大小
function returnFileSize(number) {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB';
    } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + 'MB';
    }
}
const input = document.querySelector('input[type=file]');
input.addEventListener('change', upload);
function upload(e) {
    let file = e.target.files[0];
    if (validFileType(file.type)) {
    } else {
        console.log('文件类型错误');
        e.target.value = '';
        return;
    }
}
```

## 大型文件上传如何切片？

参考：https://mp.weixin.qq.com/s/B4Q3b8MWLCAC8KVprLHMPw

文件上传一般是基于两种方式，FormData 以及 Base64

### 基于 FormData 实现文件上传

```js
let formData = new FormData();
formData.append('file', file);
formData.append('filename', file.name);
// ... 增加字段
// 上传
```

### 基于 Base64 实现文件上传

```js
// 转换为Base64
export changeBASE64=(file) => {
    return new Promise(resolve => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = ev => {
            resolve(ev.target.result);
        };
    });
};

let data = await instance.post('/upload_single_base64', {
// encodeURIComponent(BASE64) 防止传输过程中特殊字符乱码，
// 同时后端需要用decodeURIComponent进行解码
    file: encodeURIComponent(BASE64),
    filename: file.name
}, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
```

### 上传进度

文中用到的请求库是 axios,进度管控主要基于 axios 提供的 onUploadProgress 函数进行实现，这里一起看下这个函数的实现原理 ：xhr.upload.onprogress

-   loaded 已经传输的数据量
-   total 总量

### 大文件上传

1、上传前判断文件是否存在（hash 值），判断上传完成还是上传部分
2、服务器已经存在，则上传完成，没有上传完成，返回已经上传列表（续传）
3、文件切片
4、依次上传

File.prototype.slice() / Blob.prototype.slice()

参考文章： https://juejin.cn/post/7080527713399750692
git 地址： https://github.com/mtt3366/large-file-upload-breakpoint-continuation

## rem 的原理? 750px 设计稿，如何计算 rem？

假设：设计稿宽度：600px，移动设备：600px。设置 html 的 font-size = 移动设备 / 设计稿宽度 \* 100 = 100px，那么 1rem = 100px

## 假如需要批量请求一个接口，但是期望迸发数量不超过 10 怎么设计？

```js
function sendRequest(apiList, limit) {
    let list = [...apiList];
    let map = new Map();
    // 递归调用
    const run = () => {
        if (list.length > 0) {
            const api = list.shift();
            return request(api).then(res => {
                map.set(api, res);
                return run();
            });
        }
    };
    // 当 apiList.length < limit 的时候，避免创建多余的 Promise
    const promiseList = Array(Math.min(apiList.length, limit))
        .fill(Promise.resolve())
        .map(promise => promise.then(run));
    return Promise.all(promiseList).then(() => {
        return apiList.map(c => map.get(c));
    });
}
```

## webpack 如何配置多页面不同入口？

## 大量的 dom 怎么优化

当对 Dom 元素进行一系列操作时，对 Dom 进行访问和修改 Dom 引起的重绘和重排都比较消耗性能，所以关于操作 Dom,应该从以下几点出发：

### 1.缓存 Dom 对象

首先不管在什么场景下。操作 Dom 一般首先会去访问 Dom，尤其是像循环遍历这种时间复杂度可能会比较高的操作。那么可以在循环之前就将主节点，不必循环的 Dom 节点先获取到，那么在循环里就可以直接引用，而不必去重新查询。

```js
let rootElem = document.querySelector('#app');
let childList = rootElem.child; // 假设全是dom节点
for (let i = 0; i < childList.len; j++) {
    /**
     * 根据条件对应操作
     */
}
```

### 2.文档片段

利用 document.createDocumentFragment()方法创建文档碎片节点，创建的是一个虚拟的节点对象。向这个节点添加 dom 节点，修改 dom 节点并不会影响到真实的 dom 结构。

我们可以利用这一点先将我们需要修改的 dom 一并修改完，保存至文档碎片中，然后用文档碎片一次性的替换真是的 dom 节点。与虚拟 dom 类似，同样达到了不频繁修改 dom 而导致的重排跟重绘的过程。

```js
let fragment = document.createDocumentFragment();
const operationDomHandle = fragment => {
    // 操作
};
operationDomHandle(fragment);
// 然后最后再替换
rootElem.replaceChild(fragment, oldDom);
```

这样就只会触发一次回流，效率会得到很大的提升。如果需要对元素进行复杂的操作（删减、添加子节点），那么我们应当先将元素从页面中移除，然后再对其进行操作，或者将其复制一个（cloneNode()），在内存中进行操作后再替换原来的节点。

```js
var clone = old.cloneNode(true);
operationDomHandle(clone);
rootElem.replaceChild(clone, oldDom);
```

### 3.用 innerHtml 代替高频的 appendChild

### 4.最优的 layout 方案

批量读，一次性写。先对一个不在 render tree 上的节点进行操作，再把这个节点添加回 render tree。这样只会触发一次 DOM 操作。 使用 requestAnimationFrame()，把任何导致重绘的操作放入 requestAnimationFrame

### 5.虚拟 Dom

js 模拟 DOM 树并对 DOM 树操作的一种技术。virtual DOM 是一个纯 js 对象（字符串对象），所以对他操作会高效。

利用 virtual dom，将 dom 抽象为虚拟 dom，在 dom 发生变化的时候先对虚拟 dom 进行操作，通过 dom diff 算法将虚拟 dom 和原虚拟 dom 的结构做对比，最终批量的去修改真实的 dom 结构，尽可能的避免了频繁修改 dom 而导致的频繁的重排和重绘。

## 多个 tab 只对应一个内容框，点击每个 tab 都会请求接口并渲染到内容框，怎么确保频繁点击 tab 但能够确保数据正常显示？

防抖（过滤掉一些非必要的请求） + 取消上次未完成的请求（保证最后一次请求的响应顺序）

取消请求方法：

-   XMLHttpRequest 使用 abort api 取消请求
-   axios 使用 cancel token 取消请求

## 项目中如何进行异常捕获

### 一、代码执行的错误捕获

#### 1.try……catch

能捕获到代码执行的错误
捕获不到语法的错误
无法处理异步中的错误
使用 try... catch 包裹，影响代码可读性

#### 2.window.onerror

无论是异步还是非异步错误，onerror 都能捕获到运行时错误
onerror 主要是来捕获预料之外的错误，而 try-catch 则是用来在可预见情况下监控特定的错误，两者结合使用更加高效。
window.onerror 函数只有在返回 true 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 Uncaught Error: xxxxx。
当我们遇到 <img src="./404.png"> 报 404 网络请求异常的时候，onerror 是无法帮助我们捕获到异常的。
缺点: 监听不到资源加载的报错 onerror,事件处理函数只能声明一次，不会重复执行多个回调：

#### 3.window.addEventListener('error')

可以监听到资源加载报错，也可以注册多个事件处理函数。

window.addEventListener('error',(msg, url, row, col, error) => {}, true)

但是这种方式虽然可以捕捉到网络请求的异常,却无法判断 HTTP 的状态是 404 还是其他比如 500 等等，所以还需要配合服务端日志才进行排查分析才可以。

#### 4.window.addEventListener('unhandledrejection')

捕获 Promise 错误，当 Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件；这可能发生在 window 下，但也可能发生在 Worker 中。 这对于调试回退错误处理非常有用。

### 二、资源加载的错误捕获

imgObj.onerror()
performance.getEntries()，获取到成功加载的资源，对比可以间接的捕获错误
window.addEventListener('error', fn, true), 会捕获但是不冒泡，所以 window.onerror 不会触发，捕获阶段可以触发

### 三、Vue、React 中

Vue 有 errorHandler，React 有 componentDidCatch 进行错误捕获

## 商城的列表页跳转到商品的详情页，详情页数据接口很慢，前端可以怎么优化用户体验？

1）懒加载:获取首屏数据,后边的数据进行滑动加载请求

首先，不要将图片地址放到 src 属性中，而是放到其它属性(data-original)中。
页面加载完成后，根据 scrollTop 判断图片是否在用户的视野内，如果在，则将 data-original 属性中的值取出存放到 src 属性中。
在滚动事件中重复判断图片是否进入视野，如果进入，则将 data-original 属性中的值取出存放到 src 属性中

2）利用骨架屏提升用户体验

3）PreloadJS 预加载

使用 PreloadJS 库，PreloadJS 提供了一种预加载内容的一致方式，以便在 HTML 应用程序中使用。预加载可以使用 HTML 标签以及 XHR 来完成。默认情况下，PreloadJS 会尝试使用 XHR 加载内容，因为它提供了对进度和完成事件的更好支持，但是由于跨域问题，使用基于标记的加载可能更好。

4）除了添加前端 loading 和超时 404 页面外，接口部分可以添加接口缓存和接口的预加载

-   使用 workbox 对数据进行缓存 缓存优先
-   使用 orm 对本地离线数据进行缓存 优先请求本地。
-   采用预加载 再进入到详情页阶段使用 quicklink 预加载详情页
-   使用 nodejs 作为中间层将详情页数据缓存至 redis 等

上面的方法，可以根据业务需求选择组合使用。





## 有 1000 个 dom，需要更新其中的 100 个，如何操作才能减少 dom 的操作？

- 虚拟DOM
- document fragment





## 请实现一个 cacheRequest 方法，保证发出多次同一个 ajax 请求时都能拿到数据，而实际上只发出一次请求

```javascript
const request = (url, option) =>
new Promise(resolve => {
  setTimeout(() => {
    resolve({ data: option });
  }, 2000);
});
const cache = new Map();
const cacheRequest = (url, option) => {
  let key = `${url}:${option.method}`;
  if (cache.has(key)) {
    if (cache.get(key).status === 'pending') {
      return cache.get(key).myWait;
    }
    return Promise.resolve(cache.get(key).data);
  } else {
    // 无缓存，发起真实请求
    let requestApi = request(url, option);
    cache.set(key, { status: 'pending', myWait: requestApi });
    return requestApi
      .then(res => {
      // console.log(cache)
      cache.set(key, { status: 'success', data: res });
      // console.log(cache)
      return Promise.resolve(res);
    })
      .catch(err => {
      cache.set(key, { status: 'fail', data: err });
      Promise.reject(err);
    });
  }
};

/**
cache 构建 Map，用作缓存数据，把 URL 作为 key，用来判断是否来自同一个请求

请求的更多参数可传入 option，例如 get，data…

每次请求检查缓存，有的话就返回缓存，没有的话发起请求

请求成功后，保存数据到 cache 并返回，失败则弹框提示

特殊情况，如果请求在 pending 状态，则返回该请求继续等待

代码中 ajax 请求用 setTimeout()函数代替，可自行封装 request 函数
*/
```





## 动手实现一个 repeat 方法

```js
function repeat(func, times, wait) {
  // TODO
  for (let i = 0; i < times; i++) {
    setTimeout(() => {
      func('hello');
    }, i * wait);
  }
}

// =========
async function repeat(func, times, wait) {
    for (let i = 0; i < times; i++) {
        func('hello');
        await sleep(wait);
    }
}
function sleep(wait) {
    return new Promise(resolve => setTimeout(resolve, wait));
}
// ================
const repeatFunc = repeat(alert, 4, 3000);
// 调用这个 repeatFunc ("hellworld")，会alert4次 helloworld, 每次间隔3秒
```



## 实现下面需求

```javascript
/*
已知对象A = {name: 'sfd', getName: function(){console.log(this.name)}},
现要求⽤不同⽅式对A进⾏改造实现A.name发⽣变化时⽴即执⾏A.getName
*/

const proxy = new Proxy(a, {
    set: function (target, prop, value, receiver) {
        Reflect.set(...arguments);
        target.getName();
        return true;
    },
});

Object.defineProperty(a, 'name', {
    configurable: true,
    get: function () {
        return name;
    },
    set: function (val) {
        name = val;
        this.getName();
    },
});

```



## 三列布局（CSS）

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Document</title>
        <style>
            div {
                height: 500px;
            }
            .left {
                background: tomato;
                width: 100px;
            }
            .center {
                background: lightgreen;
            }
            .right {
                background: gold;
                width: 100px;
            }

            .left {
                float: left;
            }

            .right {
                float: right;
            }

            .center {
                margin-left: 100px;
                margin-right: 100px;
            }
        </style>
    </head>
    <body>
        <div class="left"></div>
        <div class="right"></div> <!-- 注意顺序 -->
        <div class="center"></div>
    </body>
</html>

// ============================
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Document</title>
        <style>
            div {
                height: 500px;
            }
            .left {
                background: tomato;
                width: 100px;
            }
            .center {
                background: lightgreen;
            }
            .right {
                background: gold;
                width: 100px;
            }

            .left {
                float: left;
            }

            .right {
                float: right;
            }

            .center {
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <div class="left"></div>
        <div class="right"></div>
        <div class="center"></div>
    </body>
</html>

// flex

// position

// 圣杯布局的核心是浮动、负边距、相对定位、不添加额外标签
// 左、中、右 三栏都使用float进行浮动，然后通过负值margin进行调整
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Document</title>
        <style>
            .container {
                margin-left: 100px;
                margin-right: 100px;
            }
            div {
                height: 500px;
            }
            .left {
                background: tomato;
                width: 100px;
            }
            .center {
                background: lightgreen;
            }
            .right {
                background: gold;
                width: 100px;
            }

            .left {
                float: left;
                margin-left: -100%;
                position: relative;
                left: -100px;
            }

            .right {
                float: right;
                margin-left: -100px;
                position: relative;
                right: -100px;
            }

            .center {
                float: left;
                width: 100%;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="center">dsjncchjdcbjdscbdjcbsjbjsdbcjscbsj</div>
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </body>
</html>


// 双飞翼布局前两步和圣杯布局一样，只是处理中间栏部分内容被遮挡的问题解决方案不同：
// 在main内部添加一个content，通过设置左右margin（左右两栏的宽度+间距margin）来避开遮挡

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Document</title>
        <style>
            div {
                height: 500px;
            }
            .left {
                background: tomato;
                width: 100px;
            }
            .center {
                background: lightgreen;
            }
            .right {
                background: gold;
                width: 100px;
            }

            .left {
                float: left;
                margin-left: -100%;
            }

            .right {
                float: right;
                margin-left: -100px;
            }

            .center {
                float: left;
                width: 100%;
            }
            .content {
                margin-left: 100px;
                margin-right: 100px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="center">
                <div class="content">
                    midmidmidmidmidmidmidmidmidmidmidmidmidmidmidmidmidmidmidmidmidmidmidmidmidmid
                </div>
            </div>
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </body>
</html>


```





## 如何将一个width为480的图片变为300px

```html
<img src="1.jpg" style="width:480px!important"/>

<img src="1.jpg" style="width:480px!important; max-width: 300px">
<img src="1.jpg" style="width:480px!important; transform: scale(0.625, 1);" >
<img src="1.jpg" style="width:480px!important; width:300px!important;">
<img src="1.jpg" style="width:480px!important; box-sizing:border-box;padding:0 90px">
 
JS 实现
```





## 构造一个全为1的长度为100的数组

```js
Array.from({length:100},x=>1)

new Array(100).fill(1)

Array.apply(null, {length:100}).fill(1)
```





## nginx

> Nginx 是一个高性能的HTTP和反向代理服务器。
>
> 反向代理
>
> 负载均衡
>
> 动静分离：在我们的软件开发中，有些请求是需要后台处理的，有些请求是不需要经过后台处理的（如：css、html、jpg、js等等文件），这些不需要经过后台处理的文件称为静态文件。让动态网站里的动态网页根据一定规则把不变的资源和经常变的资源区分开来，动静资源做好了拆分以后，我们就可以根据静态资源的特点将其做缓存操作。提高资源响应的速度。

“*nginx负载均衡的三种方式主要是轮询模式、weight权重模式、ip_hash*“

> 正向代理
>
> 反向代理

单个服务器解决不了，我们增加服务器的数量，然后将请求分发到各个服务器上，由反向代理服务器将原先请求集中到单个服务器上的情况改为将请求分发到多个服务器上，将负载分发到不同的服务器，也就是我们所说的**负载均衡**。



## 异步sum(✨)

```javascript
/*
  请实现一个 sum 函数，接收一个数组 arr 进行累加，并且只能使用add异步方法
  add 函数已实现，模拟异步请求后端返回一个相加后的值
*/
function add(a, b) {
  return Promise.resolve(a + b);
}

function sum(arr) {
  
}

// 1. 初级实现: 串行方式 
function sum(arr) {
  if (arr.length === 1) return arr[0];
  return arr.reduce((x, y) => Promise.resolve(x).then((x) => add(x, y)));
}


async function sum(arr) {
  let s = arr[0]
  for (let i = 1; i < arr.length; i++) {
    s = await add(s, arr[i])
  }
  return s
}

// 2. 中级实现: 并行方式
// 「我们实现一个 chunk 函数，将数组两两分组，每两个计算一次，使用 chunk 二分，此时延时变为 logN 秒」
function chunk(list, size) {
  const l = [];
  for (let i = 0; i < list.length; i++) {
    const index = Math.floor(i / size);
    l[index] ??= [];
    l[index].push(list[i]);
  }
  return l;
}

async function sum(arr) {
  if (arr.length === 1) return arr[0];
  const promises = chunk(arr, 2).map(([x, y]) =>
    // 注意此时单数的情况
    y === undefined ? x : add(x, y)
  );
  return Promise.all(promises).then((list) => sum(list));
}


// 3. 更进一步: 控制并行数
// 如果需要控制并行数，则可以先实现一个 promise.map 用以控制并发，这也是在面试中经常考察的一个点。使用 promise.map 来代替上一步的 promise.all
//  OR - async-pool

function pMap(list, mapper, concurrency = Infinity) {
  return new Promise((resolve, reject) => {
    let currentIndex = 0;
    let result = [];
    let resolveCount = 0;
    let len = list.length;
    function next() {
      const index = currentIndex++;
      Promise.resolve(list[index])
        .then((o) => mapper(o, index))
        .then((o) => {
          result[index] = o;
          if (++resolveCount === len) {
            resolve(result);
          }
          if (currentIndex < len) {
            next();
          }
        });
    }
    for (let i = 0; i < concurrency && i < len; i++) {
      next();
    }
  });
}

async function sum(arr, concurrency) {
  if (arr.length === 1) return arr[0];
  return pMap(
    chunk(arr, 2),
    ([x, y]) => {
      return y === undefined ? x : add(x, y);
    },
    concurrency
  ).then((list) => sum(list, concurrency));
}



```





### 响应式设计

1. 媒体查询，边界断点的规则设定（Media queries && break point）
2. 内容的可伸缩性效果（Flexibel visuals）
3. 流式网格布局(Fluid grids)
4. 主要内容呈现及图片的高质量(Main content and high quality)



响应式设计是 Responsive Web Design（RWD），自适应设计是 Adaptive Web Design（AWD）

RWD：Ethan Marcote 的文章是大家认为 RWD 的起源。他提出的 RWD 方案是通过 HTML 和 CSS 的媒体查询技术，配合流体布局实现。RWD 倾向于只改变元素的外观布局，而不大幅度改变内容。Jeffrey Zeldman 总结说，我们就把 RWD 定义为**一切能用来为各种分辨率和设备性能优化视觉体验的技术**。

AWD：Adaptive Design 是 Aaron Gustafson 的书的标题。他认为 AWD 在包括 RWD 的 CSS 媒体查询技术以外，也要用 Javascript 来操作 HTML 来更适应移动设备的能力。AWD 有可能会针对移动端用户**减去内容，减去功能**。AWD 可以在服务器端就进行优化，把优化过的内容送到终端上。

![图片](../public/640327834738732.png)



**渐进增强和优雅降级**





## 移动端屏幕适配方案

### 设备独立像素DIP

**设备独立像素 = CSS 像素 = 逻辑像素**

### 物理像素

物理像素，又称为设备像素。显示屏是由一个个物理像素点组成的，`1334 x 750` 表示手机分别在垂直和水平上所具有的像素点数。通过控制每个像素点的颜色，就可以使屏幕显示出不同的图像，屏幕从工厂出来那天起，它上面的物理像素点就固定不变了，单位为pt。

**设备像素 = 物理像素**

### DPR（Device Pixel Ratio） 设备像素比

设备像素比描述的是**未缩放状态下**，物理像素和设备独立像素的初始比例关系。

**DPR = 物理像素 / 设备独立像素**



1. 适配不同屏幕大小，也就是适配不同屏幕下的 CSS 像素
2. 适配不同像素密度，也就是适配不同屏幕下 dpr 不一致导致的一些问题



### 适配不同屏幕大小

百分比值总要相对于另一个量，比如长度。每个允许使用百分比值的属性，同时也要定义百分比值参照的那个量。这个量可以是相同元素的另一个属性的值，也可以是祖先元素的某个属性的值，甚至是格式化上下文的一个度量（比如包含块的宽度）。

具体来说：

- 宽度（width）、间距（maring/padding）支持百分比值，但默认的相对参考值是包含块的宽度；
- 高度（height）百分比的大小是相对其父级元素高的大小；
- 边框（border）不支持百分值；
- 边框圆角半径（border-radius）支持百分比值，但水平方向相对参考值是盒子的宽度，垂直方向相对参考值是盒子的高度；
- 文本大小（font-size）支持百分比值，但相对参考值是父元素的font-size的值；
- 盒阴影（box-shadow）和文本阴影（text-shadow）不支持百分比值；

首先，支持百分比单位的度量属性有其各自的参照基准，其次并非所有度量属性都支持百分比单位。所以我们需要另辟蹊径。

### rem 适配方案

rem（font size of the root element），在 **CSS Values and Units Module Level 3**中的定义就是， 根据网页的根元素来设置字体大小，和 em（font size of the element）的区别是，em 是根据其父元素的字体大小来设置，而 rem 是根据网页的跟元素（html）来设置字体大小。

**flexible/hotcss**

1. 动态修改 Viewport 存在一定的风险的，譬如通过 Viewport 改变了页面的缩放之后，获取到的 `innerWidth/innerHeight` 也会随之发生变化，如果业务逻辑有获取此类高宽进行其他计算的，可能会导致意想不到的错误；

> 到今天，其实存在很多在 flexible 基础上演化而来的各种 rem 解决方案，有的不会对 Viewport 进行缩放处理，自行处理 1px 边框问题。

1. flexible/hotcss 都并非纯 CSS 方案，需要引入一定的 Javascript 代码
2. rem 的设计初衷并非是用于解决此类问题，用 rem 进行页面的宽度适配多少有一种 hack 的感觉
3. 存在一定的兼容性问题，对于安卓 4.4 以下版本系统不支持 viewport 缩放（当然，flexible 处理 Android 系列时，始终认为其 dpr 为 1，没有进行 viewport 缩放）

### vw 适配方案

百分比适配方案的核心需要一个全局通用的基准单位，rem 是不错，但是需要借助 Javascript 进行动态修改根元素的 `font-size`，而 vw/vh（vmax/vmin） 的出现则很好弥补 rem 需要 JS 辅助的缺点。

根据 CSS Values and Units Module Level 4：`vw`等于初始包含块（html元素）宽度的1%，也就是

- `1vw` 等于 `window.innerWidth` 的数值的 1%
- `1vh` 等于`window.innerHeight` 的数值的 1%

![图片](../public/6403274893291991.png)



vw 确实看上去很不错，但是也是存在它的一些问题：

1. 也没能很好的解决 1px 边框在高清屏下的显示问题，需要自行处理
2. 由于 vw 方案是完全的等比缩放，在完全等比还原设计稿的同时带来的一个问题是无法很好的限定一个最大最小宽度值，由于 rem 方案是借助 Javascript 的，所以这一点 rem 比 vw 会更加的灵活



### 1px

- 渐变实现
- 使用缩放实现
- 使用图片实现（base64）
- 使用SVG实现（嵌入 background url）









### 请简述微信小程序的原理。

小程序本质是一个单页面应用。这个页面上可以进行所有的页面渲染和事件处理，同时能通过微信客户端调用原生的各种接口。其架构是数据驱动的架构模式。由于 UI 和数据是分离的，因此所有的页面更新都需要通过更改数据来实现。技术上采用 JavaScript、WXML、WXSS 进行开发；功能上可分为 webview 和 appService 两个部分（其中 webview 用于展现 UI，appService 则用于处理业务逻辑、数据及接口调用）；其在两个进程中运行，通过系统层 JSBridge 实现通信，实现 UI 的渲染、事件的处理等。

