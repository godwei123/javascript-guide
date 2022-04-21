手写大数相加

```js
const bigNumsAdd = (a = '', b = '') => {
    a = a.split('');
    b = b.split('');
    let len = Math.max(a.length, b.length);
    let c = 0;
    let ans = [];
    for (let i = 0; i < len; i++) {
        let t =
            (a.length - i - 1 < 0 ? 0 : parseInt(a[a.length - i - 1])) +
            (b.length - i - 1 < 0 ? 0 : parseInt(b[b.length - i - 1])) +
            c;
        ans.unshift(t % 10);
        c = Math.floor(t / 10);
    }
    if (c > 0) {
        ans.unshift(c);
    }
    return ans.join('');
};
```

手写版本比较

```js
let versions = ['1.1.1', '11.3.4', '3.2.1', '7.0.1', '1.0.1', '1.0.1'];

function versionSort(versions) {
    const compareFn = (v1, v2) => {
        v1 = v1.split('.');
        v2 = v2.split('.');
        const len = Math.max(v1.length, v2.length);
        while (v1.length < len) {
            v1.push('0');
        }
        while (v2.length < len) {
            v1.push('0');
        }
        for (let i = 0; i < len; i++) {
            if (parseInt(v1[i]) !== parseInt(v2[i])) {
                return parseInt(v1[i]) - parseInt(v2[i]);
            }
        }
        return 0;
    };
    return versions.sort(compareFn);
}
console.log(versionSort(versions));
```

128. 最长连续序列

将 123456 转化为 123,456

```js
const ConvertStr = num => {
    let s = '' + num;
    let ans = [];
    for (let i = 0; i < s.length; i++) {
        if (i % 3 == 0 && i != 0 && i != s.length - 1) {
            ans.unshift(',');
        }

        ans.unshift(s[s.length - i - 1]);
    }
    return ans.join('');
};
```

31. 下一个排列 https://leetcode-cn.com/problems/next-permutation/
