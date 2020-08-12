---
title: 设计模式总诀篇
date: 2020-08-13 03:19:48
tags: 设计模式
---

### 设计模式总诀篇

> 设计模式是让代码更健壮，更容易理解，拓展和维护的法门。

设计模式的指导思想正是六大设计原则。

<!--分割线-->

<!--more-->


### 六大设计原则

1. 单一职责原则（约束类的粒度）
2. 里式替换原则（约束类的继承关系）
3. 依赖倒置原则（约束细节与抽象的依赖关系）
4. 接口隔离原则（约束接口的粒度）
5. 迪米特法则（约束类之间的耦合度）
6. 开闭原则（约束设计以应对需求变化）

> KISS，SOLID，YAGNI

### 单一职责原则（Single Responsibility Principle，SRP）

一个类自身只负责完成一个职责或功能。（只存在一个变化原因）

> A class or module should have a single responsibility

1. 职责单一的依据是什么？

   - 代码行数
   - 依赖的类
   - 私有方法过多
   - 难以命名类名
   - 类方法集中操作类中的几个对象

2. 类的职责越单一越好吗？

   不是的。
   单一职责原则的用意是在于提高类的内聚性，减少类之间的耦合性。拆分的过细会将具体逻辑分散到不同类中，反过来降低了内聚性和可维护性。

3. 如何做到单一职责？

   - 避免过多的代码行数、函数或属性
   - 避免依赖过多其他类
   - 对于粗粒度的类，当类的功能持续增长时，应当持续重构拆分为粒度更小的类
   - 对于细粒度的类，避免过度设计，不必要人为增加系统的复杂性

### 里式替换原则（Liskov Substitution Principle，LSP）

所有引用基类的地方必须能透明的使用其子类的对象。换言之，子类对象能替换程序中父类对象出现的任何地方，并且保证原来程序的逻辑性为不变及正确性不被破坏。

> Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.

1. 里式替换原则和多态有什么区别？

   - 多态是 OOP 的一大特性，借由不同的子类达到不同实现效果。
   - 里式替换是要求子类的设计要在保证替换父类时，不改变原程序的逻辑和正确性。

2. 如何做到遵循里式替换原则？

   只要子类完美继承父类的设计初衷，一般来说我们都不会违反里式替换原则。
   尽量避免以下情况：
   - 子类违背父类声明的功能；
   - 子类违背父类对输入、输出、异常的约定
   - 子类违背父类注释的说明

### 依赖倒置原则（Dependency Inversion Principle，DIP）

高层模块不应当依赖底层模块，两者都应该依赖于抽象。抽象不要依赖于具体细节，具体细节依赖于抽象。

> High-level modules shouldn't depend on low-level modules. Both modules should depend on abstractions. In addition, abstractions shouldn't depend on details. Details depend on abstractions.

1. 如何理解依赖倒置呢？

   依赖倒置原则其实就是类或者模块之间都依赖于抽象，这种抽象的本质就是通过对象的行为能力而非行为的行为细节去约束对方。一旦当对象 AImpl 依赖于另一个对象 BImpl （BImpl implements IB）而非其抽象 IB 时，对象 A 就失去了兼容（T implements IB）的能力。

2. 对象如何传递依赖

   - 构造函数传递依赖对象
   - setter 方法传递依赖对象
   - 接口声明对象

### 接口隔离原则（Interface Segregation Principle，ISP）

客户端不需要被强迫依赖不需要的接口。

> Clients should not be forced to depend upon interfaces that they do not use.

1. 如何做到接口隔离？

   - 一个接口只服务于一个子模块和业务逻辑（满足单一职责原则）
   - 接口高内聚，提高处理能力而减少对外交互
   - 控制接口设计的粒度

2. 接口隔离原则与单一职责原则的区别

   - 单一职责针对模块、类、接口的设计；接口隔离原则侧重接口设计
   - 接口隔离原则是接口满足单一职责的判断依据

### 迪米特法则（Law of Demeter）

类的关系应当做到“高内聚，松耦合”。

> Each unit should have only limited knowledge about other units: only units "closely" related to the current unit.

1. 如何理解“高内聚，松耦合”?

   - 高内聚：相近的功能应该放到同一类中，不相近的功能不要放到同一个类中。
   - 松耦合：类和类之间的依赖关系简单清晰，类的职责单一

2. 如何理解迪米特法则？

   - 不该有直接依赖关系的类，不要有依赖
   - 有依赖关系的类直接，尽量只依赖必要的接口
   - 目的是为了减少类的耦合，让类更加独立。

### 开闭原则（Open Closed Principle）

一个软件实体应当对扩展开放，对修改关闭。

> Software entities should be open for extension, but closed for modifications.

1. 如何理解对扩展开放，对修改关闭

    添加新功能应该尽可能在原有基础上扩展代码，而非修改已有的代码。面对需求变更，修改是必然的，因此开闭原则的期望是让修改更少更集中，让核心和复杂逻辑满足开闭原则。

2. 如何做到对扩展开放，对修改关闭

   需求变更是软件开发过程中的必然事件，编写代码应该注意扩展意识、抽象意识、封装意识。设计代码架构的同时可以预留扩展点，以便在细小代码改动的情况下应对需求变更。





