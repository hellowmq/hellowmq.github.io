---
title: Dart-Equal-Explore
date: 2019-05-10 04:40:48
tags: Dart
---

### Dart中的相等判别

> 在 Dart 的公共基类 Object 类中，== 操作符调用 dart:core 的 identical() 方法，判别的依据是左右操作数是否为同一个对象，与一般情况下的相等有所区别；开发者在使用 == 进行判别时应当根据自身需要对 == 操作符和 hashCode 字段进行覆盖重写。

<!--more-->

### 相等的定义

相等在数学上的定义中有一些性质：

- 自反性：对于任意量 a 而言，都有 a = a；
- 对称性：对于任意量 a 和 b 而言，如果 a = b，则 b = a；
- 传递性：对于任意量 a, b 和 c 而言，如果 a = b 且 b = c，则 a = c；

在 Dart 语法中，所有对象都是 Object 类的子类。Object 类当中的 == 方法当且仅当该对象与另一对象是同一对象时返回 true，否则返回 false；因此每个对象沿用了父类的 == 方法。

在 Object 类中，存在 [runtimeType](https://api.dartlang.org/stable/2.3.0/dart-core/Object/runtimeType.html) 和 [hashCode](https://api.dartlang.org/stable/2.3.0/dart-core/Object/hashCode.html) 两个字段，在不同的对象中，hashCode 不相同

即使覆盖了 Object  对象中的 == 方法，hashCode 值也不会相同

作为开发者应当同时覆盖 hashCode 和 == 方法。



```dart
// When developer override the [==] operator, the [hashCode] property can be different, so that developer should override these properties at the same time. 
// == 操作符和 hashCode 字段应当同时被覆盖。
class Animal {
  int value;
  Animal([int value = 0]) {
    this.value = value;
  }
  operator ==(animal) =>
      (animal is Animal && animal.value == this.value) ? true : false;
  get hashCode => this.value;
}

class Cat {
  int value;
  Cat([int value = 0]) {
    this.value = value;
  }
  get hashCode => value;
}

class Dog {
  int value;
  Dog([int value = 0]) {
    this.value = this.value;
  }
  operator ==(dog) => (dog is Dog && this.value == dog.value) ? true : false;
}

void main() {
  Object object1 = new Object();
  Object object2 = new Object();
  print(object1==object2);
  print("object1.hashCode: " +
      object1.hashCode.toString() +
      "\nobject2.hashCode：" +
      object2.hashCode.toString());
  print(identical(object1, object2));
  print('');
  
	Cat cat1 = new Cat(1);
	Cat cat2 = new Cat(1);
  print(cat1 == cat2);
  print("cat1.hashCode: " +
      cat1.hashCode.toString() +
      "\ncat2.hashCode：" +
      cat2.hashCode.toString());
  print(identical(cat1, cat2));
  print('');
  
	Dog dog1 = new Dog(1);
	Dog dog2 = new Dog(1);
  print(dog1==dog2);
  print("dog1.hashCode: " +
      dog1.hashCode.toString() +
      "\ndog2.hashCode：" +
      dog2.hashCode.toString());
  print(identical(dog1, dog2));
  print('');
  
	Animal animal1 = new Animal(1);
	Animal animal2 = new Animal(1);
  print(animal1==animal2);
  print("animal1.hashCode: " +
      animal1.hashCode.toString() +
      "\nanimal2.hashCode：" +
      animal2.hashCode.toString());
  print(identical(animal1, animal2));
  print('');
  
// Specially，you may find the output below show that identical(animal1,animal3) return true. That is because animal1 and animal3 are essentially the same object. The reference of first 'new Animal(1)' was assigned to animal1 and animal3 by the = operator, so that animal1 and animal3 point to the same object.
  Animal animal3 = animal1;
  print(identical(animal3, animal1));
  print(animal1.value);
  animal3.value = 2;
  print(animal1.value);  
  print(identical(animal3, animal1));
}

```



[在 DartPad 运行此代码](https://dartpad.dartlang.org/11f88dc36b684c6f4ff33a23b56b2fba)

开发者需要谨慎地同时重写 == 操作符和 hashCode 字段，在一般情况下 Object 的 == 操作符绑定了 dart:core 的 identical() 方法，该方法的作用是判断左右值是否为同一对象。特别地，即使开发者同时重写了 == 操作符和 hashCode  字段，identical 方法在判别两个字段相同的实例时仍然会返回 false（本质上，完全相同的两个对象也具有不同的地址；identical 方法只在对象引用指向同一内存时返回 true 如 animal1 和 animal3，该方法针对的是同一个对象）。 