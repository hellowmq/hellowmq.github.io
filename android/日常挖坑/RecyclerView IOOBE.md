---
title: RecyclerView IOOBE 
date: 2019-8-26 16:45:10
tags: android
---

### RecyclerView IOOBE 

使用 RecyclerView 时加载动态数据时，有时候会遇到难以定位，不可预见的 IOOBE（数组越界）。

> java.lang.IndexOutOfBoundsException: Inconsistency detected. Invalid view holder adapter positionViewHolder{3aebd17 position=6 id=-1, oldPos=-1, pLpos:-1 no parent} 

<!--分割线-->

<!--more-->

结论：**这个数组越界是由于 RecyclerView 本身不具备数据实时同步所导致的。**

### 复现这个问题？

这个问题一开始难以处理的原因在于：这个问题会在直接导致数组越界而难以定位至问题出现位置。

最小的一个例子应当是这样
```java
data.clear();
data.loadMore();
adapter.notifyItemRangeChange(0, data.size());
```

### 问题成因

数据经过了多次改动而实际上 recyclerView 没有做到实时同步。notifyDataSetChange() 

### 简单粗暴的解决方案

重写 LayoutManager 的 onLayoutChildren 方法，在 LayoutManager 中捕获 IOOBE 异常。

```java
mLinearLayoutManager = new LinearLayoutManager(mContext) {
            @Override
            public void onLayoutChildren(RecyclerView.Recycler recycler, RecyclerView.State state) {
                try {
                    super.onLayoutChildren(recycler, state);
                } catch (IndexOutOfBoundsException e) {
                    TSDKLog.e(TAG, "meet a IOOBE in RecyclerView");
                }
            }
        };
```
> 该解决方案来源于 [StackOverflow](https://stackoverflow.com/a/33822747/11841203).

该回答中提及，这个问题是 Android 官方的一个固有问题。

### try-catch 真的完美吗

实际上对于这种解决方案，Google 程序员的说法： 

> don't do that! Something else is wrong in your code that needs fixing and by doing that, you are leaving RecyclerView in an inconsistent state, it is very likely that RV will keep crashing from then on because it lost its state.
> 不要那样做！ 你的代码中需要修复的其他东西是错误的，通过这样做，你将使RecyclerView处于不一致的状态，很可能RV会从那时起继续崩溃，因为它失去了状态。



> this was happening to me when I run the recyclerViewAdapter.notifyItemInserted on the main thread, while, at the same time there is insertion of adapter list in the background thread, which causes inconsistency between what indexes are being inserted, making the recyclerview confuses about this. For example, when the adapter list wants to insert an item at index 10, the UI thread notifies this insertion at 10, but, since the background thread is faster (from my case) that the UI thread, the background thread will insert another values, while at the same time the UI thread is still in notifying the recyclerview about the insertion. 
> 当我在主线程上运行 recyclerViewAdapter.notifyItemInserted 时发生这种情况，同时在后台线程中插入了适配器列表，这导致插入哪些索引之间的不一致，使得 recyclerview 对此感到困惑。 
> 例如，当适配器列表想要在索引10处插入项时，UI线程在10处通知此插入，但是，由于后台线程更快（从我的情况）到UI线程，后台线程将插入另一个值。
> 同时，UI线程仍然在通知Recyclerview有关插入的信息。 


```java
data.clear();
adapter.notifyDataSetChange();
data.loadMore();
adapter.notifyItemRangeChange(0, data.size());
```

### 管理 RecyclerView 状态应当是开发者的任务

实际上最好的解决方案，就是实时地开发者以最小成本取维护 DataSet 状态。
对于每一次修改绑定适配器的数据，同时告知适配器（观察者）更改状态。
当然使用重写 LayoutManager 的 onLayoutChildren 方法，总是比忽略某种被忽略的数据更新状态导致 crash 要好。




