---
title: JVM 基础
date: 2020-08-14 01:18:48
tags: [Java,JVM]
---

### Java 基础


### Object 

equals 方法通常情况下是地址比较。

```java
public boolean equals(Object obj){
    return (this == obj);
}
```

hashCode 方法，用于 HashMap & HashTable;

equals 为 true 的两个对象需要有 hashCode 相等，否则会出现执行上的问题。



### static, final  

static 修饰静态成员，成员只属于类而不是对象。
final 声明成员变量，方法，类以及本地变量：对于变量为改变，对于方法为不可重写，对于类为不可继承，多线程安全

### String、StringBuffer、StringBuilder

String 具有 final 性质。
StringBuffer 线程安全。 
StringBuilder 线程不安全，单线程速度更快。 

### Throwable、Exception、Error

Exception & Error 是 Throwable 的子类。
Error 是虚拟机抛出，无法捕捉；Exception 是 Java 抛出，通常是逻辑上应该捕获并处理的漏洞。
try-catch-finally 中 finally 必然执行。 


### 多态

父类引用指向子类的对象；
子类重写父类的方法；
父类引用无法调用子类的新特性；

### abstract、interface

抽象类无法实例化
非抽象子类需要实现所有抽象方法；
接口属性默认为 public static final 
接口方法默认为 public abstract 

