---
title: Dart-命名构造函数
date: 2019-05-14 17:28:46
tags: Dart
---

### Dart 命名构造函数

> 构造函数既可以与是默认构造函数（函数名与类名同名，最多存在一个），也可以是命名构造函数（函数名以类名.标志符出现）。
> 在 Dart 开发者本身没有显示提供构造函数时，编译器会自动创建一个无参数的构造函数。需要更多构造函数时就需要命名构造函数来进行实现。

<!--more-->

```dart
// Dart developer can user named constructors to create more than one constructors.
class Person {
  int age;
  String name;
//   This is a default constructor. If devloper don't provide, it will produce one with do nothing.
  Person(this.age, this.name);
//   Thie is a named constructor. 
  Person.clonePerson(Person person) {
    this.age = person.age;
    this.name = person.name;
  }
  void selfIntrduction() => print("I'm $name. I'm $age years old");
}

void main() {
  Person personBob = new Person(17, 'Bob');
  Person anotherBob = new Person.clonePerson(personBob);
  anotherBob.selfIntrduction();
}

```
[在 DartPad 运行此代码]()

> 事实上 Person.clonePerson() 的作用相当于复制构造函数。这个方法创造并返回了一个 personBob 的副本。我们可以来看一下以下这个有趣的栗子🌰

```dart
class Person {
  int age;
  String name;
  Person(this.age, this.name);

  Person.clonePerson(Person person) {
    this.age = person.age;
    this.name = person.name;
  }
  
  void selfIntrduction() => print("I'm $name. I'm $age years old");
}

void main() {
  Person personBob = new Person(17, 'Bob'); 
//   shadowOfBob is not real Person because it just point to personBob.
  Person shadowOfBob = personBob;
//   anotherBob is an real Person and his change will not have any effect on personBob.
  Person anotherBob = new Person.clonePerson(personBob);
	personBob.selfIntrduction();
  shadowOfBob.age++;
  print("shadowOfBob.age add 1;");
  personBob.selfIntrduction();
  print("personBob have been accessed by shadowOfBob. = operator can not create an object. ");
  anotherBob.age++;
  print("anotherBob.age add 1");
  personBob.selfIntrduction();
}

```
以上程序提供了一个复制构造函数的实现，由于 = 操作符创建的是对象的引用，本身不具备创建对象的功能并且无法被重载。因此一旦对象本身需要创建大量的副本，开发者就需要显式地提供复制构造函数。