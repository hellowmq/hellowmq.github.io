---
title: Dart 函数参数
date: 2019-05-16 01:27:35
tags: Dart
---



### Dart 函数参数

为了更好的了解 Dart 的函数参数传递，不妨从 Functoin 类的静态方法入手。

```dart
external static apply(Function function, List positionalArguments,
    [Map<Symbol, dynamic> namedArguments]);
```

> Dynamically call function with the specified arguments.
> Acts the same as calling function with positional arguments corresponding to the elements of [positionalArguments] and named arguments corresponding to the elements of [namedArguments].
>
> --<https://api.dartlang.org/stable/2.3.0/dart-core/Function/apply.html>

该方法是 Function 类提供的静态调用方法，可以直接以特定的参数直接调用一个函数。

<!--more-->

从这个函数可以知道：Dart 函数的传入参数分为位置参数和命名参数。其中，位置参数以 List 传入，根据参数的列表索引作为参数索引；而命名参数则以 Map<Symbol, dynamic> 传入，以键值对的方式作为参数索引。


#### 位置参数

使用位置参数的函数与其他编程语言的函数没什么不同，将函数需要使用的参数依照函数原型规定的次序对应地传入即可调用函数，称之为位置参数是因为其具有根据参数位置次序进行参数索引的性质。

位置参数可以是可选的，并且可以为其指定默认值。可选的位置参数必须位于函数原型的末尾并且以中括号([])进行包含。

```dart
num add(int origin, [int value = 1]) => return origin +value; 
```

#### 命名参数

命名参数使用了（Symbol, dynamic）键值对的方式进行函数的参数索引。命名参数也应当位于函数原型的末尾并且以大括号({})即进行包含。一旦使用了命名参数，就不允许使用可选的位置参数。

> 尽管我们之前没有提到命名参数的使用，但在 Flutter 控件的构造函数中很常见。

命名参数的传入也可以是必选或可选的，默认情况下，所有的命名参数都是可选的。

- 开发者应当为每一个可选的命名参数提供默认值，如果没有默认值，参数的的传入之将是 null。
- 如果开发者需要指定部分的命名参数为必须传入，那么可以使用 (@required) 注解，告知使用者参数其不可缺失的性质；

```dart 
const Text(
  this.data, {
  Key key,
  this.style,
  this.strutStyle,
  this.textAlign,
  this.textDirection,
  this.locale,
  this.softWrap,
  this.overflow,
  this.textScaleFactor,
  this.maxLines,
  this.semanticsLabel,
}) : assert(
       data != null,
       'A non-null String must be provided to a Text widget.',
     ),
     textSpan = null,
     super(key: key);
```
上述例子是 Flutter 的 Text 控件的构造函数，在上述例子中，函数提供了参数空值检查并调用了父类的构造函数。