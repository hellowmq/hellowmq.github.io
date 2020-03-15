---
title: Dart-类成员的初始化
date: 2019-05-12 23:45:23
tags: Dart
---

### Dart 类成员的初始化

Dart 类成员的初始化有四种方式：
- 声明时进行初始化；
- 在构造函数为变量指定初始化的实例成员；
- 使用初始化列表（初始化列表在进入构造函数之前进行）；
- 非 final 成员可以使用在构造函数内部进行初始化（这会调用 setter 方法）；

<!--more-->

```dart
class Animal{
//   1. initialize at the declaration
  num age = 1;
//   2. assign variable in the constructor
  num leg;
  Animal(this.leg);
}

class Plant{
//   3. use the initialozer list
  num weight;
  num height;
  Plant(weight,height):this.weight = weight,this.height = height; 
}

class Human{
//   4. no-final variable can be initialize in the constructor. 
  final String name;
  num age;
  Human(name,age):this.name = name{
    this.age = age;
  }

//     The constructor below will casue a compile error because a final variable do not have a setter.
//     this.name = name;
//   Human(name,age){
//     this.age = age;
//     this.name = name;
//   }
  
}

void main (){
  Animal animal = new Animal(4);
  Plant plant = new Plant(1,2);
  Human human = new Human("Tom", 14);
}
```
[在 DartPad 运行此代码](https://dartpad.dartlang.org/4cfa1f2b78ccbff316c43a0c76fbd042)

特别地 final 实例成员变量必须进行初始化，并且无法被赋值（这要求该成员需要一个 setter 方法）。因此 final 成员必须使用 前三种方式进行初始化。

 	