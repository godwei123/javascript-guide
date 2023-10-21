# Object

## Object.defineProperty()

**要注意有一个小小的例外：即便属性是 configurable:false，我们还是可以把 writable 的状态由 true 改为 false，但是无法由 false 改为 true。**

configurable:false 会禁止删除这个属性

writable:false,configurable:false 可以创建一个常量属性。

如果你想禁止一个对象添加新属性并且保留已有属性，可以使用 Object.preventExtensions(obj)

## Object.seal(..)

会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用 Object.preventExtensions(..)并把所有现有属性标记为 configurable:false。（不能添加新属性，不能重新配置或删除属性，**但可以修改属性值**）

## Object.freeze(..)

会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 Object.seal(..)并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们的值。（浅层）

obj.hasOwnProperty("ab")判断对象是否存在这个属性。（只检查当前对像）

## in 操作符

注意：看起来 in 操作符可以检查容器内是否有某个值，但是它实际上检查的是某个属性名是否存在。对于数组来说这个区别非常重要，4 in [2, 4, 6]的结果并不是你期待的 True，因为[2, 4, 6]这个数组中包含的属性名是 0、1、2，没有 4。

## obj.propertyIsEnumerable("ab")

会检查给定的属性名是否直接存在于对象中（而不是在原型链上）并且满足 enumerable:true。

## Object.keys(..)

返回一个数组，包含所有可枚举属性

## Object.getOwnPropertyNames(..)

返回一个数组，包含所有属性，无论它们是否可枚举。

对象不可以使用 for...of 遍历，但是可以自定义迭代器实现
