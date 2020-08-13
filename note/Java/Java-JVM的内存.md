---
title: JVM 运行时数据区
date: 2020-08-14 00:13:19
tags: [Java]
---

### JVM 运行时数据区

- 运行时数据区域
    - 程序计数器 （字节码寻址的索引）
    - Java 虚拟机栈（栈内存，存储局部变量，操作数栈）
    - 本地方法栈（Native 方法的栈内存）
    - Java 堆（线程共享的区域，用于存放对象实例，GC 的核心区域，可以物理上不连续）
    - 方法区（线程共享区域，已被虚拟机加载的类信息、常量、静态变量、JIT 代码）
    - 运行时常量池（编译器生成的字面量和符号引用）
    - 直接内存（用于提高 NIO 性能）


<!--分割线-->

<!--more-->




### 程序计数器（Program Counter Register）

控制线程字节码的寻址索引。
- Java 方法 -> 虚拟机字节码指令的地址
- Native 方法 -> 空值

每个线程私有各自维护。
JVM 中唯一没有规定 OOM 的区域。

### Java 虚拟机栈（Java Virtual Machine Stacks）


线程私有，Java 方法的运行栈，存放局部变量表，操作舒展，动态链接，方法出口。

局部变量表：存放基本数据类型，对象引用和 returnAddress。

- StackOverflowError 线程的栈深度大于虚拟机允许深度
- OutOfMemoryError 无法申请足够的内存


### 本地方法栈（Native Method Stack）

为 Native 方法提供 Stack

存在 StackOverFlowError & OutOfMemoryError

### Java 堆（Java Heap）

Java 虚拟机中最大的区域，线程共享用于存放对象实例。

- Java 堆是 GC 管理的主要区域，基本使用分代收集算法，内存回收角度可以细分为：新生代和老年代。
- 内存分配角度：可以划分线程私有的分配缓冲区

### 方法区（Method Area）

方法区线程共享，用于存储被被虚拟机加载的类信息，常量、静态变量、JIT 代码

包含了运行时常量池，含有类相关描述信息

存在 OOM 异常；


 


