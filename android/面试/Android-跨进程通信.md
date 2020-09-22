---
title: Android 跨进程通信
date: 2020-09-22 23:00:01
tags: [Android, IPC]
---

### 跨进程通信

### Android 进程和线程的关系

在 Android 中，进程一般来说对应一个程序或者应用；线程是 CPU 调度的最小单元。

App 至少有一个进程，主线程只有一个，子线程可以有很多。


### 使用多进程

AndroidManifest 中声明 android:process 可以为四大组件指明进程。

### 多进程的问题

内存空间完全隔离，属于不同的 Dalvik 虚拟机。因此可以通过多进程获取更大的内存空间，可以暴露部分进程为共享。

- 静态成员和单例模式完全失效；
- 线程同步机制也失效
- SharePreference 多进程读写文件，数据会丢失；
- Application 会多次创建，一个进程会有一个 application

### 几种 IPC 方式


| 方式  | 优点 | 缺点 | 使用场景 |
| - | - | - | -|
| Intent  | 易用 | 有容量限制，Parcelable 类型 | Activity, Service, Receiver |
| 文件共享  | 易用，直接读写外部文件 | 并发读写 | 无并发访问，数据同步要求不高 |
| Messenger | 基于 AIDL，支持一对多串行通信 | 不适合高并发，不支持 RPC，Parcelable 类型 | 低并发，无 RPC 需求 |
| AIDL  | 功能强大，mmap，一次复制，支持一对多并发 | 使用方式复杂，并发需要线程同步 | 一对多且有 RPC 需求 |
| ContentProvider  | 支持一对多并发数据共享，可通过 Call 方法 | Binder 和 AIDL 的另一个封装 | 一对多的进程间数据共享 |
| Socket  | 通过网络传输字节流，支持一对多并发实时通信 | 不支持直接 RPC | 网络数据交换 |


### AIDL （Android Interface Definition Language）

AIDL 会生成服务端对象的跨进程的代理引用

- AIDL 接口：继承一个约定的 Interface。
- Stub 类：Binder 的实现类，服务段用于提供服务。
- Proxy 类：服务端的本地代理，客户端通过这个类调用服务端方法。
- asInterface()：将 Binder 对象转为约定的 Interface 对象，Stub 或者 Proxy
- asBinder()： 返回代理 Proxy 的 Binder 对象
- onTransact()：服务端的处理方法
- transact()：客户端的发起方法

### Binder 






























