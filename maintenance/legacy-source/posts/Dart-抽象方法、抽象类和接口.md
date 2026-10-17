---
title: Dart-抽象方法、抽象类和接口
date: 2019-05-11 09:26:07
tags: Dart
---



### 抽象方法、抽象类和接口

> - 抽象方法是只提供声明不提供实现方法的方法，只能存在于抽象类中。
> - 抽象类是包含有抽象方法的类，需要使用 abstract 关键字来修饰，无法实例化。
> - 接口是一个抽象类型，是抽象方法的集合。类通过实现接口的方式从而继承接口的抽象方法。

<!--more-->

```dart
// A abstract class has more than one abstract method
abstract class Animal{
    // A abstract method has no implementation. 
    move();
    // Abstract can be getter or setter. 
    get age();
    set eat();
}
```

抽象方法可以是普通方法，也可以是 getter 、setter 方法。抽象方法不需要给出具体实现，而是将实现交给其他类。抽象方法意味着方法仅在运行时可用。

抽象类是使用关键字 abstract 进行修饰的类。一旦使用 abstract 进行修饰，类就被赋予了无法实例化的特性。

以上的抽象类仅提供了抽象方法，并不包含具体实现，因此本质上这就是一个接口。Dart 语言中，每个类都隐式定义了接口，该接口包含该类的所有实例成员（显然不包括静态成员和构造函数）及其实现的任何接口，只要使用 implements 子句声明需要实现的接口，而无需建立继承关系。

```dart
// Any class have a implicit interface
class Animal{
// all instance members are in the interface
  final weight;
  void doSomething(){ print("My weight is : " + this.weight);}
// other menbers are not in the interface
  Animal(this.weight);
}

class Cat implements Animal{
// all members in the interface should be implemented
    get weight => "Cat's weight";
    void doSomething(){ print("Cat a mouse. ");}
}

void main(){
  Animal animal = new Animal("123");
  animal.doSomething();
  Cat cat = new Cat();
  cat.doSomething();
}
```

在实际上，我们通常会使用抽象类来完成习惯意义上的接口。

[在 DartPad 运行此代码](<https://dartpad.dartlang.org/0f918428f5f7a3b5aa81f785bcf1d0cc>)

