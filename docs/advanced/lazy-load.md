## 图片懒加载

- window.innerHeight 是浏览器可视区的高度
- document.body.scrollTop || document.documentElement.scrollTop 是浏览器滚动的过的距离
- imgs.offsetTop 是元素顶部距离文档顶部的高度（包括滚动条的距离）
- 图片加载条件：img.offsetTop < window.innerHeight + document.body.scrollTop;

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
  var imgs = document.querySelectorAll("img");
  function lozyLoad() {
    var scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    var winHeight = window.innerHeight;
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].offsetTop < scrollTop + winHeight) {
        imgs[i].src = imgs[i].getAttribute("data-src");
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
  let viewport = document.getElementById("viewport"); // 可视区域
  let imgList = document.querySelectorAll(".imgs"); // 被观察元素

  let options = {
    root: viewport,
  };
  let IO = new IntersectionObserver(IOCallback, options);

  // 循环所有 img 标签，使它被观察
  imgList.forEach((item) => {
    IO.observe(item);
  });

  // 回调函数
  function IOCallback(entries, observer) {
    // 循环所有观察元素
    entries.forEach((item) => {
      // 如果出现在可视区内，则替换 src
      if (item.isIntersecting) {
        console.info("出现在可视区内");
        item.target.src = item.target.dataset.src; // 替换 src
        IO.unobserve(item.target); // 停止观察当前元素 避免不可见时候再次调用 callback 函数
      }
    });
  }
</script>
```

##
