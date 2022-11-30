## 类

### 混入

#### 1、显式混入

这个功能在许多库和框架中被称为 extend(..)，但是为了方便理解我们称之为 mixin(..)。

```javascript
function mixin(sourceObj, targetObj) {
  for (let key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key];
    }
  }
  return targetObj;
}
```

JavaScript 中的函数无法（用标准、可靠的方法）真正地复制，所以你只能复制对共享函数对象的引用。如果你修改了共享的函数对象，比如添加了一个属性，那 Vehicle 和 Car 都会受到影响。

显式混入是 JavaScript 中一个很棒的机制，不过它的功能也没有看起来那么强大。虽然它可以把一个对象的属性复制到另一个对象中，但是这其实并不能带来太多的好处，无非就是少几条定义语句，而且还会带来我们刚才提到的函数对象引用问题。

#### 2、寄生继承

```javascript
function Parent() {
  this.name = "tom";
}
Parent.prototype.getA = function () {
  console.log("AAA");
};
Parent.prototype.getB = function () {
  this.getA();
  console.log("BBB");
};

function Son() {
  let son = new Parent();

  son.age = 21;

  let m = son.getB;

  son.getB = function () {
    m.call(this);
    console.log("CCC" + this.age);
  };
  return son;
}

let a = new Son();
a.getB();
```

调用 new Son()时会创建一个新对象并绑定到 Son 的 this 上。但是因为我们没有使用这个对象而是返回了我们自己的 car 对象，所以最初被创建的这个对象会被丢弃，因此可以不使用 new 关键字调用 Son()。这样做得到的结果是一样的，但是可以避免创建并丢弃多余的对象。

#### 3、隐式混入

```javascript
let something = {
  cool: function () {
    this.greeting = "hello world";
    this.count = this.count ? this.count + 1 : 1;
  },
};

let Another = {
  cool: function () {
    something.cool.call(this);
  },
};

Another.cool();
console.log(Another.greeting); // "hello world"
console.log(Another.count); // 1
```
