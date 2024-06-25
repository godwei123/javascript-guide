function getVersion() {
  fetch("/javascript-guide/js/version.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-store",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      postMessage(JSON.stringify(data));
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
    });
}

self.onmessage = async (e) => {
  console.log("web worker start");
  let delay = 60 * 1000; // 初始延迟时间
  const increase = 1000; // 每次增加的时间
  const maxDelay = 10 * 60 * 1000; // 最大延迟时间
  let timer = null;

  function execute() {
    getVersion();
    delay += increase;
    if (delay > maxDelay) {
      delay = maxDelay;
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(execute, delay);
  }

  timer = setTimeout(execute, delay);
};

self.onerror = (e) => {
  console.log(e);
};
