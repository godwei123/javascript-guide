const worker = new Worker('worker.js');
const content = document.getElementById('content');
const result = document.getElementById('result');
worker.onmessage = function (e) {
    console.log('myworker', e.data);
    result.innerText = JSON.stringify(e.data);
};

document.getElementById('btn').addEventListener('click', () => {
    let arr = content.value
        .split(' ')
        .filter(item => item !== '')
        .map(it => parseInt(it));
    console.log(arr);
    worker.postMessage(arr);
});
