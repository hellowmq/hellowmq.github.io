---
title: 初识 Firebase
date: 2018-10-24 20:53:47
tags: Firebase
---

## 初次使用 Firebase 

### Firebase 是什么

> Firebase 是 Google Cloud Platform 为开发者设计，提供各种工具，解决基础架构的问题。Firebase 提供基础性工作和工具，从而允许开发者专注于开发优质应用和扩大用户群。

<!--more-->

早在之前的 Google IO 开发者大会上就了解过 Firebase，但是之前还没有机会使用过 Firebase 这样的服务。

由于本人在学习 Web 应用过程中，希望将编写完成的 Web 应用部署到云服务器上，从而考虑将 Firebase 作为 Web 应用后端。本文将介绍从零部署内容至 Firebase 的过程。

### 开始使用 Firebase

> 前期准备：
>
> - 一个 Google 账号
> - nodejs 环境
> - npm
> - 科学的网络环境（ss）

1. 在 cmd 中执行命令安装 Firebase 工具

   ```
   npm install -g firebase-tools
   ```

1. 使用 Google 账户登录到 [Firebase 控制台](https://firebase.google.com/console/)

1. 在 Firebase 控制台中创建一个 Firebase 应用

1. 在 cmd 中登录 Firebase

   ```
   firebase login
   ```

1. 在目标文件夹中初始化 Firebase 应用

   ```
   cd $your_object_path
   firebsaae init 
   :: 此处如果出现 ETIMEDOUT 错误，那么需要手动为 CMD 设置代理
   :: （见下方故障排除）
   ```

1. 部署到 Firebase 服务器

   ```
   firebase deploy
   ```

1. 应用将部署至 https://YOUR-FIREBASE-APP.firebaseapp.com

### 手动设置代理

鉴于国内的网络环境问题，即使使用了代理，在进入到 login 或者 init 步骤仍然可能出现网络问题，这时需要额外在 cmd 中设置临时代理（该命令仅临时生效）

对于 Windows 系统设置命令行代理服务，在 CMD 中执行以下命令

```
set HTTP_PROXY=http://127.0.0.1:1080
set HTTPS_PROXY=http://127.0.0.1:1080
:: 以上的 http_proxy 不区分大小写
```









