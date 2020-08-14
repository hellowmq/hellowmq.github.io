---
title: Java 集合
date: 2020-08-14 12:27:55
tags: [Java]
---

### Java 集合（Collection）



<!--分割线-->

<!--more-->




### Vector、ArrayList、LinkedList

三者都是 List 的实现，逻辑上是一个有序集合。提供按照位置进行访问、添加或者删除的操作、提供迭代器以遍历内容。

- Vector 是 Java 早起提供的**线程安全的动态数组**。如果不需要线程安全不建议选择，这会带来性能开销。存在自动扩容机制，可以控制扩容的因素，数组已满会拷贝原有的数组数据。
- ArrayList 是应用更加广泛的动态数组，线程不安全，性能更好。存在自动扩容机制，自动扩容 50%，数组已满会拷贝原有的数组数据。
- LinkedList 是 Java 提供的双向链表，不需要扩容，线程不安全。

补充：
- Vector 和 ArrayList 的底层实现都是动态数组，内部元素是数组，随机访问效率高，插入删除效率低。
- LinkedList 进行节点插入、删除高效，但随即访问效率会下降。


### Collection（集合）

- List：有序集合，保留访问、插入、删除等操作；
- Set：不允许重复元素（equals 方法）
- Queue / Deque：标准队列结构，支持 FIFO、LIFO


TreeSet

- TreeSet 支持自然顺序访问，但是添加、删除、包含等操作要相对低效（log(N)时间）。
- HashSet 则是利用哈希算法，可以保证常数时间的添加、删除、包含操作，不保证有序。
- LinkedHashSet，内部构建了一个记录插入顺序的双向链表，允许根据插入顺序遍历，常数时间开销，性能略低于 HashSet。

HashSet 性能受自身容量影响，容量大小影响散列冲突概率；而内部链表提供方便，遍历性能只和元素多少有关。
 



集合：就像是一种容器。用于存储、获取、操作对象的容器。

1. 数组的弊端
①数组的长度不可变 ②数组没有提供可以查看有效元素个数的方法

2. 集合的特点
①集合的长度是可变的
②集合可以存储任意类型的对象
③集合只能存储对象

3. 集合框架
java.util.Collection : 集合层次的根接口
    |--- java.util.List: 有序的，可以重复的。
        |--- ArrayList: 采用数组结构存储元素。 查询操作多时选择
        |--- LinkedList: 采用链表结构存储元素。 增删操作多时选择
        |--- Vector:
    |--- java.util.Set: 无序的，不允许重复。
        |--- HashSet : 是 Set 接口的典型实现类。
            判断元素是否存在的依据是：先比较 hashCode 值，若 hashCode 存在，再通过 equals() 比较内容
                                     若 hashCode 值不存在，则直接存储

            注意：重写 hashCode 和 equals 二者需要保持一致！
            |--- LinkedHashSet: 相较于 HashSet 多了链表维护元素的顺序。遍历效率高于 HashSet ， 增删效率低于 HashSet
        |--- TreeSet : 拥有自己排序方式
            |-- 自然排序（Comparable）：
                ①需要添加 TreeSet 集合中对象的类实现 Comparable 接口
                ②实现 compareTo(Object o) 方法
            |-- 定制排序（Comparator）
                ①创建一个类实现 Comparator 接口
                ②实现 compare(Object o1, Object o2) 方法
                ③将该实现类的实例作为参数传递给 TreeSet 的构造器


### Map

- HashTable 是 Java 类的一个哈希表实现，本身是同步的，不支持 null 键和值，由于同步导致的性能开销，很少推荐使用。
- HashMap 是使用广泛的哈希表，可以常数时间 put & get。
- TreeMap 是基于红黑树的一种顺序访问的 Map，和 HashMap 不同，其 get、put、remove 操作都是 log N 时间复杂度，具体顺序可以用指定的 Comparator 来决定。

其中使用了 Map 的前提是：

- equals 相等，hashCode 一定相等
- 重写了 hashCode 也要重写 equals
- hashCode 需要保持一致性，状态改变返回的哈希值仍然要一直一致。
- equals 的对称性、反射、传递等特性


### HashMap 源码分析

- HashMap 的内部实现

由数组和链表结合的复合结构，数组被分为一个个桶，通过哈希值决定键值对在这个数组的寻址；  
哈希值相同的键值对（冲突），则以链表形式存储；  
如果链表的大小大于阈值 8 ，会被改造为树形结构。

容量


