---
title: 解决 Flutter No toolchains found in the NDK toolchains folder for ABI with prefix： mips64el-linux-android 问题
date: 2019-07-28 16:50:35
tags: [flutter,Dart]
---

### 解决 Flutter No toolchains found in the NDK toolchains folder for ABI with prefix: mips64el-linux-android 问题



#### 运行 Flutter  项目时常常出现以下问题：

> No toolchains found in the NDK toolchains folder for ABI with prefix: mips64el-linux-android

```dart
           Exit code 1 from: C:\Users\sawan\Documents\test-app\android\gradlew.bat app:properties:

           FAILURE: Build failed with an exception.

           * Where:
           Build file 'C:\Users\XXXX\Documents\test-app\android\build.gradle' line: 24

           * What went wrong:
           A problem occurred evaluating root project 'android'.
           > A problem occurred configuring project ':app'.
              > No toolchains found in the NDK toolchains folder for ABI with prefix: mips64el-linux-android

           * Try:
           Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.

           * Get more help at https://help.gradle.org

           BUILD FAILED in 0s
```

<!--more-->

#### **这个问题常见于运行旧有的 Flutter 项目时。这是由于 gradle 版本与当前的 Flutter 版本不匹配导致的。**

需要在项目中的两处位置进行修改：

1. ### `android/gradle/gradle-wrapper.properties`

   ```properties
   change 
   
   distributionUrl=https\://services.gradle.org/distributions/gradle-4.1-all.zip
   
   to
   
   distributionUrl=https\://services.gradle.org/distributions/gradle-4.10.2-all.zip
   
   ```

1. ### `android/build.gradle`

   ```groovy
   change 
   classpath 'com.android.tools.build:gradle:3.0.1'
   
   to
   classpath 'com.android.tools.build:gradle:3.2.1'
   ```

   

这个问题出现过几次，偶尔会不知所措，以此为鉴。



