---
title: Dart source_gen
date: 2019-05-14 17:28:46
tags: Dart
---

### Dart 代码生成

在 Android 项目中，我们常常会使用到一种插桩技术来达到动态生成模板代码的需求，应用最广泛的自然是 BufferKnife 。这里来讲讲Dart 中的代码生成。


> [](https://medium.com/flutter-community/part-1-code-generation-in-dart-the-basics-3127f4c842cc)
> [](https://medium.com/flutter-community/part-2-code-generation-in-dart-annotations-source-gen-and-build-runner-bbceee28697b)
>


> 对于 Object 类的讨论是对 Dart 对象的整体把握。

<!--more-->

### runtimeType 是什么

> A representation of the runtime type of the object.



### 再谈反射 Mirror

尽管 Flutter 官方禁用了 Mirror 反射功能，这并不意味着开发者可以完全不清楚 Dart 的反射逻辑。

实际上，Dart 的类型检查（TypeChecker）使用的就是反射。

### Dart 中的代码生成

一些最常见的 Dart 包正在使用：

- build_value
- json_serializable
- kiwi
- chopper


a build.yaml config a Builder Object


```dart
  /// Create a new [TypeChecker] backed by a runtime [type].
  ///
  /// This implementation uses `dart:mirrors` (runtime reflection).
  // const factory TypeChecker.fromRuntime(Type type) = _MirrorTypeChecker;
```
class Object{

external int hashCode;


}
```





