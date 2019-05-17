---
title: 使用 Dart 实现代理类
date: 2019-05-14 17:28:46
tags: Dart 
---

### 使用 Dart 实现代理类

代理模式是十分常见的设计模式，在 Dart 中可以使用 dart:mirrors 库来实现。

> 这是之前在 StackOverflow 上看到的某一位回答者的答案，具体链接暂时无法找到。


<!--分割线-->

<!--more-->

```dart

import 'dart:mirrors';

class Parser {
  noSuchMethod(Invocation invocation) {
    ClassMirror cm = reflectClass(Proxy);
    return cm.invoke(invocation.memberName
        , invocation.positionalArguments
        /*, invocation.namedArguments*/ // not implemented yet
        ).reflectee;
  }
}

class Proxy {
  static String hello() { return "hello"; }
  static String world() { return "world"; }
}

main(){
  var parser = new Parser();
  print(parser.hello());
  print(parser.world());
}
```
```
[在 DartPad 运行此代码]()

内容



