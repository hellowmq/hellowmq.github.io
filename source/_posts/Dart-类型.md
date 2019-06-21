---
title: Dart-类型
date: 2019-06-16 05:57:14
tags: Dart
---

## Dart 类型

Dart 类型的性质在 Dart 2 发布前后使截然不同的，本篇讨论了 Dart 类型的各种性质。

<!--more-->

### 可选类型（Dart 2 之前）

Dart 中的可选类型的特征指的是：

- 类型在语法层面上是可选的；
- 类型对运行时语义没有影响。

Dart 是动态类型的体现在开发者可以编写完全没有类型注解的程序，而不会有任何区别。

> Dart 类型注解不会影响语义。

### 类型注解

尽管由于可选类型的原因，类型注解不是必须的，但是类型注解仍然有很多好处：

- 开发者更好的阅读代码
- 帮助 IDE 识别类型
- 帮助静态检查器在初期检查错误

### 类型推断

分析器可以推断参数的类型，一旦推断类型成为难题时，最终推断为 dynamic 。

- 输入参数推断：根据上下文推断
- 静态成员的推断
- 局部变量的推断：根据初始化推断
- 类成员的推断：

尽管类型推断一直存在，但是如果推断的结果与开发者的意图不符合，还是应该使用显示的类型注解。

### 类型安全

Dart 的类型安全基于静态类型检查和运行时检查，二者确保变量值于变量的类型匹配。

- 静态类型分析能的使用 Dart 的静态分析器在执行前找出显著的类型安全错误。

- 运行时检查能使用 Dart VM 和 dartdevc 等工具来处理静态分析器无法捕获的安全问题。

```dart
void main() {
  var list = new List<TempFile>.from(
      [new TempFile(), new BankAccount()]);
  cleanUp(list);
}
void cleanUp(List<TempFile> files) =>
    files.forEach((f) => f.delete());
class TempFile {
  void delete() => print('TempFile deleted.');
}
class BankAccount {
  void delete() => print('BankAccount deleted. Whoops!');
}
// 静态分析其无法捕获这个异常
```

### Dart 不支持函数重载


由于 Dart 中类型不会影响语义，也不会改变 Dart 代码的行为，因此函数重载也无法在 Dart 中实现，可选的代替方案是：

1. 使用 dynamic 类型参数接收并使用 is 语句进行类型检查。
2. 为每一个不同的函数提供不同的函数名称。

```dart
class Foo {
  void bar() => print('bar()');
  void bar(String name) => print('bar($name)');
  void bar(int number) => print('bar($number)');
}

void main() {
  dynamic foo = new Foo();
	

  // OK
  foo.bar();

  // Runtime error: Ambiguous dispatch. 2 or more implementations of `bar` exist.
  foo.bar('Hello');
}
```
> 参见 Dart 官方对函数重载的解释 [https://github.com/dart-lang/sdk/issues/26488](https://github.com/dart-lang/sdk/issues/26488)


Dart 的类型声明通常情况下只发挥了注解的功能：能够为阅读代码的人提供类型的的注释

```dart
int i ;
int j = 0;
sum(a,b) => a+b;

void main(){
  print(sum(i,j));
}
// These code will cause : NoSuchMethodError: The method '+' was called on null.
```
这是由于变量 i 在不进行初始化的时候分配了 null 值，此时 Null 类并没有对 + 操作符进行重载。

### 类型检查

Dart 2 的更新是加入了类型推断机制

通常来讲，一些事件会触发 Dart 的类型检查机制。

- 执行复制操作
- 传递实参给函数
- 函数传递一个返回值


```dart
class Animal{
}
class Cat extends Animal{
  Cat(this.say);
  String say = "miao";
}

void main(){
  List<Animal> animals = [new Animal(),new Cat("1"),new Cat("2")];
  //  This statement will not cause an exception.
  //  We dont need a cast to state the type of animal[2];  
  Cat cat  = animals[2];
  print(cat.say);
  try{
    Cat anotherCat = animals[0];
  }catch(e){
    print(e.toString());
  }
}
```

