---
title: 使用 Firebase 搭建实时数据库
date: 2019-07-19 20:53:47
tags: Firebase
---

## 使用 Firebase 搭建实时数据库

> Firebase 实时数据库基于 Firebse-core 和 Firebase-storage 服务。

<!--more-->

### 为应用进行注册

一般而言，应用需要对接到特定的后台需要使用相应的 配置文件。幸运的是 Firebase 可以自动根据你的不同平台需要自自动生成相应的配置文件，开发者只需要将相应的配置添加在项目中的位置即可。

- 对于 Android 平台，Firebase 会根据包名生成配置文件 google-services.json 。需要将该文件下载并添加到应用级的 build.gradle (app/build.gradle) ，并且根据需要使用的 Firebase 服务将对应模块添加至 Gradle 中。

### Firebase 实时数据库
