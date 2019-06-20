---
title: Dart-谈谈反射
date: 2019-06-16 05:53:03
tags: Dart	
---

## Dart 反射

反射机制需要使用到 Dart 的官方库 “dart:mirrors”；


```dart
main(){
  ClassMirror cm = reflectClass(SelfPrinting);
  for(Symbol memberName in cm.instanceMembers.keys){
    print('$memberName');
  }
}
```

<!--more-->

Symbol 是一类特殊的类型，这是由于 Dart 的运行机制导致的。

1. Minifier：常见的包括将 Dart 代码编译为 JavaScript 代码，此时会将代码进行 minifier 处理。用来存储标识符的字符串会在压缩时被修改，Symbol 类会在 minifier 过程中被是被并使用标识符的压缩方式。
2. Tree shaking：编译器自动忽略非运行时的代码，这些时候编译器难以推断运行时的代码，此使只能将整个核心库包含为项目的内容。

### 代理类

之前我们从 StackOverflow 中曾经抄了一个代理类的程序

Proxy

```
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