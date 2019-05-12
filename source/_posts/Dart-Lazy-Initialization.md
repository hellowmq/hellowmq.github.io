---
title: Dart-Lazy-Initialization
date: 2019-05-10 04:28:48
tags: Dart
---

### Dart 语言中类变量的延迟初始化

> 类变量存在延迟初始化行为，只有第一次调用时，类变量才执行初始化，即第一次尝试读取它时。

```dart
  // 类变量存在延迟初始化行为，只有第一次调用时，类变量才执行初始化，即第一次尝试读取它时。
  // Class variables are initialized lazily; the initializer of a class variable is executed the first time its getter is invoked—that is, the first time one attempts to read the variable.

  class Animal {
    Animal() {
      print("Start Lazy Initialization");
    }
  }
  Animal animal = new Animal();

  void main() {
  //   animal; // This statement will call the initializer;
    print("Before Initialization");
    animal;
    print("After Initialization");
  }

```

[在 DartPad 运行此代码](https://dartpad.dartlang.org/eab8a6fdc4b5f34008fa5d07f20f3f28)

