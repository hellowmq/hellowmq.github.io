---
title: Java 多线程入门
date: 2020-09-14 01:18:48
tags: [Java, Thread]
---

### Java 进程与线程


### 进程和线程

- 进程：进程是系统运行程序的基本单位。独立占用系统资源。
- 线程：比进程更小的执行单位，同个进程的线程共享同一块内存空间和系统资源。
- 进程之间是独立的，不进行 ipc 的进程没有耦合关系；线程之间的关系更为紧密


### 使用多线程

为提供 Thread 提供 Runnable 执行体。通过创建子类对象并执行 start 方法可以让子线程进入 runnable 状态。

### 实例变量和线程安全





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

