---
title: Dart factory 关键字
date: 2019-05-14 17:28:46
tags: Dart 
---

### factory 关键字


官方文档中提到 factory 关键字是用来修饰是构造函数的。

> 在一些特定的场景，类本身需要避免创建过多的实例，可以使用 factory 创建工厂构造函数。 

官方提供了一个 Logger 的工厂构造函数从静态变量 _cache 中返回实例而无需重复创建类的实例。

```dart
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to
  // the _ in front of its name.
  static final Map<String, Logger> _cache =
      <String, Logger>{};

  factory Logger(String name) {
    if (_cache.containsKey(name)) {
      return _cache[name];
    } else {
      final logger = Logger._internal(name);
      _cache[name] = logger;
      return logger;
    }
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}

```

特别的 factory 需要返回一个对象，并且不允许使用 this 关键字。


[在 DartPad 运行此代码]()

内容



