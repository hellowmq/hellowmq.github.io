---
title: 如何阅读 ECMA-408
date: 2019-05-14 17:28:46
tags: Dart
---

### 此文件为阅读 ECMA-408 提供一定的基础

ECMA-408 是 Dart 编程语言的语法和语义的概述。除了最基础的底层 Dart API 之外，ECMA-408 并不提供完整的 Dart API 支持。

> This Ecma standard speciﬁes the syntax and semantics of the Dart programming language. It does not specify the APIs of the Dart libraries except where those library elements are essential to the correct functioning of the language itself (e.g., the existence of class Object with methods such as noSuchMethod, runtimeType).

<!--more-->



1. 竖线（|）  ：语义上的或，表示变量可以是左操作数和右操作数之一；
1. 问号（?） ：表示左操作数的可以为空。
1. 单引号对（’’）：用于包含操作符；
1. 分号（;）：表示表达式的结束；
1. 小括号（( )）：改变运算优先级；
1. 星号（*）：表示若干个左操作数级联；

```dart
// 代码
void main() {
    
}
```
[在 DartPad 运行此代码]()

内容



