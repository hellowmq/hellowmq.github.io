---
title: Dart异步
date: 2019-06-16 05:52:42
tags: Dart
---

异步和 Isolate

大多数时候 Dart 程序应该是并发的。
Dart 并发基于 Isolate，依赖于 future 和 stream。

异步

异步是相对同步而言的，对于同步通信，调用者将保持等待直到被调用者给出响应；对于异步通信而言，调用者发起调用请求之后，不进行等待而是立即执行后续程序。

future 

future 是 Dart 中用于表示暂不返回的对象的方式，能用于异步运算中的变量传递。future 可以理解为一个等待运算结果传递至当前对象的过程。dart:async 库的 Future 泛型类用于实现这一过程，Future 类接受类型参数 T 传递future 接受的值类型。

使用 future 

then() 方法和 catchError() 方法是 future结束调用的方法，方法的参数为一个接受类型参数 T 的闭包，起作用分别是在 future 完成和异常结束操作 future 的值。

生成 future 


调度


Isolate 

Isolate 是 Dart 中独有概念，是 Actor 模型的产物一个 Isolate 就是一个 actor 。每个 isolate 能够接受消息并执行顺序计算，isolate 之间相互隔离不共享内存空间并且使用 messageQueue 进行异步通信。



isolate port 

- send port：允许发送消息给 receive port 。
- receive port：是一个接受消息的 Stream。



isolate spawning 



Promise 



异步函数

异步函数使用 async 修饰函数体，异步函数作用是使用 同步方式编写异步代码

常用的就有 await 表达式、异步生成器、 await-for 循环。