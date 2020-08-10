---
title: Dart tear-offs
date: 2020-03-13 00:46:44
tags: Dart
---

### tear-offs

tear-offs 是一种特殊的闭包，允许开发者通过 forEach 迭代向 Function 对象直接传递参数。本质是是闭包语法调用的语法糖，具有显著的可读性。



<!--more-->

> [此处可以对照 tear-off 与 lambda 的写法差距](https://dart-lang.github.io/linter/lints/unnecessary_lambdas.html)


```dart
/// This is a example of dart tear-offs.

/// a "tear-offs" is a closure that takes the same parameters as the method and invokes it when you call it.

List<int> a = [1,2,3,4,5,6];
Map<int,String> b = new Map()
  ..[0]= "0000"
  ..[1]= "1111"
  ..[2]= "2222"
  ..[3]= "3333";


c(int a ,String b){
  print(a.toString() + "----"+ b );
}


void main(){
  a.forEach(print);
  b.forEach(c);
  
}
```
[在 DartPad 运行此代码](https://dartpad.dartlang.org/905af578c168a18add7691f6aa65619b)








