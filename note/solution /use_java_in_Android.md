---
title: 在 Android studio 中运行 Java
date: 2020-04-22 20:06:35
tags: java android 
---

### 在 Android studio 中运行 Java

作为 Android 开发者，尽管很多时候对于 Java 比较熟悉，但是也免不了要独立测试一些纯 Java 的代码。然而对于默认的运行方式 APP，Android Studio 会执行相应的打包程序，因此对于短暂测试而言效率实在不高。

<!--分割线-->

<!--more-->

### 先决条件

独立运行的 Java 类中需要具有静态 main 方法。

```java
public class MainClass {
   public static void main(String[] args) {
       System.out.println("ok");
   }   
}
```
### 两种方法

#### 方法一：直接依赖 Android Studio 运行 java 文件

- 右键单击类文件，选择 Run 'MainClass.main()' 运行。
- 点击类或者 main 方法行号后的绿三角，选择 Run 'MainClass.main()' 运行。

#### 方法二：创建 Java module

方法一比较直接，但是对于原本的项目有侵入性。处于这个情况，可以通过修改启动方式将测试代码分离。

1. 新建 Java Library 
2. 选择运行的 Edit Configurations 
3. 新建模板类型为 Application 的运行方式
4. 修改 Use class of module 为新建的 Module
5. 修改 Main Class 为指定的类。

> 该方法相对而言将测试代码独立于原有项目，并且同样可以独立运行指定的类，相比于方法一而言自然优雅了许多




























