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
        if (list.length) {
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
