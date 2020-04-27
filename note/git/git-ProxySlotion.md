---
title: git 代理 解决 github 速度问题
date: 2020-04-28 01:15:41
tags: git
---

### git 代理问题

遇到 github 链接速度极慢的情况，记录并维护一个解决方案。使用 git 的代理配置

> [参考链接](https://gist.github.com/chuyik/02d0d37a49edc162546441092efae6a1)

<!--more-->

### 一、HTTP 代理

```bash
git config --global http.proxy "http://127.0.0.1:8080"
git config --global https.proxy "http://127.0.0.1:8080"
```

#### socks5 代理

```bash
git config --global http.proxy "socks5://127.0.0.1:1080"
git config --global https.proxy "socks5://127.0.0.1:1080"
```

#### 取消 git 代理

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 二、SSH 代理

新建/编辑 `~/.ssh/config` 文件

```yaml
# 必须是 github.com
Host github.com
   HostName github.com
   User git
   # 走 HTTP 代理
   # ProxyCommand socat - PROXY:127.0.0.1:%h:%p,proxyport=8080
   # 走 socks5 代理（如 Shadowsocks）
   # ProxyCommand nc -v -x 127.0.0.1:1080 %h %p
```

