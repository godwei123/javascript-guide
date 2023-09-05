# axios

## Config Defaults

### Global axios defaults

```js
axios.defaults.baseURL = "https://api.example.com";

// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
```

### Custom instance defaults

```js
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "https://api.example.com",
});

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
```

### Config order of precedence

```js
// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = axios.create();

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 2500;

// Override timeout for this request as it's known to take a long time
instance.get("/longRequest", {
  timeout: 5000,
});
```

## Cancellation

### AbortController

```js
const controller = new AbortController();

axios
  .get("/foo/bar", {
    signal: controller.signal,
  })
  .then(function (response) {
    //...
  });
// cancel the request
controller.abort();
```

### CancelToken `👎deprecated`

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios
  .get("/user/12345", {
    cancelToken: source.token,
  })
  .catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // handle error
    }
  });

axios.post(
  "/user/12345",
  {
    name: "new name",
  },
  {
    cancelToken: source.token,
  }
);

// cancel the request (the message parameter is optional)
source.cancel("Operation canceled by the user.");
```

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get("/user/12345", {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  }),
});

// cancel the request
cancel();
```

## use `application/x-www-form-urlencoded` format

```js
const params = new URLSearchParams({ foo: "bar" });
params.append("extraparam", "value");
axios.post("/foo", params);
```

### Automatic serialization to URLSearchParams

```js
const data = {
  x: 1,
  arr: [1, 2, 3],
  arr2: [1, [2], 3],
  users: [
    { name: "Peter", surname: "Griffin" },
    { name: "Thomas", surname: "Anderson" },
  ],
};

await axios.postForm("https://postman-echo.com/post", data, {
  headers: { "content-type": "application/x-www-form-urlencoded" },
});
```

## Using `multipart/form-data` format

### FormData

```js
const formData = new FormData();
formData.append("foo", "bar");

axios.post("https://httpbin.org/post", formData);
```

### Automatic serialization to FormData v0.27.0

```js
import axios from "docs/interview/axios";

axios
  .post(
    "https://httpbin.org/post",
    { x: 1 },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
  .then(({ data }) => console.log(data));
```

## Files Posting

You can easily sumbit a single file

```
await axios.postForm('https://httpbin.org/post', {
  'myVar' : 'foo',
  'file': document.querySelector('#fileInput').files[0]
});
```

or multiple files as `multipart/form-data`.

```
await axios.postForm('https://httpbin.org/post', {
  'files[]': document.querySelector('#fileInput').files
});
```

`FileList` object can be passed directly:

```
await axios.postForm('https://httpbin.org/post', document.querySelector('#fileInput').files)
```

All files will be sent with the same field names: `files[]`.

## 🆕 HTML Form Posting (browser)

Pass HTML Form element as a payload to submit it as `multipart/form-data` content.

```
await axios.postForm('https://httpbin.org/post', document.querySelector('#htmlForm'));
```

`FormData` and `HTMLForm` objects can also be posted as `JSON` by explicitly setting the `Content-Type` header to `application/json`:

```
await axios.post('https://httpbin.org/post', document.querySelector('#htmlForm'), {
  headers: {
    'Content-Type': 'application/json'
  }
})
```
