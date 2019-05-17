---
title: Dart Object 类
date: 2019-05-14 17:28:46
tags: Dart
---

### Dart 的万物起源： Object 类

之所以称 Object 类为 Dart 的万物起源是因为 Object 类是一切对象的公共基类。



> 对于 Object 类的讨论是对 Dart 对象的整体把握。

Dart Object 类的定义很简单。



<!--more-->

```dart
class Object{

external int hashCode;


}
```

可以知道：

- 成员变量 hashCode 作为对象的唯一判别标志；
- 成员函数 toString() 用于输出对象需要相关信息，在 print() 函数中会被自动调用；
- 成员函数 等号判断操作符（==）调用了 dart:core 的 identical() 方法作为判断两个对象相等的依据，因此默认情况下，对象相等就等价于对象相同（为同一个对象，处于同一个地址）
- 成员函数 nosuchmethod() 是外部调用对象不存在的内容时自动调用的函数，一般可以用来抛出特定的异常。




