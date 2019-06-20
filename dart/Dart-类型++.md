---
title: Dart-类型
date: 2019-06-16 05:57:14
tags:
---

Dart 类型


Dart 中不存在根据类型进行函数重载的可能，可选的代替方案是：

1. 使用 dynamic 类型参数接收并使用 is 语句进行类型检查。
2. 为每一个不同的函数提供不同的函数名称。
3. 

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
这是由于 i 在不进行初始化的时候分配了 null 值，此时 Null 类并没有对 + 操作符进行重载。



Dart 的类型是接口类型


通常来讲，一些时间会触发 Dart 的类型检查机制。

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