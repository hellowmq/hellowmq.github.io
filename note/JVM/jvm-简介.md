---
title: JVM-简介
date: 2020-09-27 14:18:14
tags: [JVM]
---

### JVM 简介

Java 编程语言是通用的、并发的、面向对象。Java 虚拟机是 Java 平台的运行基础。

> 本文是 JVM 规范的阅读的入门篇。参考的文档是 [The Java® Virtual Machine Specification
Java SE 8 Edition](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-1.html#jvms-1.1)

<!--分割线-->

<!--more-->


### 什么是 Java 虚拟机？

Java 虚拟机（`Java Virtual Machine`）是一个抽象的虚拟机。与很多编程语言的实现相同，Java 虚拟机同样具有相应的指令集和内存区域。

尽管 JVM 成为 Java 虚拟机，但是 Java 虚拟机完全不关注 Java 编程语言，而是只能处理 `class` 文件的字节码文件。Java 作为高级程序语言，抽象程度高，因此需要转换成虚拟机能识别的虚拟机指令才能在虚拟机中运行。


### Java 虚拟机支持哪些语言？

Java 虚拟机目前已经脱离了 Java 虚拟机的束缚，现代的 Java 虚拟机只依赖于 `class` 文件，因此许多编程语言都可以编译成 `class` 文件以支持在 Java 虚拟机上运行。

目前主流的语言有：Java、Kotlin、Scala、Groovy等

### Java 虚拟机如何运行字节码？

1. 将 `class` 文件加载到虚拟机，加载的类存放在方法区（Method Area）
2. 字节码翻译成机器码，HotSpot 中有解释执行和及时编译。

### 为什么需要虚拟机？

用虚拟机的作为执行字节码的平台，在设计模式上其实就是一种适配器的模式，只需要在不同的平台的虚拟机的实现即可。这样一来，基于 Java 虚拟机的字节码都具有了跨平台的运行的能力。

### 总结

Java 编程语言是运行在 Java 虚拟机上的。Java 虚拟机解决了 Java 代码托管和内存管理这类繁琐的事务。




