# Broadcast Channel API

当我们网页需要在不同的浏览器窗口之间共享数据时，可能需要使用 WebSocket 或 WebRTC 等技术。但是，这些技术会过于复杂，而浏览器自带的 Broadcast Channel API 可以让我们轻松地在不同浏览器窗口之间共享数据，而无需使用复杂的技术。Broadcast Channel API 可以实现同源下浏览器不同窗口，Tab 页，frame 或者 iframe 下的浏览器上下文(通常是同一个网站下不同的页面) 之间的简单通讯，并且此特性在 Web Worker 中可用。

:::preview
url=../../packages/pages/css/broadcast-channel-visual.vue
:::

## 基本使用

使用 Broadcast Channel API 的基本方法非常简单。我们只需要创建一个 BroadcastChannel 实例，并使用 postMessage() 方法向该频道发送消息。

```js
// 连接到广播频道
var bc = new BroadcastChannel("test_channel");
// 发送消息，消息内容可以是任意类型的数据。
bc.postMessage("Hello world!");

// 监听名为 "test_channel" 的广播频道
const myChannel = new BroadcastChannel("test_channel");

// 监听该频道并处理消息
myChannel.onmessage = function (event) {
  console.log(event.data);
};

// 当频道收到一条无法反序列化的消息时触发。
myChannel.onmessageerror = function (error) {
  console.log(error);
};

// 关闭频道对象，告诉它不要再接收新的消息，并允许它最终被垃圾回收。
myChannel.close();
```

## 优缺点

- 传递数据：提供了一种可靠的方法，使独立的 JavaScript 应用程序在同一浏览器同一站点内传递数据。
- 传输速度快：以高速连接，提供更快的数据传输速度。
- 实时性：提供了实时，低延迟的数据传输。
- 可靠性：能够在小的数据包丢失或意外丢失时进行恢复。

Broadcast Channel API 也存在以下缺点：

- 仅限同源：Broadcast Channel API 只能在同一浏览器同一站点内进行通信。这意味着，虽然不同的站点可以在同一浏览器内打开，但无法使用 Broadcast Channel API 进行通信。
- 受浏览器支持限制：与大多数 Web API 一样，Broadcast Channel API 受到不同浏览器和平台的支持和兼容性限制。

## 附录

- broadcast-channel，该项目是一个简单易用的 Broadcast Channel API 封装。
- react-broadcast-channel，该项目是一个 React 应用程序的 Broadcast Channel API 封装。
