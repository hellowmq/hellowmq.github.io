---
title: Dart 拓展方法
date: 2020-06-07 22:32:18
tags: Dart
---

### Dart 拓展方法

拓展方法是 Dart 2.7 引入的特性。允许开发针对已经存在的可增加额外的功能。

> 相关视频教程
> [Youtube 视频](https://youtu.be/D3j0OSfT9ZI)
> [bilibili 视频](https://www.bilibili.com/video/BV1rJ411s7c4/);
>


<!--分割线-->

<!--more-->

### 静态方法

如我们学习 Dart 过程中所知道的，Dart 的字面量无法被继承。强行继承一个基本类型的类会引发编译时异常。

```dart
class ExtendString extends String{}
/// This will cause a compiling Error
```

考虑到日常的开发场景，我们可能会使用一些针对性的静态方法来支持我们的业务。

```dart
class StringUtils {
  static String to999Plus(int number) => (number > 999)?"999+":"$number";
}

void main() {
  List<int> intList = [-1, 0, 10, 999, 1000, 1001, 1000];
  print(intList);
  List<String> stringList = intList.map((s) => StringUtils.to999Plus(s)).toList();
  print(stringList);
}
```

### 拓展函数的使用

能在不对库函数进行修改时，动态的增加额外的特性。

```dart
// 代码
void main() {
    
}
```
[在 DartPad 运行此代码]()



