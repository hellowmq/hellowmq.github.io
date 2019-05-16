---
title: Dart 库
date: 2019-05-14 17:28:46
tags: template
---

### 认识 Dart 的库概念

Dart 库就是一个 library，是一个模块化的、可共享的代码库。

Dart 库可以包含一组 import, export 和顶级声明。顶级声明可以是类、类型别名、函数或变量声明。

<!--more-->

```
topLevelDefinition:
classDefinition |
enumType |
typeAlias |
external? functionSignature ';' |
external? getterSignature ';' |
external? setterSignature ';' |
functionSignature functionBody |
returnType? get identifier functionBody |
returnType? set identifier formalParameterList functionBody |
(final | const) type? staticFinalDeclarationList ';' |
variableDeclaration ';'
; 

getOrSet:
get |
set
;

libraryDeﬁnition:
scriptTag? libraryName? importOrExport* partDirective* topLevelDefinition* 
;

scriptTag:
‘#!’ (˜NEWLINE)* NEWLINE 
;

libraryName:
metadata library identiﬁer (‘.’ identiﬁer)* ‘;’ 
;

importOrExport:
libraryImport |
libraryExport
;
```





#### 库的访问权限

与其他的编程语言不同的是，Dart 语法中不存在 public, private 和 protected 的关键字。成员标志符如果以下划线（_）开头可以控制成员的访问权限为仅库内部可见。

因此一个库对于外部库可用的部分是有限定的。对于任意的库，总是隐式地导入了 dart:core。

由于顶级私有声明不会被导入，因此也不可能被另一个库中使用。





#### Dart 库的命名

开发者可以隐式或者显示地命名一个 Dart 库。

- 显示命名 Dart 库：使用 library 关键字提供标识符和点的级联来为库命名。
- 隐式命名 Dart 库：使用空字符串作为库的名称。

#### import ：导入 Dart 库

import 允许将另一个库的非私有内容重用到当前文件。通常来说，import 语句以 URI （Uniform Resource Identifier）字符串来定位一个库的位置。

```dart
import 'dart:core';
import 'package:flutter/material.dart';
import 'http://staxRUs/stack1.dart';
```

1. 使用 import as 来解决库内容的歧义冲突。
假设两个需要导入的库当中存在两个同名的成员，这时编译器就无法区分开发者的意图了。对于这一问题，Dart 的解决方式与 Python 类似，可以使用 import as 语句在导入库时对不同的库使用不同的标志符进行区分。

```dart
// Assume that both package own a doSomething method. 
import 'package1.dart' as p1;
import 'package2.dart' as p2;
p1.doSomething();
p2.doSomething();
```
2. 使用 import hide/show 来导入部分库成员

如果开发者只需要导入部分库成员，那么可以使用显式地指定导入过程中需要部分导入或屏蔽的成员。

```dart
// Import only foo.
import 'package:lib1/lib1.dart' show foo;

// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;
```

#### part 拆分 Dart 库

通常来讲一个库的内容很庞大，将一个庞大的代码库进行一定的分割是很有必要的，我们就会使用一对 part 命令来对 Dart 库进行分解。从 Dart 的官方文档看来， part 命令在后续的时间会被取代，不建议开发者使用。

> part 命令是成对存在的，library 主文件中使用 part 指定一个 URI 来存放库的子系统的 dart 文件，相应地对应的 dart 文件也使用 part of library_name 来现实指定其归属的库。

[Note: You may have heard of the part directive, which allows you to split a library into multiple Dart files. We recommend that you avoid using part and create mini libraries instead.](https://dart.dev/guides/libraries/create-library-packages#organizing-a-library-package)

#### export 导出部分内容

开发者可以通过 export 命令显式的将一部分库内容导出为库的公共 API，事实上这种方法应当尽可能取代 part 命令成为库管理的方式。
	
```dart
export 'src/cascade.dart';
export 'src/handler.dart';
export 'src/handlers/logger.dart' show Logger;
export 'src/hijack_exception.dart';
export 'src/middleware.dart';
export 'src/pipeline.dart';
export 'src/request.dart' hide RequestException;
export 'src/response.dart';
export 'src/server.dart';
export 'src/server_handler.dart';
```

#### deferred as 延迟加载 Dart 库

通常来讲 Dart 库在编译初期就会加载，这对于应用启动初期内存使用可能是一个负担。Dart 中的解决方法是延迟加载。

使用 deferred as 为 import 指定一个需要延迟加载的库标志符，并在需要加载库的时候再使用异步函数显式地加载一个 Dart 库。

```
import 'package:greetings/hello.dart' deferred as hello;

...

Future greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}	

```