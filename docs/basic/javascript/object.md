# Object

Object.defineProperty()

**要注意有一个小小的例外：即便属性是 configurable:false，我们还是可以把 writable 的状态由 true 改为 false，但是无法由 false 改为 true。**

configurable:false 会禁止删除这个属性

writable:false,configurable:false 可以创建一个常量属性。

如果你想禁止一个对象添加新属性并且保留已有属性，可以使用 Object.preventExtensions(obj)

Object.seal(..)会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用 Object.preventExtensions(..)并把所有现有属性标记为 configurable:false。（不能添加新属性，不能重新配置或删除属性，**但可以修改属性值**）

Object.freeze(..)会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 Object.seal(..)并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们的值。（浅层）

obj.hasOwnProperty("ab")判断对象是否存在这个属性。（只检查当前对像）

in 操作符 （会检查原型链，无论是否可枚举）

注意：看起来 in 操作符可以检查容器内是否有某个值，但是它实际上检查的是某个属性名是否存在。对于数组来说这个区别非常重要，4 in [2, 4, 6]的结果并不是你期待的 True，因为[2, 4, 6]这个数组中包含的属性名是 0、1、2，没有 4。

obj.propertyIsEnumerable("ab") 会检查给定的属性名是否直接存在于对象中（而不是在原型链上）并且满足 enumerable:true。

Object.keys(..)会返回一个数组，包含所有可枚举属性

Object.getOwnPropertyNames(..)会返回一个数组，包含所有属性，无论它们是否可枚举。

对象不可以使用 for...of 遍历，但是可以自定义迭代器实现

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
