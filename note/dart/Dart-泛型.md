---
title: Dart-泛型
date: 2019-06-21 00:20:00
tags: Dart
---

### Dart 泛型（Generics）

泛型指的是参数化类型，把类型像参数一样传递。泛型的好处是可以使得类和方法的定义不依赖于具体的类型。List 容器就是一个基于泛型实现的泛型类，其类型为 List<E>。

```dart
abstract class List<E> implements EfficientLengthIterable<E>{}
```

泛型有两个显然的好处：

- 对于需要接受特定类型的情况，泛型能控制参数传递的类型合法性；
- 对于逻辑上耦合的代码，使用泛型能大大减少重复的代码

> 对于 Dart 而言，不存在函数的重载机制，但是很多时候能用泛型参数来解决问题。

<!--more-->

### 使用泛型

通常来说，使用 <...> 声明一个泛型，使用一个大写字母来作为泛型参数。

通常来讲：

- E 表示元素
- K，V 表示键和值
- T 表示类

实例化一个泛型类时，可以选择性的为泛型类传递泛型参数，不传递参数时，默认类型参数为 dynamic。

```dart
List listA = new List();//  List<dynamic>
List<int> listB = new List();//  List<int>
List listC = new List<int>();//  List<int>
List<int> listD = new List<int>();//  List<int>
```

### 限制泛型的使用 

使用泛型可以帮我们减少重复代码的使用，但是有时候只需要为某一个类的子类提供泛型，可以使用 extends 关键字来实现。

```dart
class Foo<T extends num> {
  T value;

  Foo([this.value]);

  T addOne() {
    this.value += 1;
  }
}
// Foo can only receive num class as type parameter.
void main() {
  Foo foo  = new Foo();//  Foo<num>
  Foo<int> fooA = new Foo();//  Foo<int>
  Foo<double> fooB= new Foo();//  Foo<double>
//  Foo<String> fooC; //String is not a subtype of num
}
```

### 泛型函数

泛型语法几乎可以用户函数的任何成分：

- 函数的参数列表
- 函数实现中的类型声明
- 函数的返回类型
- 作为函数内部中泛型类和泛型方法的参数
- 作为 Type 对象
- 作为 is 语句的右操作数

<https://github.com/dart-lang/sdk/blob/master/pkg/dev_compiler/doc/GENERIC_METHODS.md>

