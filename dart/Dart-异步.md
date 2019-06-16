---
title: Dart异步
date: 2019-06-16 05:52:42
tags: Dart
---

## 异步和 Isolate


### 异步


大多数时候，一个应用程序应该是并发执行的。由于 CPU 的执行速度几乎总是超前于外部事件（打开文件，访问网络）的响应，总是让应用程序处于同步执行状态无疑让 CPU 处于空闲状态。异步是相对同步而言的，对于同步通信，调用者将保持等待直到被调用者给出响应；对于异步通信而言，调用者发起调用请求之后，不进行等待而是立即执行后续程序。

> Dart 并发基于 Isolate，依赖于 future 和 stream。

### future 

future 是 Dart 中用于表示异步运算的结果，能用于异步运算中的变量传递。future 可以理解为一个等待运算结果传递至当前对象的容器。dart:async 库的 Future 泛型类用于实现这一过程，Future 类接受类型参数 T 传递future 接受的值类型。

### Future 类 API

Future 对象可能以两种情况结束：成功与失败，也可能永远不结束。无论如何 Future 对象总是存在。

使用 future 类的 API：then() 方法和 catchError() 方法是 future结束调用的方法，方法的参数为一个接受类型参数 T 的闭包，起作用分别是在 future 完成和异常结束操作 future 的值。

```
Future<int> future = getFuture();
future.then((value) => handleValue(value))
      .catchError((error) => handleError(error));
```

### async 与 await

async 用来修饰一个异步函数。await 表达式使用的场合是异步并等待，因此 await 只能出现在异步函数中。await 语句能让异步函数进入立即返回一个未完成的 future，进入异步执行阶段，转而执行函数外部的同步代码。直到同步代码执行完成，异步代码继续执行。

特别地，一个异步函数并非一开始就进入异步执行的阶段，而是在以下三种情况才返回一个未完成的 future。

- 函数的第一个 await 表达式
- return 语句
- 函数结束

    
换言之，强制使用 async 修饰一个没有耗时操作的函数，该函数内部不触发异步执行。与 Future 对象不同的行为是，每一个 await 表达式总是让异步函数进入异步状态。

> (值得一看的文章)[https://juejin.im/post/5c898b4af265da2de25bcc2d]，这篇文章第一个例子中，MethodC 实际上就不是一个异步函数。 

```
// Copyright (c) 2013, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:async';

Future<void> printDailyNewsDigest() async {
  var newsDigest = await gatherNewsReports();
  print(newsDigest);
}

printDailyNewsDigest1() async {
  await print("Manual trigger async");
  print("123");
}

main() {
  var a =  printDailyNewsDigest1();
  print(a.toString());
  printWinningLotteryNumbers();
  printWeatherForecast();
  printBaseballScore();
}

printWinningLotteryNumbers() {
  print('Winning lotto numbers: [23, 63, 87, 26, 2]');
}

printWeatherForecast() {
  print("Tomorrow's forecast: 70F, sunny.");
}

printBaseballScore() {
  print('Baseball score: Red Sox 10, Yankees 0');
}

const news = '<gathered news goes here>';
const oneSecond = Duration(seconds: 1);

// Imagine that this function is more complex and slow. :)
Future<String> gatherNewsReports() =>
    Future.delayed(oneSecond, () => news);

// Alternatively, you can get news from a server using features
// from either dart:io or dart:html. For example:
//
// import 'dart:html';
//
// Future<String> gatherNewsReportsFromServer() => HttpRequest.getString(
//      'https://www.dartlang.org/f/dailyNewsDigest.txt',
//    );
```
    
Isolate 

Dart 代码在一个单独的线程内部执行。
> isolates: independent workers that are similar to threads but don't share memory, communicating only via messages.

Isolate 是 Actor 模型的一个实现。每个 isolate 能够接受消息并执行顺序计算，isolate 之间相互隔离不共享内存空间并且使用 messageQueue 进行异步通信。Isolate 是 Dart 并发的最小单元。每个 Isolate 拥有独立的事件循环。

(手动创建一个 Isolate)[https://hackernoon.com/are-futures-in-dart-threads-2cdc5bd8063a]

Isolate 能够使用 Isolate.spawn() 方法创建一个新的 Isolate，并与其通过端口(port)进行通信，通过监听 ReceivePort 和为对方指定 sendPort 来进行通信

```
// main.dart
main() {  // in the main isolate
    ReceivePort r1 = new ReceivePort();
    SendPort s1 = r1.sendPort;
    Isolate.spawnUri(new Uri(path:'./otherIsolate.dart'), [], s1);
}

// otherIsolate.dart
main(args, SendPort s1) { // in otherIsolate.dart
    ReceivePort r2 = new ReceivePort();
    SendPort s2 = r2.sendPort;
    s1.send(s2);
}
```

 
 
