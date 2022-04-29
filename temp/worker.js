onmessage = function (e) {
    console.log(e);
    let res = e.data.sort((a, b) => b - a);
    postMessage(res);
};
