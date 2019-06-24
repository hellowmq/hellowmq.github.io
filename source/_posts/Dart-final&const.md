---
title: Dart final & const
date: 2019-06-24 17:28:46
tags: Dart
---

## final 与 const

final 修饰一个编译时常量，final 修饰一个运行时常量。

final 变量指的是只能进行初始化而不能进行赋值操作的变量；
const 变量指的必须使用编译时常量进行初始化并且不能进行赋值操作的变量（因此 const 变量总是隐式地具有 final 属性）；

<!--more-->

### const 常量

如果在类的内部使用了常量变量应当在 const 之前加上 static 将其设置为静态常量变量。const 变量总是使用编译时常量进行初始化。

const 变量一旦定义就不可以被修改，尽管这是一个显然的事实，但是一旦 const 与容器结合起来，就容易出现一些违背直觉的情况。

```dart
const constList_1 = [1]; // const List variable. 
const constList_2 = const [2]; // const List variable. |use const redundantly
var constList_3 = const [3]; // List variable. | but [3] is is contant.
constList_3.add(4); // error
constList_3 = [5]; // no error
```

在上述例子中，const 修饰一个接受 List<int> 的变量，此使变量就被固定，然而为一个变量 constList_3 赋值一个 const 修饰的常数 List<int> 并不会改变 constList 的性质。尽管 const [3] 不能进行任何修改，但是 constList_3  仍然可以被重新赋值。

### final 变量

在之前的笔记中而可以知道，final 变量常见于无需赋值操作的类实例变量。

因此这类变量没有 setter 。其初始化要在构造函数启动之前，因此初始化操作可以在构造函数参数或构造函数的初始化列表中。另一方面，由于延迟初始化的行为，初始化又只在第一使用才进行。

