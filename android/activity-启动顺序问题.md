---
title: git 笔记
date: 2019-08-20 15:20:43
tags: [android, java]
---
 
### Activity onPause() 与 onResume() 时机

之前使用 EventBus 时有这样一个需求：在视频详情页退回视频列表页时直接定位置特定位置，需要在前者退出时发送 EventBus 消息，此时应该在生命周期的何时取发送消息。

起初是在 onPuase() 回调中去发送改消息，这么一来，发送消息的时机太晚，导致了页面先是明显卡顿，然后才调用 refreshview 的 smoothScrollTo 方法滑动到指定位置。

1. 这个情况是可以预见的。

实际上，任玉刚的 Android 开发艺术探索中就讲到这个问题：

> A 打开一个新的 Activity B 时，A 的 onStop() 与 B 的 onPause() 的执行顺序
	
2. Android 源码

```Java
// We need to start pausing the current activity so the top one can be resumed...
final boolean dontWaitForPause = (next.info.flags & FLAG_RESUME_WHILE_PAUSING) != 0;
boolean pausing = mStackSupervisor.pauseBackStacks(userLeaving, next, dontWaitForPause);
if (mResumedActivity != null) {
    if (DEBUG_STATES) Slog.d(TAG_STATES,
            "resumeTopActivityLocked: Pausing " + mResumedActivity);
    pausing |= startPausingLocked(userLeaving, false, next, dontWaitForPause);
}

```

当前 Activity pasue() 是下一个 Activity onCreate() 的前提。


```java
private void handleLaunchActivity(ActivityClientRecord r, Intent customIntent) {

 // If we are getting ready to gc after going to the background, well
 // we are back active so skip it.
	unscheduleGcIdler(); 
	mSomeActivitiesChanged = true;
	if (r.profilerInfo != null) {
		mProfiler.setProfiler(r.profilerInfo);
		mProfiler.startProfiling();
	}
 // Make sure we are running with the most recent config.
	handleConfigurationChanged(null, null);
	if (localLOGV) Slog.v(
		TAG, "Handling launch of " + r);
 //这里新 Activity 被创建出来，其 onCreate 和 onStart 会被调用
	Activity a = performLaunchActivity(r, customIntent);
	if (a != null) {
		r.createdConfig = new Configuration(mConfiguration);
		Bundle oldState = r.state;
 //这里新 Activity 的 onResume 会被调用
		handleResumeActivity(r.token, false, r.isForward,
		!r.activity.mFinished && !r.startsNotResumed);
 //省略
} 

```

B 的 onResume() 被调用后才会调用 A 的 onStop();

3. 尽管这个知识已经掌握，但是真正用到开发上，却会因为这样的原理而掉坑。

> 时间 2019-8-17 15:51:52 土巴兔 app 视频列表页



