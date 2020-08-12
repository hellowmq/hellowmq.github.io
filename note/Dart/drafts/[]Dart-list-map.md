---
title: Dart List map() 方法的坑
date: 2020-06-07 22:32:18
tags: Dart
---

### Dart List 的 map() 方法

map 方法仅返回一个映射的迭代器，并不会指定

```dart
  /**
   * Returns a new lazy [Iterable] with elements that are created by
   * calling `f` on each element of this `Iterable` in iteration order.
   *
   * This method returns a view of the mapped elements. As long as the
   * returned [Iterable] is not iterated over, the supplied function [f] will
   * not be invoked. The transformed elements will not be cached. Iterating
   * multiple times over the returned [Iterable] will invoke the supplied
   * function [f] multiple times on the same element.
   *
   * Methods on the returned iterable are allowed to omit calling `f`
   * on any element where the result isn't needed.
   * For example, [elementAt] may call `f` only once.
   */
```



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
// 代码
void main() {
    
}
```
[在 DartPad 运行此代码]()



