---
title: 单例模式
date: 2020-07-30 22:44:10
tags: 设计模式
---

### 单例模式

起源于剑指 Offer 面试题-2 设计单例模式

这里整理三种高效的方式。

<!--分割线-->

<!--more-->

> 题目：设计一个类，我们只能生成该类的一个实例。

为了兼顾性能，线程安全和懒加载，这里给出三种实现


### 解法一：使用双检查加锁

```java
/**
 * 线程安全
 * 双检查锁机制保证性能
 * 延迟初始化
 */
public static class DoubleLockSingleton {
    public volatile static DoubleLockSingleton _instance;

    public DoubleLockSingleton() {
    }

    public static DoubleLockSingleton getInstance() {
        if (_instance == null) {
            synchronized (DoubleLockSingleton.class) {
                if (_instance == null) {
                    _instance = new DoubleLockSingleton();
                }
            }
        }
        return _instance;
    }
}
```
### 解法二：静态内部类

```java
    /**
     * 代码简洁
     * 延迟初始化
     * 线程安全（类初始化锁）
     */
    public static class InnerClassSingleton {
        public InnerClassSingleton() {
        }

        public static InnerClassSingleton getInstance() {
            return InnerClassSingletonHolder._instance;
        }

        public static class InnerClassSingletonHolder {

            public static final InnerClassSingleton _instance = new InnerClassSingleton();
        }
    }

```
### 解法三：枚举单例

```java
    /**
     * 线程安全（类初始化锁）
     * 代码更加简洁
     */
    public enum EnumSingleton {
        INSTANCE;

        public void doSomething() {
            //todo doSomething
        }
    }
```

[以上三种写法的 Gist 地址](https://gist.github.com/hellowmq/be0aeac500cc906f1fb38830949913b5)

---

结合个人经历，这个问题绝对是面试必考。

>  即使面试官不问，也可以从设计模式，Java 并发旁敲侧击。

别的不说，单单一个双重检查锁的原理，就可以写出一篇完整的文章。从编码逻辑，设计模式到 Java 并发原理，计算机组成。

- 第一个 null 检查
  - 为了性能，不初始化就不需要加同步锁
- 第二个 null 检查
  - 为了安全性，防止重复初始化
- synchronize 的效率
  - 针对初始化的并发安全
    - 原子性
    - 可见性
    - 有序性
- volatile 为什么必选 
  - 要求可见性和有序性
    - 可见性保证操作数（引用）的安全性
    - 有序性保证初始化的安全性
  - 不具备原子性

至于静态内部类和枚举类的并发安全，这也可以从 ClassLoader 发问。

通常情况，只要把这套原理讲清楚，面试的过程可以水到渠成。


