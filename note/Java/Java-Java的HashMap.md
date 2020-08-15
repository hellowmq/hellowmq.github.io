---
title: Java HashMap
date: 2020-08-14 12:27:55
tags: [Java]
---

### Java HashMap



<!--分割线-->

<!--more-->


### HashMap 的工作原理

HashMap 基于 hashing 原理，通过 put 和 get 方法存取。
put 方法计算 key 的 hashCode，然后找到 bucket 位置存储 Entry 对象；当 hashCode 相同时，此时指向的 bucket 相同，也就是发生了哈希冲突。Entry 存储在链表，逐个通过 key 的 equals 方法找到正确的键值对。


1. 如果 HashMap 的大小超过了负载因子定义的容量？

默认负载因子大小为 0.75。扩容时两倍扩容 bucket 数组，把原有对象放入新的 bucket 数组，进行 rehashing. 

2. 为什么 String、Integer 适合作为 key

String 是 final 性质的，具有不可变性immutable。 重写了 hashCode 和 equals 方法


3. HashMap 初始容量，长度扩容的比例？

初始容量 16，容量总要求是 2 的幂次方，因此每次扩容为原来的 2 倍；
此外，计算 bucket 位置时允许通过与运算替换传统的取模思想，来加速运算寻找位置

```java
static int indexFor(int h, int length{
    return h & (length-1);
}
```


#### HashMap 与 HashTable 对比

HashMap 是非 synchronized 的，性能更好，HashMap 可以接受为 null 的 key-value；
而 HashTable 线程安全，比 HashMap 要慢，不接受 null 的 key-value。